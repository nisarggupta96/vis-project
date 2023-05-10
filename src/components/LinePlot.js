import { useEffect, useRef } from "react";
import bb, { line } from "billboard.js";
import { Box } from "@chakra-ui/react";

const LinePlot = ({ line_data }) => {
    const ref = useRef(null);
    const { color_cyl_counts, colors, cylinders } = line_data;

    useEffect(() => {
        bb.generate({
            title: {
                text: "Colors vs Cylinders Count",
                padding: {
                    top: 10,
                },
            },
            size: {
                width: ref.current.clientWidth,
                height: ref.current.clientHeight,
            },
            padding: {
                bottom: 20,
            },
            data: {
                columns: color_cyl_counts,
                type: line(),
            },
            legend: {
                position: "inset",
            },
            axis: {
                x: {
                    type: "category",
                    categories: cylinders,
                },
            },
            bindto: "#line_plot",
        });
    }, [color_cyl_counts, cylinders]);

    return <Box height={"100%"} ref={ref} id="line_plot" />;
};

export default LinePlot;
