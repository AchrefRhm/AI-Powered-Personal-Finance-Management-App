import React from 'react';
import { Budget } from '../../types';
import { formatCurrency, getBudgetStatus } from '../../utils/formatters';

interface BudgetOverviewProps {
  budgets: Budget[];
}

export const BudgetOverview: React.FC<BudgetOverviewProps> = ({ budgets }) => {
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.limit, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const remainingBudget = totalBudget - totalSpent;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Overview</h3>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Total Budget</span>
          <span className="font-semibold">{formatCurrency(totalBudget)}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Total Spent</span>
          <span className="font-semibold text-red-600">{formatCurrency(totalSpent)}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600">Remaining</span>
          <span className={`font-semibold ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(remainingBudget)}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              (totalSpent / totalBudget) > 1 ? 'bg-red-500' : 
              (totalSpent / totalBudget) > 0.8 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min((totalSpent / totalBudget) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-3">
        {budgets.slice(0, 4).map((budget) => {
          const percentage = (budget.spent / budget.limit) * 100;
          const status = getBudgetStatus(budget.spent, budget.limit);
          
          return (
            <div key={budget.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">{budget.category}</span>
                <span className={`text-sm font-semibold ${status.textColor}`}>
                  {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full transition-all duration-300 ${status.color}`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};