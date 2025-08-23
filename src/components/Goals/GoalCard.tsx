import React from 'react';
import { FinancialGoal } from '../../types';
import { formatCurrency, calculateProgress, formatDate } from '../../utils/formatters';
import { Target, Calendar, TrendingUp } from 'lucide-react';

interface GoalCardProps {
  goal: FinancialGoal;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
  const remaining = goal.targetAmount - goal.currentAmount;
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">{goal.name}</h3>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
          {goal.priority}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm font-medium">{progress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600 mb-1">Current</div>
            <div className="font-semibold text-green-600">{formatCurrency(goal.currentAmount)}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Target</div>
            <div className="font-semibold">{formatCurrency(goal.targetAmount)}</div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Due {formatDate(goal.deadline)}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-red-600">
            <TrendingUp className="w-4 h-4" />
            <span>{formatCurrency(remaining)} to go</span>
          </div>
        </div>
      </div>
    </div>
  );
};