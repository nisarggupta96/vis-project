import { useEffect, useRef } from "react";
import bb, { treemap } from "billboard.js";
import { RepeatIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";

const TreePlot = ({
    treemap_data,
    selectedManufacturer,
    handleManufacturerSelect,
}) => {
    const ref = useRef(null);
    const { level_1, level_2 } = treemap_data;

    useEffect(() => {
        let chart = bb.generate({
            size: {
                width: ref.current.clientWidth,
                height: ref.current.clientHeight,
            },
            title: {
                text: `${
                    selectedManufacturer == "all"
                        ? "Manufacturer distribution"
                        : `${selectedManufacturer} distribution`
                }`,
            },
            padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
            },
            data: {
                columns: selectedManufacturer == "all" ? level_1 : level_2,
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
                    threshold: 0.02,
                },
            },
            bindto: "#tree_plot",
        });
        chart.$.chart.on("click", function (e) {
            console.log(e.srcElement.__data__.data);
            const { id } = e.srcElement.__data__.data;
            handleManufacturerSelect(id);
        });
    }, [level_1, level_2]);

    return (
        <Box position={"relative"} height={"100%"} width={"100%"} ref={ref}>
            <div id="tree_plot" />
            {selectedManufacturer != "all" && (
                <RepeatIcon
                    onClick={() => handleManufacturerSelect("all")}
                    position={"absolute"}
                    top={"5px"}
                    right={"10px"}
                />
            )}
        </Box>
    );
};

export default TreePlot;
