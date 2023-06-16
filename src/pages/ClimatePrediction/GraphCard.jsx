import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const GraphCard = () => {
  const [graphData, setGraphData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://127.0.0.1:5001/generate-weatherreport');
      const data = await response?.data?.plotlyGraph1;
      const data1=data && JSON.parse(data);
    //   console.log(data1)
      setGraphData(data1);
    //   console.log(graphData)
    };
    fetchData();
  },[]);
  const plotLayout = {
    title:{
        text:"Weather-Report Graph for Next 10 Days",
        font: { color: 'white' },
      },
    autosize: true,
    plot_bgcolor: "#3f4494",
    paper_bgcolor: "#141b2d",
    font: { color: "white" },
    xaxis: {
      title: {
        text: "Date-Time",
        font: { color: "white" },
      },
    },
    yaxis: {
      title: {
        text: "Weather Report",
        font: { color: "white" },
      },
      scaleanchor: "x",
      scaleratio: 1, 
      automargin: true,// Ensures the y-axis is scaled to match the x-axis, making the plot square
    },
  };

  const plotData = graphData?.data?.map((trace) => ({
    ...trace,
    line: { color: "red" },
  }));
  return (
    <div>
        {/* {console.log(graphData)} */}
      <Plot
          data={plotData}
          layout={plotLayout}
          style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default GraphCard;