import { useEffect } from "react";
import bb, { donut } from "billboard.js";
import { Box } from "@chakra-ui/react";

const DonutPlot = ({ pie_data }) => {
    useEffect(() => {
        bb.generate({
            data: {
                columns: pie_data,
                type: donut(),
                // onclick: function (d, i) {
                //     console.log("onclick", d, i);
                // },
                colors: {
                    excellent: "#b7003f",
                    good: "#fa5d0f",
                    "like new": "#8e5d00",
                    fair: "#2b1055",
                    new: "#710462",
                    salvage: "#ffb427",
                },
            },
            donut: {
                title: "Car condition",
            },
            bindto: "#donut_plot",
        });
    }, [pie_data]);
    return <Box height={"100%"} id="donut_plot" />;
};

export default DonutPlot;
