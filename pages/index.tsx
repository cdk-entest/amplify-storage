import { Button, Image } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import { UploadForm } from "../src/components/upload-form";
import { uploadToS3, getS3Object } from "../src/services/storage";

const Home: NextPage = () => {
  const [imageUrl, setImageUrl] = useState(null);

  return (
    <div>
      <UploadForm processFile={uploadToS3}></UploadForm>
      {imageUrl && <Image src={imageUrl} boxSize={"sm"}></Image>}
      <Button
        onClick={async () => {
          const url = await getS3Object();
          setImageUrl(url);
        }}
      >
        Download
      </Button>
    </div>
  );
};

export default Home;
