import bb, { bar } from "billboard.js";
import { useEffect, useRef } from "react";

const PriceMileagePlot = () => {
    const ref = useRef(null);

    useEffect(() => {
        bb.generate({
            size: {
                height: 475,
            },
            title: {
                text: "Avg Price vs Odometer",
            },
            data: {
                columns: [
                    [
                        "Price",
                        15560.39263158,
                        19340.45957186,
                        9707.78708265,
                        16779.79831476,
                        18939.87152995,
                        23924.76205104,
                        9579.7935705,
                        9537.12825651,
                        20464.16458291,
                        9845.11913548,
                        18857.72277228,
                        19629.05585888,
                        36742.6925752,
                        32314.64836673,
                        11087.58932715,
                        434266.72861953,
                        9513.46146435,
                    ],
                    [
                        "Odometer",
                        99398.78526316,
                        103308.59776384,
                        107083.4619595,
                        90572.95053004,
                        113843.10701107,
                        110492.4352552,
                        128514.24428851,
                        108843.6244489,
                        90554.33142037,
                        99749.41591987,
                        101463.62673267,
                        93097.41747165,
                        95706.82350895,
                        103419.06478177,
                        120046.66589327,
                        122983.92098765,
                        108309.04142582,
                    ],
                ],
                type: bar(),
                groups: [["Price", "Odometer"]],
                label: {
                    format: function (v, id) {
                        return Math.abs(v);
                    },
                },
                onclick: function (d, elem) {
                    console.log(d, elem);
                },
            },
            axis: {
                rotated: true,
                x: {
                    show: true,
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
                },
                y: {
                    tick: {
                        rotate: -45,
                        format: function (v) {
                            return Math.abs(v);
                        },
                    },
                },
            },
            tooltip: {
                format: {
                    value: function (v) {
                        return Math.abs(v);
                    },
                },
            },
            bindto: "#price_mileage_plot",
        });
    });

    return <div height={"100%"} ref={ref} id="price_mileage_plot" />;
};

export default PriceMileagePlot;
