import bb, { bar } from "billboard.js";
import { useEffect, useRef } from "react";

const PriceMileagePlot = ({ stacked_bar_data }) => {
    const ref = useRef(null);
    const { manufacturers, odometer, price } = stacked_bar_data;

    useEffect(() => {
        bb.generate({
            size: {
                height: 475,
            },
            title: {
                text: "Avg Price vs Odometer",
            },
            data: {
                columns: [price, odometer],
                type: bar(),
                groups: [["price", "odometer"]],
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
                    categories: manufacturers,
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
    }, [manufacturers, odometer, price]);

    return <div height={"100%"} ref={ref} id="price_mileage_plot" />;
};

export default PriceMileagePlot;
