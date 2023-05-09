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
                    ["black", 57, 13, 23, 5750, 178, 7448, 6213, 56],
                    ["blue", 33, 2, 24, 4239, 92, 3958, 2507, 31],
                    ["brown", 5, , 1, 858, 12, 1140, 739, 7],
                    ["custom", 8, , 3, 592, 38, 914, 479, 2],
                    ["green", 30, , 4, 942, 15, 917, 648, 3],
                    ["grey", 15, 3, 16, 4978, 127, 4211, 2041, 24],
                    ["red", 28, 2, 19, 3116, 52, 3850, 3181, 18],
                    ["silver", 17, 8, 24, 5779, 157, 6648, 2762, 29],
                    ["white", 380, 7, 38, 5827, 163, 9042, 8877, 69],
                    ["yellow", 5, , , 162, 4, 235, 276],
                    ["purple", , 1, 2, 91, 1, 102, 57, 1],
                    ["orange", , , 5, 225, 3, 123, 148, 2],
                ],
                type: line(),
            },
            axis: {
                x: {
                    type: "category",
                    categories: [
                        "10 cylinders",
                        "12 cylinders",
                        "3 cylinders",
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
