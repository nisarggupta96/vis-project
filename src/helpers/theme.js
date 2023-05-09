import { extendTheme } from "@chakra-ui/react";

const config = {
    initialColorMode: "dark",
    useSystemColorMode: true,
    fonts: {
        global: `'Roboto', sans-serif`,
    },
};

const theme = extendTheme({ config });

export default theme;
