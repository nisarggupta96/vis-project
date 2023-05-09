import React, { useEffect } from "react";
import dynamic from "next/dynamic";

const PCPChart = dynamic(() => import("./comp.js"), { ssr: false });
// import parcoords from "parcoord-es";

const PCPChartLoader = () => {
    return <PCPChart />;
};

export default PCPChartLoader;
