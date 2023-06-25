import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const GraphComponent = () => {
  const [graphData, setGraphData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:5001/generatemotorandvalve');
      const data = await response.data.graph_valveduration;
      const data1=JSON.parse(data);
      setGraphData(data1);
    //   console.log(graphData)
    };
    fetchData();
  },[]);

  const plotLayout = {
    plot_bgcolor: '#3f4494', // Set the background color of the graph
    title:{
      text:"Duration for Each Combined Action",
      font: { color: 'white' },
    },
    paper_bgcolor: '#141b2d', // Set the background color of the plotting area
    font: { color: 'white' }, // Set the text color to white
    xaxis: {
      title: {
        text: 'Combined_action',  
        font: { color: 'white' },
      },
    },
    yaxis: {
      title: {
        text: "Duration",
        tickangle: -45,
        font: { color: 'white' },
      },
    },
    margin: {
      l: 80, // Set the left margin in pixels
      r: 80, // Set the right margin in pixels
      t: 80, // Set the top margin in pixels
      b: 100, // Set the bottom margin in pixels
    },
  };

  const plotData = graphData?.data?.map((trace) => ({
    ...trace,
    line: { color: 'red' }, // Set the line color to red
  }));

  return (
    <div>
      <Plot
          data={plotData}
          layout={plotLayout}
      />
    </div>
  );
};

export default GraphComponent;