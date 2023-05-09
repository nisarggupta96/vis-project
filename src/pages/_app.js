import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
import "@fontsource/oswald/400.css";
import theme from "@/helpers/theme";

export default function App({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme} resetCSS={true}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ChakraProvider>
    );
}
