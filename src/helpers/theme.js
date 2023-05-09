import { extendTheme } from "@chakra-ui/react";

const config = {
    initialColorMode: "dark",
    useSystemColorMode: false,
    fonts: {
        body: `'Play', sans-serif`,
    },
};

const theme = extendTheme({ config });

export default theme;
