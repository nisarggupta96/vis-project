import {
    Box,
    Flex,
    Button,
    useColorModeValue,
    Stack,
    useColorMode,
    Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import MapChart from "./MapPlot";
import DonutPlot from "./DonutPlot";
// import StackedBarPlot from "./StackedBarPlot";
import TimeSelection from "./TimeSelection";
import PriceMileagePlot from "./PriceMileagePlot";
import TreePlot from "./TreePlot";
import LinePlot from "./LinePlot";

export default function Nav({ children }) {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>
            <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
                <Flex
                    h={"50px"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <Box>
                        <Text fontSize="xl">
                            Used Car Analysis for United States (2000-2020)
                        </Text>
                    </Box>

                    <Flex alignItems={"center"}>
                        <Stack direction={"row"} spacing={7}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === "light" ? (
                                    <MoonIcon />
                                ) : (
                                    <SunIcon />
                                )}
                            </Button>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
            <Box h={"calc(100vh - 110px)"}>
                <Box
                    w={"100vw"}
                    height={"100%"}
                    display={"flex"}
                    flexDirection={"row"}
                >
                    <Box
                        h={"100%"}
                        w={"70%"}
                        display={"flex"}
                        flexDirection={"row"}
                    >
                        <Box
                            w={"60%"}
                            height={"100%"}
                            display={"flex"}
                            flexDirection={"column"}
                        >
                            <Box border={"1px solid black"} h={"48%"}>
                                <MapChart />
                            </Box>
                            <Box
                                border={"1px solid black"}
                                p={3}
                                height={"52%"}
                            >
                                <LinePlot />
                            </Box>
                        </Box>
                        <Box
                            w={"40%"}
                            display={"flex"}
                            flexDirection={"column"}
                        >
                            <Box border={"1px solid black"} h={"40%"}>
                                <DonutPlot />
                            </Box>
                            <Box border={"1px solid black"} h={"60%"}>
                                <PriceMileagePlot />
                            </Box>
                        </Box>
                    </Box>
                    <Box border={"1px solid black"} w={"30%"} ml={"auto"}>
                        {/* <StackedBarPlot /> */}
                        <TreePlot />
                    </Box>
                </Box>
                <Box pt={3} pb={5} pl={10} pr={10} mt={"auto"} h="60px">
                    <TimeSelection />
                </Box>
            </Box>
        </>
    );
}
