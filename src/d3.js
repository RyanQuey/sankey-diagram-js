// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/sankey-diagram

//import rd3 from 'react-d3-library'
import * as d3 from "d3"
import SankeyChart from "./SankeyChart"

// borrowing from the value in teh select box in the example
const nodeAlign = "justify"
const linkColor = "source-target"
const width = 1800

// this is an svg element
const createChart = (energy) => (
    SankeyChart({
        links: energy
    }, {
        nodeGroup: d => d.id.split(/\W/)[0], // take first word for color
        nodeAlign, // e.g., d3.sankeyJustify; set by input above
        linkColor, // e.g., "source" or "target"; set by input above
        format: (f => d => `${f(d)} TWh`)(d3.format(",.1~f")),
        width,
        height: 600
    })
)


export default createChart
