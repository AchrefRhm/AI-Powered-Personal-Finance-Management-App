import React, { useState, useEffect } from 'react';
import { Budget } from '../../types';
import { budgetApi } from '../../utils/api';
import { formatCurrency, getBudgetStatus } from '../../utils/formatters';
import { LoadingSpinner } from '../LoadingSpinner';
import { BudgetModal } from '../Modals/BudgetModal';
import { Plus, Edit, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

export const Budgets: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  useEffect(() => {
    loadBudgets();
  }, []);

  const loadBudgets = async () => {
    try {
      const data = await budgetApi.getAll();
      setBudgets(data);
    } catch (error) {
      console.error('Error loading budgets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBudget = async (budgetData: any) => {
    try {
      if (editingBudget) {
        const updatedBudget = await budgetApi.update(budgetData);
        setBudgets(prev => prev.map(b => b.id === updatedBudget.id ? updatedBudget : b));
      } else {
        setBudgets(prev => [...prev, budgetData]);
      }
      setEditingBudget(null);
    } catch (error) {
      console.error('Error saving budget:', error);
    }
  };

  const handleEditBudget = (budget: Budget) => {
    setEditingBudget(budget);
    setShowModal(true);
  };

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.limit, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const remainingBudget = totalBudget - totalSpent;

  if (loading) {
    return <LoadingSpinner size="lg" />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Budget Management</h1>
            <p className="text-gray-600 mt-2">Track and manage your spending limits</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Budget</span>
          </button>
        </div>
      </div>

      {/* Budget Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalBudget)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(totalSpent)}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Remaining</p>
              <p className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(remainingBudget)}
              </p>
            </div>
            <TrendingUp className={`w-8 h-8 ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`} />
          </div>
        </div>
      </div>

      {/* Budget List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Budget Categories</h3>
        </div>
        
        {budgets.length === 0 ? (
          <div className="text-center py-12">
            <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No budgets set yet</h3>
            <p className="text-gray-600 mb-4">Create your first budget to start tracking expenses</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Your First Budget
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {budgets.map((budget) => {
              const percentage = (budget.spent / budget.limit) * 100;
              const status = getBudgetStatus(budget.spent, budget.limit);
              
              return (
                <div key={budget.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{budget.category}</h4>
                      <p className="text-sm text-gray-600 capitalize">{budget.period} budget</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className={`text-lg font-semibold ${status.textColor}`}>
                          {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                        </p>
                        <p className="text-sm text-gray-600">{percentage.toFixed(1)}% used</p>
                      </div>
                      <button
                        onClick={() => handleEditBudget(budget)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-300 ${status.color}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                  
                  {percentage > 80 && (
                    <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                      <p className="text-sm text-yellow-800">
                        {percentage > 100 
                          ? `You've exceeded this budget by ${formatCurrency(budget.spent - budget.limit)}`
                          : `You're approaching your budget limit. ${formatCurrency(budget.limit - budget.spent)} remaining.`
                        }
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <BudgetModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingBudget(null);
        }}
        onSave={handleSaveBudget}
        budget={editingBudget}
      />
    </div>
  );
};