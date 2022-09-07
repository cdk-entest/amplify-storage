import { ChakraProvider } from "@chakra-ui/react";
import { Amplify, Auth } from "aws-amplify";
import type { AppProps } from "next/app";
import awsconfig from "./../src/aws-exports";

try {
  Amplify.configure(awsconfig);
  Amplify.register(Auth);
} catch (error) {
  console.log(error);
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
