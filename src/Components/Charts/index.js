import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./index.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

export function Charts(props) {
  const { expenseByCategory, total } = props;
  console.log(expenseByCategory, total);

  let category = expenseByCategory ? expenseByCategory : [];
  const categoryNames = category.map((element) => {
    const name = element.name.replace(/\b\w/g, (match) => match.toUpperCase()); // Capitalize
    return name;
  });
  const categoryAmount = category.map((element) => {
    //   console.log(breakdownOverview[0]);
    const percent = (element.totalAmount / total) * 100;
    return percent.toFixed(1);
  });

  const getRandomColor = (array) => {
    const colors = [
      "rgba(0,0,0,1)",
      "rgba(150,0,0,1)",
      "rgba(0,150,0,1)",
      "rgba(0,0,150,1)",
      "rgba(150,150,0,1)",
      "rgba(0,150,150,1)",
      "rgba(150,0,150,1)",
      "rgba(150,150,150,1)",
    ];
    const missingColors = array.length - colors.length;
    if (missingColors > 0) {
      let r = 0;
      let g = 0;
      let b = 0;
      let a = 1;
      for (let i = 0; i < missingColors; i++) {
        while (colors.includes(`rgba(${r},${g},${b},${a})`)) {
          r = 100 + Math.floor(Math.random() * 100);
          g = 100 + Math.floor(Math.random() * 100);
          b = 100 + Math.floor(Math.random() * 100);
          a = Math.random();
        }
        let color = `rgba(${r},${g},${b},${a})`;
        colors.push(color);
      }
    }

    return colors;
  };

  const colors = getRandomColor(categoryAmount);

  const legends = categoryNames.map((element, index) => {
    const name = element.split("_").join(" ");
    return (
      <p className="legend" key={index}>
        <span className="color" style={{ background: colors[index] }}></span>
        <span className="name">{name}</span>
        <span className="ratio">{categoryAmount[index]} %</span>
      </p>
    );
  });

  const data = {
    datasets: [
      {
        data: categoryAmount,
        backgroundColor: colors,
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    events: [],
  };

  useEffect(() => {}, []);

  return (
    <div className="pie container-fluid">
      <div className="legends-ctn">{legends}</div>
      <div className="chart-div">
        <Doughnut data={data} options={chartOptions} />
      </div>
    </div>
  );
}
