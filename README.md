---
title: Upload to S3 from Browser using AWS Amplify Storage
description: Upload to S3 from Browser using AWS Amplify Storage
author: haimtran
publishedDate: 08/10/2022
date: 2022-08-10
---

## Introduction

[GitHub](https://github.com/entest-hai/amplify-storage) this shows

- setup amplify project for nextjs
- upload and download objects to and from a s3 bucket
- working with amplify storage api (signed url)

<LinkedImage
  href="https://youtu.be/pKiPciFBrhk"
  height={400}
  alt="Amplify Hosting NextJS Static Web"
  src="/thumbnail/amplify-storage.png"
/>

## Amplify Init

init

```bash
amplify init
```

add auth with default and login by email

```bash
amplify add auth
```

add storage

```bash
amplify add storage
```

then push to aws

```bash
amplify push
```

## Amplify Storage

simple upload by amplify storage

```tsx
import { Storage } from "aws-amplify";

export const uploadToS3 = async (file: File, setProgress: any) => {
  console.log("uploading file to s3 ...", file);
  try {
    const result = await Storage.put(file.name, file, {
      progressCallback(value) {
        setProgress((100.0 * value.loaded) / value.total);
      },
    });
  } catch (error) {
    console.log("error upload file to s3: ", error);
  }
};
```

## Create Upload Form

configure react-hook-form and fileName and progress.

```tsx
const inputRef = useRef<HTMLInputElement | null>(null);
const [selectedFile, setSelectedFile] = useState<File | null>(null);
const [fileName, setFileName] = useState("Your File ...");
const [progress, setProgress] = useState(1);
const name = "FirstName";

const { handleSubmit, control } = useForm({
  defaultValues: {
    FirstName: "",
  },
  mode: "onChange",
});

const { field, fieldState, formState } = useController({
  name,
  control,
  rules: { required: true },
  defaultValue: "",
});
```

upload button and choose file button

```tsx
const uploadButton = (
  <Button
    onClick={async () => {
      await uploadToS3(selectedFile as File, setProgress);
      // setFileName("Your File ...");
      // setSelectedFile(null);
    }}
  >
    Upload
  </Button>
);

const chooseFileButton = (inputRef: any) => (
  <Button onClick={() => inputRef.current?.click()}>Choose File</Button>
);
```

hidden the input

```tsx
const HiddenInput = () => {
  return (
    <input
      type={"file"}
      name={"FirstName"}
      ref={(e) => {
        field.ref(e);
        inputRef.current = e;
      }}
      onChange={(event) => {
        if (event.target.files && event.target.files.length > 0) {
          setFileName(event.target.files[0].name);
          setSelectedFile(event.target.files[0]);
        }
      }}
      style={{ display: "none" }}
    ></input>
  );
};
```

the entire upload form

```tsx
<Flex
  direction={"column"}
  gap={"20px"}
  maxWidth="1000px"
  margin={"auto"}
  marginTop={"200px"}
>
  <FormControl>
    <InputGroup>
      <InputLeftElement>
        <Icon as={FiFile}></Icon>
      </InputLeftElement>
      <HiddenInput></HiddenInput>
      <Input
        placeholder="Your file ..."
        value={fileName}
        onChange={(e) => console.log(e)}
      ></Input>
      <InputRightElement width={"auto"}>
        {selectedFile ? uploadButton : chooseFileButton(inputRef)}
      </InputRightElement>
    </InputGroup>
  </FormControl>
  <Progress value={progress}></Progress>
</Flex>
```
