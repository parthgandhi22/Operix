import { useState } from "react";
import axios from "../axiosConfig";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function BurnRateChart(){

  const [cash,setCash] = useState(1000000);

  const [expenses,setExpenses] = useState([
    200000,220000,240000,250000
  ]);

  const [chartData,setChartData] = useState(null);

  const predict = async ()=>{

    try{

      const res = await axios.post("/finance/burn-rate",{
        expenses,
        cash:Number(cash)
      });

      const labels = [
        "Month1","Month2","Month3","Month4","Month5","Month6"
      ];

      setChartData({
        labels,
        datasets:[
          {
            label:"Cash Remaining",
            data:res.data.cashRemaining,
            borderColor:"red",
            backgroundColor:"rgba(255,0,0,0.1)",
            tension:0.3,
            pointRadius:4
          }
        ]
      });

    }catch(err){
      console.error(err);
    }

  };

  return(

    <div className="section">

      <h2>Burn Rate Prediction</h2>

      <div style={{marginBottom:"15px",display:"flex",gap:"10px"}}>

        <input
          type="number"
          value={cash}
          onChange={(e)=>setCash(e.target.value)}
          placeholder="Current Cash"
        />

        <button onClick={predict}>
          Predict Burn Rate
        </button>

      </div>

      {chartData && (

        <div className="burnrate-chart">

          <Line
            data={chartData}
            options={{
              responsive:true,
              maintainAspectRatio:false
            }}
          />

        </div>

      )}

    </div>
  );
}

export default BurnRateChart;