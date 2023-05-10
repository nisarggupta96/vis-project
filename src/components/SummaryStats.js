import { Box, Divider, Text } from "@chakra-ui/react";

const SummaryStats = ({
    yearStart,
    yearEnd,
    selectedManufacturer,
    selectedState,
    totalSales,
    avgCost,
    maxSoldCar,
    maxSoldCount,
    maxSoldManufacturer,
}) => {
    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"80%"}
            textAlign={"center"}
            p={5}
            border={"2px solid #888"}
            borderRadius={"10px"}
        >
            <Box>
                <Text fontSize={"xl"} as="b">
                    Summary for {yearStart} - {yearEnd}
                </Text>
            </Box>
            {selectedState !== "all" && (
                <Box>
                    State: <Text as={"b"}>{selectedState}</Text>
                </Box>
            )}
            {selectedManufacturer !== "all" && (
                <Box>
                    Manufacturer: <Text as={"b"}>{selectedManufacturer}</Text>
                </Box>
            )}
            <Divider m={2} />
            <Box>
                Total Sales: <Text as={"b"}>{totalSales}</Text>
            </Box>
            <Box>
                Average Cost: $<Text as={"b"}>{avgCost}</Text>
            </Box>
            <Box>
                Maximum Sold Car:{" "}
                <Text as={"b"}>
                    {maxSoldManufacturer} {maxSoldCar} ({maxSoldCount})
                </Text>
            </Box>
        </Box>
    );
};

export default SummaryStats;
