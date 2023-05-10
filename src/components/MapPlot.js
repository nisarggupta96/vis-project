import React from "react";
import { geoCentroid } from "d3-geo";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    Annotation,
    ZoomableGroup,
} from "react-simple-maps";
import * as d3 from "d3";

import allStates from "./data/allstates.json";
import { Box, Text } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const offsets = {
    VT: [50, -8],
    NH: [34, 2],
    MA: [30, -1],
    RI: [28, 2],
    CT: [35, 10],
    NJ: [34, 1],
    DE: [33, 0],
    MD: [47, 10],
    DC: [49, 21],
};

const MapChart = ({ map_data, selectedState, handleStateSelect }) => {
    const colorScale = d3
        .scaleSequentialSqrt()
        .domain([0, Math.max(...Object.values(map_data))])
        .interpolator(d3.interpolatePuBu);

    return (
        <>
            <Text
                mt={"5"}
                align={"center"}
                fontWeight={"bold"}
                fontSize={"16px"}
            >
                Statewise Sales
            </Text>
            <Box position={"relative"} style={{ height: "100%" }}>
                <ComposableMap
                    projection="geoAlbersUsa"
                    projectionConfig={{
                        scale: 400,
                    }}
                    width={400}
                    height={220}
                >
                    <ZoomableGroup
                        center={[0, 0]}
                        minZoom={1}
                        maxZoom={5}
                        onMoveStart={({ coordinates, zoom }) => {
                            console.log(coordinates, zoom);
                        }}
                    >
                        <Geographies geography={geoUrl}>
                            {({ geographies }) => (
                                <>
                                    {geographies.map((geo) => {
                                        const cur = allStates.find(
                                            (s) => s.val === geo.id
                                        );
                                        return (
                                            <Geography
                                                key={geo.rsmKey}
                                                stroke="#FFF"
                                                geography={geo}
                                                fill={
                                                    map_data[cur.id]
                                                        ? colorScale(
                                                              map_data[cur.id]
                                                          )
                                                        : "#777"
                                                }
                                                opacity={
                                                    map_data[cur.id] ? 1 : 0.3
                                                }
                                                style={{
                                                    default: {
                                                        outline: "transparent",
                                                    },
                                                    hover: {
                                                        outline: "transparent",
                                                        cursor: "pointer",
                                                    },
                                                    pressed: {
                                                        outline: "transparent",
                                                    },
                                                }}
                                                onFocus={() => {
                                                    console.log(cur);
                                                    handleStateSelect(cur.id);
                                                }}
                                            />
                                        );
                                    })}
                                    {geographies.map((geo) => {
                                        const centroid = geoCentroid(geo);
                                        const cur = allStates.find(
                                            (s) => s.val === geo.id
                                        );
                                        return (
                                            <g
                                                key={geo.rsmKey + "-name"}
                                                style={{ cursor: "pointer" }}
                                            >
                                                {cur &&
                                                    centroid[0] > -160 &&
                                                    centroid[0] < -67 &&
                                                    (Object.keys(
                                                        offsets
                                                    ).indexOf(cur.id) === -1 ? (
                                                        <Marker
                                                            coordinates={
                                                                centroid
                                                            }
                                                        >
                                                            <text
                                                                y="2"
                                                                fontSize={6}
                                                                textAnchor="middle"
                                                                style={{
                                                                    fill:
                                                                        selectedState ===
                                                                        cur.id
                                                                            ? "white"
                                                                            : "black",
                                                                }}
                                                            >
                                                                {cur.id}
                                                                {map_data[
                                                                    cur.id
                                                                ] &&
                                                                    `(${
                                                                        map_data[
                                                                            cur
                                                                                .id
                                                                        ]
                                                                    })`}
                                                            </text>
                                                        </Marker>
                                                    ) : (
                                                        <Annotation
                                                            subject={centroid}
                                                            dx={
                                                                offsets[
                                                                    cur.id
                                                                ][0]
                                                            }
                                                            dy={
                                                                offsets[
                                                                    cur.id
                                                                ][1]
                                                            }
                                                        >
                                                            <text
                                                                x={4}
                                                                fontSize={6}
                                                                alignmentBaseline="middle"
                                                            >
                                                                {cur.id}
                                                                {map_data[
                                                                    cur.id
                                                                ] &&
                                                                    `(${
                                                                        map_data[
                                                                            cur
                                                                                .id
                                                                        ]
                                                                    })`}
                                                            </text>
                                                        </Annotation>
                                                    ))}
                                            </g>
                                        );
                                    })}
                                </>
                            )}
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>
                {selectedState != "all" && (
                    <RepeatIcon
                        onClick={() => handleStateSelect("all")}
                        position={"absolute"}
                        top={"5px"}
                        right={"10px"}
                    />
                )}
            </Box>
        </>
    );
};

export default MapChart;
