import React from 'react';
import { AIInsight } from '../../types';
import { Brain, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface AIInsightsProps {
  insights: AIInsight[];
}

export const AIInsights: React.FC<AIInsightsProps> = ({ insights }) => {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'spending': return AlertTriangle;
      case 'saving': return TrendingUp;
      case 'investment': return TrendingUp;
      case 'budget': return CheckCircle;
      default: return Brain;
    }
  };

  const getInsightColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Brain className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
      </div>
      
      <div className="space-y-4">
        {insights.map((insight) => {
          const Icon = getInsightIcon(insight.type);
          
          return (
            <div 
              key={insight.id} 
              className={`border-l-4 p-4 rounded-r-lg ${getInsightColor(insight.priority)}`}
            >
              <div className="flex items-start space-x-3">
                <Icon className="w-5 h-5 mt-1 text-gray-600" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
                  <p className="text-sm text-gray-700 mb-2">{insight.message}</p>
                  {insight.action && (
                    <button className="text-xs font-medium text-blue-600 hover:text-blue-700">
                      {insight.action}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};