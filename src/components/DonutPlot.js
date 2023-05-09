import { useEffect } from "react";
import bb, { donut } from "billboard.js";

const DonutPlot = () => {
    useEffect(() => {
        bb.generate({
            data: {
                columns: [
                    ["data1", 30],
                    ["data2", 120],
                ],
                type: donut(),
                onclick: function (d, i) {
                    console.log("onclick", d, i);
                },
                // onover: function (d, i) {
                //     console.log("onover", d, i);
                // },
                // onout: function (d, i) {
                //     console.log("onout", d, i);
                // },
            },
            donut: {
                title: "Condition",
            },
            bindto: "#donut_plot",
        });
    });
    return <div id="donut_plot"></div>;
};

export default DonutPlot;
