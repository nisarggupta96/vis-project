import { useEffect, useRef } from "react";
import bb, { treemap } from "billboard.js";
import { RepeatIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";

const colorsList = [
    "#e6194B",
    "#3cb44b",
    "#ffe119",
    "#4363d8",
    "#f58231",
    "#911eb4",
    "#42d4f4",
    "#f032e6",
    "#bfef45",
    "#fabed4",
    "#469990",
    "#dcbeff",
    "#9A6324",
    "#fffac8",
    "#800000",
    "#aaffc3",
    "#808000",
    "#ffd8b1",
    "#000075",
    "#a9a9a9",
];

const TreePlot = ({
    treemap_data,
    selectedManufacturer,
    handleManufacturerSelect,
}) => {
    const ref = useRef(null);
    const { level_1, level_2 } = treemap_data;
    const clevel1 = {};
    const clevel2 = {};
    for (let i = 0; i < level_1.length; i++) {
        clevel1[level_1[i][0]] = colorsList[i];
    }
    if (level_2.length > 0) {
        for (let i = 0; i < level_2.length; i++) {
            clevel2[level_2[i][0]] = colorsList[i];
        }
    }

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
                padding: {
                    top: 10,
                    bottom: 10,
                },
            },
            padding: {
                top: 10,
                bottom: 10,
                left: 20,
                right: 20,
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
                // colors: selectedManufacturer == "all" ? clevel1 : clevel2,
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
            const { id } = e.srcElement.__data__.data;
            if (selectedManufacturer == "all") {
                handleManufacturerSelect(id);
            }
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
