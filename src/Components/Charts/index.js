import React, { useContext } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { AppContext } from "../../context";
import "./index.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

// export

export function Charts() {
  const { breakdownOverview } = useContext(AppContext);
  const categoryNames = breakdownOverview[0].expenseByCategory.map(
    (element) => {
      const name = element.name.replace(/\b\w/g, (match) =>
        match.toUpperCase()
      ); // Capitalize
      return name;
    }
  );
  const categoryAmount = breakdownOverview[0].expenseByCategory.map(
    (element) => {
      //   console.log(breakdownOverview[0]);
      const percent =
        (element.totalAmount / breakdownOverview[0].totalSum.totalAmount) * 100;
      return percent.toFixed(1);
    }
  );

  const getRandomColor = () => {
    const colorSet = new Set();

    let isDuplicate = true;
    let color;

    while (isDuplicate) {
      const r = Math.floor(Math.random() * 100); // Limit red value to 0-99
      const g = Math.floor(Math.random() * 100); // Limit green value to 0-99
      const b = Math.floor(Math.random() * 100); // Limit blue value to 0-99

      color = `rgb(${r},${g},${b})`;

      if (!colorSet.has(color)) {
        isDuplicate = false;
        colorSet.add(color);
      }
    }

    return color;
  };

  const colors = categoryAmount.map(() => getRandomColor());
  const legends = categoryNames.map((element, index) => {
    const name = element.split("_").join(" ");
    return (
      <p className="legend" key={index} style={{ color: colors[index] }}>
        <span className="color" style={{ background: colors[index] }}></span>
        <span className="name">{name}</span>
        <span className="ratio">{categoryAmount[index]} %</span>
      </p>
    );
  });
  //   console.log(colors);

  const data = {
    datasets: [
      {
        data: categoryAmount,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    events: [],
  };

  return (
    <div className="pie container-fluid">
      <div className="legends-ctn">{legends}</div>
      <div className="chart-div">
        <Doughnut data={data} options={chartOptions} />
      </div>
    </div>
  );
}
