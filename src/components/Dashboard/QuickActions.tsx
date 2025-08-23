import React from 'react';
import { Plus, Target, TrendingUp, CreditCard } from 'lucide-react';

interface QuickActionsProps {
  onAddTransaction: () => void;
  onSetGoal: () => void;
  onViewInvestments: () => void;
  onManageBudgets: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onAddTransaction,
  onSetGoal,
  onViewInvestments,
  onManageBudgets,
}) => {
  const actions = [
    {
      icon: Plus,
      label: 'Add Transaction',
      onClick: onAddTransaction,
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      icon: Target,
      label: 'Set Goal',
      onClick: onSetGoal,
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      icon: TrendingUp,
      label: 'Investments',
      onClick: onViewInvestments,
      color: 'bg-purple-500 hover:bg-purple-600',
    },
    {
      icon: CreditCard,
      label: 'Budgets',
      onClick: onManageBudgets,
      color: 'bg-orange-500 hover:bg-orange-600',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`${action.color} text-white p-4 rounded-lg transition-colors duration-200 flex flex-col items-center space-y-2`}
          >
            <action.icon className="w-6 h-6" />
            <span className="text-sm font-medium">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};