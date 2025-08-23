import React from 'react';
import { FinancialHealth } from '../../types';
import { formatPercentage } from '../../utils/formatters';

interface FinancialHealthScoreProps {
  health: FinancialHealth;
}

export const FinancialHealthScore: React.FC<FinancialHealthScoreProps> = ({ health }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Health Score</h3>
      
      <div className="flex items-center justify-center mb-6">
        <div className={`rounded-full p-8 ${getScoreBg(health.score)}`}>
          <div className={`text-4xl font-bold ${getScoreColor(health.score)}`}>
            {health.score}
          </div>
          <div className="text-sm text-gray-600 text-center mt-1">out of 100</div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Budget Adherence</span>
          <span className="font-medium">{formatPercentage(health.factors.budgetAdherence)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Savings Rate</span>
          <span className="font-medium">{formatPercentage(health.factors.savingsRate)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Debt Management</span>
          <span className="font-medium">{formatPercentage(health.factors.debtToIncome)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Emergency Fund</span>
          <span className="font-medium">{formatPercentage(health.factors.emergencyFund)}</span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Key Recommendations</h4>
        <div className="space-y-2">
          {health.recommendations.slice(0, 2).map((recommendation, index) => (
            <div key={index} className="text-sm text-gray-600 flex items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              {recommendation}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};