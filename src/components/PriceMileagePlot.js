import { Box } from "@chakra-ui/react";
import bb, { bar } from "billboard.js";
import { useEffect, useRef } from "react";

const PriceMileagePlot = ({ stacked_bar_data }) => {
    const ref = useRef(null);
    const { manufacturers, odometer, price } = stacked_bar_data;

    useEffect(() => {
        bb.generate({
            size: {
                height: ref.current.clientHeight,
            },
            padding: {
                top: 5,
            },
            title: {
                text: "Avg Price vs Odometer",
                padding: {
                    top: 15,
                },
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
                colors: {
                    price: "#CF3D24",
                    odometer: "#F78E20",
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

    return <Box height={"100%"} ref={ref} id="price_mileage_plot" />;
};

export default PriceMileagePlot;
