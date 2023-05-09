import { useEffect } from "react";
import bb, { donut } from "billboard.js";

const DonutPlot = ({ pie_data }) => {
    useEffect(() => {
        bb.generate({
            data: {
                columns: pie_data,
                type: donut(),
                onclick: function (d, i) {
                    console.log("onclick", d, i);
                },
            },
            donut: {
                title: "Condition",
            },
            bindto: "#donut_plot",
        });
    }, [pie_data]);
    return <div id="donut_plot"></div>;
};

export default DonutPlot;
