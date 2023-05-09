import { useEffect } from "react";
import bb, { donut } from "billboard.js";
import { Box } from "@chakra-ui/react";

const DonutPlot = ({ pie_data }) => {
    useEffect(() => {
        bb.generate({
            data: {
                columns: pie_data,
                type: donut(),
                onclick: function (d, i) {
                    console.log("onclick", d, i);
                },
            },
            donut: {
                title: "Condition",
            },
            bindto: "#donut_plot",
        });
    }, [pie_data]);
    return <Box height={"100%"} id="donut_plot" />;
};

export default DonutPlot;
