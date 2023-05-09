import { useEffect, useRef } from "react";
import bb, { line } from "billboard.js";

const LinePlot = () => {
    const ref = useRef(null);

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
                columns: [
                    ["blue", 1, 0, 10, 25, 1],
                    ["white", 5, 2, 29, 130, 1],
                    ["yellow", 1, 0, 1, 4, 0],
                    ["black", 0, 0, 31, 68, 1],
                    ["brown", 0, 0, 6, 24, 0],
                    ["custom", 0, 0, 5, 18, 0],
                    ["green", 0, 0, 5, 14, 0],
                    ["grey", 0, 0, 16, 47, 0],
                    ["red", 0, 0, 33, 44, 0],
                    ["silver", 0, 0, 12, 42, 0],
                    ["orange", 0, 0, 0, 3, 0],
                ],
                type: line(),
            },
            axis: {
                x: {
                    type: "category",
                    categories: [
                        "4 cylinders",
                        "5 cylinders",
                        "6 cylinders",
                        "8 cylinders",
                        "other",
                    ],
                },
            },
            bindto: "#line_plot",
        });
    }, []);

    return <div height={"100%"} ref={ref} id="line_plot" />;
};

export default LinePlot;
