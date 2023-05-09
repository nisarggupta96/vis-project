import React, { useEffect, useRef } from "react";
import bb, { bar } from "billboard.js";

const StackedBarPlot = () => {
    const ref = useRef(null);

    useEffect(() => {
        bb.generate({
            size: {
                height: ref.current.clientHeight,
                width: 400,
            },
            axis: {
                rotated: true,
                x: {
                    type: "category",
                    categories: [
                        "bmw",
                        "chevrolet",
                        "chrysler",
                        "dodge",
                        "ford",
                        "gmc",
                        "honda",
                        "hyundai",
                        "jeep",
                        "kia",
                        "lexus",
                        "mercedes-benz",
                        "nissan",
                        "ram",
                        "subaru",
                        "toyota",
                        "volkswagen",
                    ],
                    height: 80,
                },
                y: {},
            },
            data: {
                columns: [
                    [
                        "sedan",
                        1388,
                        2795,
                        839,
                        1027,
                        2511,
                        0,
                        2639,
                        1513,
                        0,
                        847,
                        1134,
                        1212,
                        2197,
                        0,
                        724,
                        2687,
                        1078,
                    ],
                    [
                        "SUV",
                        0,
                        2754,
                        0,
                        0,
                        3487,
                        1334,
                        1567,
                        0,
                        3515,
                        0,
                        0,
                        0,
                        1492,
                        0,
                        727,
                        2022,
                        0,
                    ],
                    [
                        "coupe",
                        0,
                        1394,
                        0,
                        836,
                        1133,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                    ],
                    [
                        "pickup",
                        0,
                        2711,
                        0,
                        0,
                        3038,
                        1457,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1770,
                        0,
                        1177,
                        0,
                    ],
                    [
                        "truck",
                        0,
                        3109,
                        0,
                        0,
                        4853,
                        1192,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1710,
                        0,
                        1105,
                        0,
                    ],
                    [
                        "van",
                        0,
                        0,
                        0,
                        0,
                        1187,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                    ],
                    [
                        "other",
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        861,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                    ],
                    [
                        "wagon",
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        748,
                        0,
                        0,
                    ],
                    [
                        "hatchback",
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        766,
                        0,
                    ],
                ],
                type: bar(),
                groups: [
                    [
                        "sedan",
                        "SUV",
                        "coupe",
                        "pickup",
                        "truck",
                        "van",
                        "other",
                        "wagon",
                        "hatchback",
                    ],
                ],
                onclick: function (e, d) {
                    console.log(e, d);
                },
            },
            bar: {
                width: {
                    ratio: 0.5,
                },
            },
            legend: {
                show: false,
            },
            bindto: "#stacked_bar_plot",
        });
    }, []);

    return (
        <div style={{ height: "100%" }} ref={ref} id="stacked_bar_plot"></div>
    );
};

export default StackedBarPlot;
