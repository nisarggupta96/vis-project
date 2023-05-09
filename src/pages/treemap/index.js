import React, { useEffect } from "react";
import treedata from "./tree.json";
import * as d3 from "d3";

const margin = { top: 10, right: 10, bottom: 10, left: 10 },
    width = 1377 - margin.left - margin.right,
    height = 790 - margin.top - margin.bottom;

const TreeMap = () => {
    useEffect(() => {
        d3.select("#my_dataviz").selectAll("*").remove();

        const svg = d3
            .select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        const root = d3.hierarchy(treedata).sum(function (d) {
            return d.value;
        }); // Here the size of each leave is given in the 'value' field in input data

        // Then d3.treemap computes the position of each element of the hierarchy
        d3
            .treemap()
            .size([width, height])
            .paddingTop(28)
            .paddingRight(7)
            .paddingInner(3)(
            // Padding between each rectangle
            //.paddingOuter(6)
            //.padding(20)
            root
        );

        // prepare a color scale
        const color = d3
            .scaleOrdinal()
            .domain([...Object.keys(treedata["children"])])
            .range(d3.schemeCategory10);

        // And a opacity scale
        const opacity = d3.scaleLinear().domain([200, 1500]).range([0.8, 1]);

        // use this information to add rectangles:
        svg.selectAll("rect")
            .data(root.leaves())
            .join("rect")
            .attr("x", function (d) {
                return d.x0;
            })
            .attr("y", function (d) {
                return d.y0;
            })
            .attr("width", function (d) {
                return d.x1 - d.x0;
            })
            .attr("height", function (d) {
                return d.y1 - d.y0;
            })
            .style("stroke", "black")
            .style("fill", function (d) {
                return color(d.parent.data.name);
            })
            .style("opacity", function (d) {
                return opacity(d.data.value);
            });

        // and to add the text labels
        svg.selectAll("text")
            .data(root.leaves())
            .enter()
            .append("text")
            .attr("x", function (d) {
                return d.x0 + 5;
            }) // +10 to adjust position (more right)
            .attr("y", function (d) {
                return d.y0 + 20;
            }) // +20 to adjust position (lower)
            .text(function (d) {
                return d.data.name.substring(0, 10);
            })
            .attr("font-size", "14px")
            .attr("fill", "white");

        // and to add the text labels
        svg.selectAll("vals")
            .data(root.leaves())
            .enter()
            .append("text")
            .attr("x", function (d) {
                return d.x0 + 5;
            }) // +10 to adjust position (more right)
            .attr("y", function (d) {
                return d.y0 + 35;
            }) // +20 to adjust position (lower)
            .text(function (d) {
                return d.data.value;
            })
            .attr("font-size", "14px")
            .attr("fill", "white");

        // Add title for the 3 groups
        svg.selectAll("titles")
            .data(
                root.descendants().filter(function (d) {
                    return d.depth == 1;
                })
            )
            .enter()
            .append("text")
            .attr("x", function (d) {
                return d.x0;
            })
            .attr("y", function (d) {
                return d.y0 + 21;
            })
            .text(function (d) {
                return d.data.name;
            })
            .attr("font-size", "18px")
            .attr("fill", function (d) {
                return color(d.data.name);
            });
    });

    return <div id="my_dataviz"></div>;
};

export default TreeMap;
