import { useEffect, useRef } from "react";
import bb, { line } from "billboard.js";

const LinePlot = ({ line_data }) => {
    const ref = useRef(null);
    const { color_cyl_counts, colors, cylinders } = line_data;

    useEffect(() => {
        bb.generate({
            size: {
                width: ref.current.clientWidth,
                height: 430,
            },
            padding: {
                bottom: 20,
            },
            data: {
                columns: color_cyl_counts,
                type: line(),
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

    return <div height={"100%"} ref={ref} id="line_plot" />;
};

export default LinePlot;
