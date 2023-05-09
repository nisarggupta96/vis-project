import { Box, Text } from "@chakra-ui/react";

const SummaryStats = ({
    yearStart,
    yearEnd,
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
        >
            <Box>
                Summary for {yearStart} - {yearEnd}
            </Box>
            <Box>Total Sales: {totalSales}</Box>
            <Box>Average Cost: {avgCost}</Box>
            <Box>
                Maximum Sold Car: {maxSoldManufacturer} {maxSoldCar} (
                {maxSoldCount})
            </Box>
        </Box>
    );
};

export default SummaryStats;
