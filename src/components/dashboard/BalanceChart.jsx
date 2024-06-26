import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import useApi from '../../utils/useApi.js';

const BalanceChart = ({
  balances,
  formatCurrency,
  clickedBarIndex,
  setClickedBarIndex,
}) => {
  const api = useApi();
  const [maxBarThickness, setMaxBarThickness] = useState(14);
  const [labelSize, setLabelSize] = useState(15);

  // Change Bar Thickness When Resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1150) {
        setMaxBarThickness(8);
        setLabelSize(10);
      } else {
        setMaxBarThickness(14);
        setLabelSize(14);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Get Day Names
  const getDayNames = (data) => {
    const dayNames = [];
    const daysOfWeek = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

    data.forEach((item) => {
      const date = new Date(item.date);
      const dayName = daysOfWeek[date.getDay()];
      dayNames.push(dayName);
    });

    return dayNames;
  };

  // Chart
  const data = {
    labels: getDayNames(balances),
    datasets: [
      {
        data: balances.map((balance) => balance.balance),
        backgroundColor: (context) => {
          return context.dataIndex === clickedBarIndex ? '#6379F4' : '#9DA6B5';
        },
        maxBarThickness: maxBarThickness,
        borderRadius: 200,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    layout: {
      padding: {
        top: 20,
        left: 25,
        right: 25,
      },
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        display: false,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Nunito Sans',
          },
        },
      },
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Nunito Sans',
            size: 14,
            lineHeight: 1.35,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        display: (context) => context.dataIndex === clickedBarIndex,
        color: '#1EC15F',
        anchor: 'end',
        align: 'top',
        font: {
          family: 'Nunito Sans',
          weight: 700,
          size: labelSize,
        },
        clamp: true,
        borderRadius: 4,
        formatter: (value) => {
          return formatCurrency(value);
        },
      },
    },

    onClick: (_, chartElements) => {
      if (chartElements.length > 0) {
        if (clickedBarIndex !== chartElements[0].index) {
          const clickedIndex = chartElements[0].index;
          setClickedBarIndex(clickedIndex);
        } else {
          setClickedBarIndex(null);
        }
      } else {
        setClickedBarIndex(null);
      }
    },
  };

  return <Bar data={data} options={options} plugins={[ChartDataLabels]} />;
};

export default BalanceChart;
