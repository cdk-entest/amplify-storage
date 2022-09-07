import { Box, Button, Divider, Flex, Image, Text } from "@chakra-ui/react";
import { Storage } from "aws-amplify";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { UploadForm } from "../src/components/upload-form";
import { uploadToS3, getS3Object } from "../src/services/storage";

const ListImages = ({
  images,
  setImageUrl,
}: {
  images: string[];
  setImageUrl: any;
}) => {
  return (
    <Flex
      direction={"column"}
      width={"100%"}
      height={"300px"}
      overflowY={"auto"}
      marginTop={"20px"}
    >
      {images.map((image, id) => (
        <Flex
          key={id}
          width={"100%"}
          justifyContent={"space-between"}
          padding={"5px"}
          backgroundColor={"gray.100"}
          marginBottom={"5px"}
        >
          <Text>{image}</Text>
          <Button
            colorScheme={"teal"}
            onClick={async () => {
              const url = await getS3Object(image);
              setImageUrl(url);
            }}
          >
            Download
          </Button>
        </Flex>
      ))}
    </Flex>
  );
};

const Home: NextPage = () => {
  const [imageUrl, setImageUrl] = useState<string>();
  const [images, setImages] = useState<string[]>([]);

  const listImages = async () => {
    Storage.list("").then((result) => {
      const keys = result.map((item) => item.key);
      setImages(keys);
    });
  };

  useEffect(() => {
    listImages();
  }, []);

  return (
    <Flex
      margin={"auto"}
      maxWidth={"1000px"}
      direction="column"
      alignItems="center"
    >
      <Box
        bg={"gray.100"}
        width={"1000px"}
        height={"500px"}
        padding={"20px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        marginBottom={"20px"}
      >
        {imageUrl && (
          <Image src={imageUrl} width="auto" height={"350px"}></Image>
        )}
      </Box>
      <UploadForm processFile={uploadToS3} setImages={setImages}></UploadForm>
      <ListImages images={images} setImageUrl={setImageUrl}></ListImages>
    </Flex>
  );
};

export default Home;
