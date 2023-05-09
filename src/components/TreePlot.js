import { useEffect, useRef } from "react";
import treedata from "./data/treeplot.json";
import bb, { treemap } from "billboard.js";

const TreePlot = () => {
    const ref = useRef(null);

    useEffect(() => {
        let chart = bb.generate({
            size: {
                width: ref.current.clientWidth,
                height: ref.current.clientHeight,
            },
            title: {
                text: "Manufacturer Distribution",
            },
            padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
            },
            data: {
                columns: treedata,
                type: treemap(),
                labels: {
                    colors: "#fff",
                },
                onclick: function (d, i) {
                    console.log("onout", d, i);
                },
            },
            treemap: {
                tile: "squarify",
                label: {
                    threshold: 0.01,
                },
            },
            bindto: "#tree_plot",
        });
        chart.$.chart.on("click", function (e) {
            console.log(e.srcElement.__data__.data);
        });
    }, []);

    return (
        <div style={{ height: "100%", width: "100%" }} ref={ref}>
            <div id="tree_plot" />
        </div>
    );
};

export default TreePlot;
