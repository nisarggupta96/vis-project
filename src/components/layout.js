import {
    Box,
    Flex,
    Button,
    useColorModeValue,
    Stack,
    useColorMode,
    Text,
    Spinner,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import MapChart from "./MapPlot";
import DonutPlot from "./DonutPlot";
// import StackedBarPlot from "./StackedBarPlot";
import TimeSelection from "./TimeSelection";
import PriceMileagePlot from "./PriceMileagePlot";
import TreePlot from "./TreePlot";
import LinePlot from "./LinePlot";
import { useEffect, useState } from "react";
import axios from "axios";
import SummaryStats from "./SummaryStats";

export default function Nav({ children }) {
    const { colorMode, toggleColorMode } = useColorMode();
    const [appData, setAppData] = useState([]);
    const [yearStart, setYearStart] = useState(2000);
    const [yearEnd, setYearEnd] = useState(2022);
    const [selectedState, setSelectedState] = useState("all");
    const [selectedManufacturer, setSelectedManufacturer] = useState("all");

    useEffect(() => {
        const getData = async () => {
            console.log(
                yearStart,
                yearEnd,
                selectedState,
                selectedManufacturer
            );
            const data = await (
                await axios.post("/api/get_data", {
                    yearStart: yearStart,
                    yearEnd: yearEnd,
                    state: selectedState,
                    manufacturer: selectedManufacturer,
                })
            ).data;
            console.log(data);
            setAppData(data);
        };
        getData();
    }, [yearStart, yearEnd, selectedState, selectedManufacturer]);

    if (appData.length == 0) {
        return (
            <Box
                h={"100vh"}
                w={"100vw"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Spinner size="xl" />
            </Box>
        );
    }

    const handleTimeChange = (startYear, endYear) => {
        console.log(startYear, endYear);
        setYearStart(startYear);
        setYearEnd(endYear);
    };

    const handleStateSelect = (stateSelected) => {
        setSelectedState(stateSelected);
    };

    const handleManufacturerSelect = (manufacturerSelected) => {
        setSelectedManufacturer(manufacturerSelected);
    };

    const {
        map_data,
        pie_data,
        line_data,
        stacked_bar_data,
        treemap_data,
        summary_data,
    } = appData;

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
                            <Box h={"50%"}>
                                <MapChart
                                    map_data={map_data}
                                    selectedState={selectedState}
                                    handleStateSelect={handleStateSelect}
                                />
                            </Box>
                            <Box p={3} height={"50%"}>
                                <LinePlot line_data={line_data} />
                            </Box>
                        </Box>
                        <Box
                            w={"40%"}
                            display={"flex"}
                            flexDirection={"column"}
                            p={2}
                        >
                            <Box h={"40%"}>
                                <DonutPlot pie_data={pie_data} />
                            </Box>
                            <Box h={"60%"}>
                                <PriceMileagePlot
                                    stacked_bar_data={stacked_bar_data}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        w={"30%"}
                        ml={"auto"}
                        display={"flex"}
                        flexDirection={"column"}
                    >
                        {/* <StackedBarPlot /> */}
                        <Box h={"70%"}>
                            <TreePlot
                                treemap_data={treemap_data}
                                selectedManufacturer={selectedManufacturer}
                                handleManufacturerSelect={
                                    handleManufacturerSelect
                                }
                            />
                        </Box>
                        <Box
                            h={"30%"}
                            display={"flex"}
                            flexDirection={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <SummaryStats
                                selectedManufacturer={selectedManufacturer}
                                selectedState={selectedState}
                                yearStart={yearStart}
                                yearEnd={yearEnd}
                                totalSales={summary_data.total_sales_count}
                                avgCost={summary_data.average_cost}
                                maxSoldManufacturer={
                                    summary_data.max_sale_manufacturer
                                }
                                maxSoldCar={summary_data.max_sale_model}
                                maxSoldCount={summary_data.max_sale_count}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box pt={3} pb={5} pl={10} pr={10} mt={"auto"} h="60px">
                    <TimeSelection handleTimeChange={handleTimeChange} />
                </Box>
            </Box>
        </>
    );
}
