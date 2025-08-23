import React, { useState, useEffect } from 'react';
import { Investment } from '../../types';
import { investmentApi } from '../../utils/api';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { LoadingSpinner } from '../LoadingSpinner';
import { TrendingUp, TrendingDown, Star, DollarSign, PieChart } from 'lucide-react';

export const Investments: React.FC = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvestments();
  }, []);

  const loadInvestments = async () => {
    try {
      const data = await investmentApi.getAll();
      setInvestments(data);
    } catch (error) {
      console.error('Error loading investments:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalInvested = investments.reduce((sum, inv) => sum + inv.initialInvestment, 0);
  const totalGainLoss = totalValue - totalInvested;
  const totalReturnPercentage = totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'stocks': return '📈';
      case 'bonds': return '🏛️';
      case 'etf': return '📊';
      case 'crypto': return '₿';
      case 'savings': return '🏦';
      default: return '💰';
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Investment Portfolio</h1>
            <p className="text-gray-600 mt-2">Track your investments and portfolio performance</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Add Investment</span>
          </button>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Invested</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalInvested)}</p>
            </div>
            <PieChart className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Gain/Loss</p>
              <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalGainLoss >= 0 ? '+' : ''}{formatCurrency(totalGainLoss)}
              </p>
            </div>
            {totalGainLoss >= 0 ? 
              <TrendingUp className="w-8 h-8 text-green-600" /> : 
              <TrendingDown className="w-8 h-8 text-red-600" />
            }
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Return</p>
              <p className={`text-2xl font-bold ${totalReturnPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalReturnPercentage >= 0 ? '+' : ''}{formatPercentage(totalReturnPercentage)}
              </p>
            </div>
            {totalReturnPercentage >= 0 ? 
              <TrendingUp className="w-8 h-8 text-green-600" /> : 
              <TrendingDown className="w-8 h-8 text-red-600" />
            }
          </div>
        </div>
      </div>

      {/* Investments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {investments.map((investment) => {
          const gainLoss = investment.currentValue - investment.initialInvestment;
          const returnPercentage = (gainLoss / investment.initialInvestment) * 100;
          
          return (
            <div key={investment.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getTypeIcon(investment.type)}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{investment.name}</h3>
                    <p className="text-sm text-gray-600 capitalize">{investment.type}</p>
                  </div>
                </div>
                {investment.recommended && (
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                )}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Current Value</span>
                  <span className="font-semibold">{formatCurrency(investment.currentValue)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Initial Investment</span>
                  <span className="font-semibold">{formatCurrency(investment.initialInvestment)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Gain/Loss</span>
                  <span className={`font-semibold ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {gainLoss >= 0 ? '+' : ''}{formatCurrency(gainLoss)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Return</span>
                  <span className={`font-semibold ${returnPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {returnPercentage >= 0 ? '+' : ''}{formatPercentage(returnPercentage)}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(investment.riskLevel)}`}>
                    {investment.riskLevel} risk
                  </span>
                  <span className="text-sm text-gray-600">
                    Expected: {formatPercentage(investment.expectedReturn)}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md text-sm hover:bg-blue-700 transition-colors">
                  View Details
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded-md text-sm hover:bg-gray-50 transition-colors">
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Recommendations */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Investment Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Diversification Opportunity</h4>
            <p className="text-sm text-blue-800">
              Consider adding international ETFs to reduce portfolio risk. Your current allocation is 70% US-focused.
            </p>
            <button className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700">
              Explore Options →
            </button>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Rebalancing Suggestion</h4>
            <p className="text-sm text-green-800">
              Your tech stocks are performing well but now represent 45% of your portfolio. Consider taking some profits.
            </p>
            <button className="mt-2 text-sm font-medium text-green-600 hover:text-green-700">
              View Analysis →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};