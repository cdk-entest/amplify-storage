import { Storage } from "aws-amplify";

export const uploadToS3 = async (file: File, setProgress: any) => {
  console.log("uploading file to s3 ...", file);
  try {
    const result = await Storage.put(file.name, file, {
      level: "public",
      progressCallback(value) {
        setProgress((100.0 * value.loaded) / value.total);
      },
    });
  } catch (error) {
    console.log("error upload file to s3: ", error);
  }
};

export const getS3Object = async () => {
  const signUrl = await Storage.get("image-1.jpeg", {
    expires: 900,
    level: "public",
    download: false,
  });
  console.log(signUrl);
  return signUrl;
};
