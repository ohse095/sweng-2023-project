import testData from '../data/output.json'
import Button from '../components/Button';
import { useEffect, useRef, useState, useMemo } from 'react';
import renderPieChart from '../components/PieChart';
import './App.css';
import sample_data from '../data/output.json';

function ResultPage() {
  const [data, setData] = useState(testData);
  useEffect(() => {
    

    async function fetchData() {
      console.log("hereee");
      const user_url = "http://rte.ie";
      const responseTest = await fetch("http://localhost:3000/api/", {
        method: "POST",
        headers: {
          'Content-type': "application/json"
        },
        body: JSON.stringify({ url: user_url })
      })
      //console.log( await responseTest.json());
      const temp = await responseTest.json();
      setData(temp);
      //const response = await fetch("http://localhost:3000/api/");
      

    }
    fetchData();
  }, []);

  console.log(data);
  const [chartReady, setChartReady] = useState(false);
  const counts = useMemo(() => {
    const result = {};
    data.problems.forEach((problem) => {
      const impactList = problem.impactList;
      if (impactList !== null) {
        result[impactList] = (result[impactList] || 0) + 1;
      }
    });
    return result;
  }, [data]);

  const chartContainer = useRef(null);

  useEffect(() => {
    setChartReady(true);
  }, []);

  useEffect(() => {
    if (chartReady) {
      const chart = renderPieChart(counts, chartContainer.current);

      // Return a cleanup function that destroys the chart to avoid memory leaks
      return () => chart.destroy();
    }
  }, [counts, chartReady]);


  return (
    <div className="App">
      <header className="App-header">
        <h2>Accessibility Impacts by Frequency</h2>
        {chartReady && (
          <canvas
            ref={chartContainer}
            style={{ width: '500px' }}
          ></canvas>
        )}
        <br></br>
        <Button destination= '/rawdata' label="Click here to view the data from the scan." ></Button>
      </header>
    </div>
  );
  /*
   return (
      <h1>test</h1>
   );
   */

}
export default ResultPage;
