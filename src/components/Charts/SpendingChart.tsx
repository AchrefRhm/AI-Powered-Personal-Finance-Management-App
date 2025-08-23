import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Transaction } from '../../types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface SpendingChartProps {
  transactions: Transaction[];
  type: 'bar' | 'doughnut';
}

export const SpendingChart: React.FC<SpendingChartProps> = ({ transactions, type }) => {
  const expenses = transactions.filter(t => t.type === 'expense');
  
  const categoryTotals = expenses.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + Math.abs(transaction.amount);
    return acc;
  }, {} as Record<string, number>);

  const sortedCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  const labels = sortedCategories.map(([category]) => category);
  const data = sortedCategories.map(([, amount]) => amount);

  const colors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
    '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'
  ];

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Amount Spent',
        data,
        backgroundColor: type === 'doughnut' ? colors : colors[0],
        borderColor: type === 'doughnut' ? colors : colors[0],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: type === 'doughnut' ? 'right' : 'top',
      },
      title: {
        display: true,
        text: 'Spending by Category',
      },
    },
    scales: type === 'bar' ? {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          }
        }
      }
    } : undefined,
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="h-80">
        {type === 'bar' ? (
          <Bar data={chartData} options={options as any} />
        ) : (
          <Doughnut data={chartData} options={options as any} />
        )}
      </div>
    </div>
  );
};