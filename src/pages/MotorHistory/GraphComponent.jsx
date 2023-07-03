import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import axios from "axios";

const GraphComponent = () => {
  const [graphData, setGraphData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://mydesk.tk:5001/generatemotorandvalve"
      );
      const data = await response.data?.graph_motoranalysis;
      const data1 = data && JSON.parse(data);
      setGraphData(data1);
    };
    fetchData();
  }, []);

  //   useEffect(() => {
  //     const handleResize = () => {
  //       const graphContainer = document.getElementById('graph-container');
  //       const width = graphContainer.offsetWidth;

  //       const updatedLayout = {
  //         ...plotLayout,
  //         margin: {
  //           ...plotLayout.margin,
  //           l: width * 0.1, // Set the left margin to 10% of the container width
  //         },
  //       };

  //       Plot.react.Plotly.relayout('graph', updatedLayout);
  //     };

  //     window.addEventListener('resize', handleResize);
  //     return () => {
  //       window.removeEventListener('resize', handleResize);
  //     };
  //   }, []);

  const plotLayout = {
    title: {
      text: "Motor Data",
      font: { color: "white" },
    },
    plot_bgcolor: "#3f4494",
    paper_bgcolor: "#141b2d",
    font: { color: "white" },
    xaxis: {
      title: {
        text: "Time",
        font: { color: "white" },
      },
    },
    yaxis: {
      title: {
        text: "Duration (minutes)",
        font: { color: "white" },
      },
      side: "left",
      position: 0.05,
      color: "blue",
      tickfont: { color: "white" },
      tickcolor: "blue",
      linewidth: 1,
      automargin: true, // Adjusts the margin to prevent tick labels from extending outside the graph
    },
    yaxis2: {
      title: {
        text: "Combined Action",
        font: { color: "white" },
      },
      side: "right",
      position: 0.25,
      overlaying: "y",
      color: "green",
      tickfont: { color: "white" },
      tickcolor: "green",
      linewidth: 1,
      automargin: true, // Adjusts the margin to prevent tick labels from extending outside the graph
    },
    yaxis3: {
      title: {
        text: "Combined Description",
        font: { color: "white" },
      },
      side: "right",
      position: 0.45,
      overlaying: "y",
      color: "red",
      tickfont: { color: "white" },
      tickcolor: "red",
      linewidth: 1,
      automargin: true, // Adjusts the margin to prevent tick labels from extending outside the graph
    },
    margin: {
      l: 80, // Set the left margin in pixels
      r: 80, // Set the right margin in pixels
      t: 80, // Set the top margin in pixels
      b: 80, // Set the bottom margin in pixels
    },
    width: 1150, // Set the width of the plotting area
  };
  const plotData = graphData?.data?.map((trace) => ({
    ...trace,
  }));

  return (
    <div id="graph-container">
      <Plot
        id="graph"
        data={plotData}
        layout={plotLayout}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default GraphComponent;
