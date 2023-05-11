import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Nav from "../components/Nav";
import "@fontsource/play/400.css";
import theme from "@/helpers/theme";

export default function App({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme} resetCSS={true}>
            <Nav>
                <Component {...pageProps} />
            </Nav>
        </ChakraProvider>
    );
}
