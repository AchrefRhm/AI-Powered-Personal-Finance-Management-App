import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Transaction } from '../../types';
import { format, subDays, startOfDay } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface IncomeExpenseChartProps {
  transactions: Transaction[];
}

export const IncomeExpenseChart: React.FC<IncomeExpenseChartProps> = ({ transactions }) => {
  // Get last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = startOfDay(subDays(new Date(), 6 - i));
    return date;
  });

  const dailyData = last7Days.map(day => {
    const dayTransactions = transactions.filter(t => {
      const transactionDate = startOfDay(new Date(t.date));
      return transactionDate.getTime() === day.getTime();
    });

    const income = dayTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = dayTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    return {
      date: format(day, 'MMM dd'),
      income,
      expenses,
    };
  });

  const data = {
    labels: dailyData.map(d => d.date),
    datasets: [
      {
        label: 'Income',
        data: dailyData.map(d => d.income),
        backgroundColor: '#10B981',
        borderColor: '#10B981',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: dailyData.map(d => d.expenses),
        backgroundColor: '#EF4444',
        borderColor: '#EF4444',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Income vs Expenses (Last 7 Days)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          }
        }
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="h-80">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};