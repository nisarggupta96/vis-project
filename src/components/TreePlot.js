import { useEffect, useRef } from "react";
import bb, { treemap } from "billboard.js";
import { RepeatIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";

const colorsList = [
    "#bedb39",
    "#a8c545",
    "#a9cf54",
    "#96ca2d",
    "#b5e655",
    "#bdf271",
    "#588f27",
    "#689f38",
    "#91c46c",
    "#b1ff91",
    "#66bb6a",
    "#43a047",
    "#468966",
    "#45bf55",
    "#79bd8f",
    "#168039",
    "#289976",
    "#1bbc9b",
    "#00796b",
    "#04756f",
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
                    centered: true,
                    colors: "#000",
                },
                colors: selectedManufacturer == "all" ? clevel1 : clevel2,
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
            try {
                const { id } = e.srcElement.__data__.data;
                if (selectedManufacturer == "all") {
                    handleManufacturerSelect(id);
                }
            } catch (e) {
                //
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
                    top={"10px"}
                    right={"10px"}
                    h={5}
                    w={5}
                />
            )}
        </Box>
    );
};

export default TreePlot;
