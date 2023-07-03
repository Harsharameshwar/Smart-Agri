import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import axios from "axios";

const GraphComponentWeather = () => {
  const [graphData, setGraphData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://mydesk.tk:5001/generate-weatherreport"
      );
      const data = await response.data?.plotlyGraph;
      const data1 = data && JSON.parse(data);
      setGraphData(data1);
      //   console.log(graphData)
    };
    fetchData();
  }, []);
  const plotLayout = {
    title: {
      text: "Weather-Report Graph",
      font: { color: "white" },
    },
    plot_bgcolor: "#3f4494",
    paper_bgcolor: "#141b2d",
    font: { color: "white" },
    xaxis: {
      title: {
        text: "Date",
        font: { color: "white" },
      },
    },
    yaxis: {
      title: {
        text: "Weather-Report Levels",
        font: { color: "white" },
      },
      //   tickangle: -45,
      automargin: true, // Rotate the y-axis labels by 45 degrees
    },
  };

  const plotData = graphData?.data?.map((trace) => ({
    ...trace,
    line: { color: "red" },
  }));
  return (
    <div>
      {/* {console.log(graphData)} */}
      <Plot data={plotData} layout={plotLayout} config={{ responsive: true }} />
    </div>
  );
};

export default GraphComponentWeather;
