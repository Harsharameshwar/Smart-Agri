import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import axios from "axios";

const GraphComponent = () => {
  const [graphData, setGraphData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://mydesk.tk:5001/generate-grid-graph"
      );
      const data = await response.data;
      const data1 = JSON.parse(data);
      setGraphData(data1);
      //   console.log(graphData)
    };
    fetchData();
  }, []);

  const plotLayout = {
    plot_bgcolor: "#3f4494", // Set the background color of the graph
    title: {
      text: "Grid Sensor Graph",
      font: { color: "white" },
    },
    paper_bgcolor: "#141b2d", // Set the background color of the plotting area
    font: { color: "white" }, // Set the text color to white
    xaxis: {
      title: {
        text: "Date-Time",
        font: { color: "white" },
      },
    },
    yaxis: {
      title: {
        text: "Grid Voltage Levels",
        font: { color: "white" },
      },
    },
  };

  const plotData = graphData?.data?.map((trace) => ({
    ...trace,
    line: { color: "red" }, // Set the line color to red
  }));

  return (
    <div>
      {console.log(graphData)}
      <Plot data={plotData} layout={plotLayout} config={{ responsive: true }} />
    </div>
  );
};

export default GraphComponent;
