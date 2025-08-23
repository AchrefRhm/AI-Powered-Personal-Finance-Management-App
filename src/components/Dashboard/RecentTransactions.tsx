import React from 'react';
import { Transaction } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface RecentTransactionsProps {
  transactions: Transaction[];
  onViewAll: () => void;
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions, onViewAll }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
      
      <div className="space-y-4">
        {transactions.slice(0, 5).map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
            <div className="flex-1">
              <div className="font-medium text-gray-900">{transaction.description}</div>
              <div className="text-sm text-gray-600">{transaction.category}</div>
              <div className="text-xs text-gray-500">{formatDate(transaction.date)}</div>
            </div>
            
            <div className="text-right">
              <div className={`font-semibold ${
                transaction.type === 'income' 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : ''}{formatCurrency(transaction.amount)}
              </div>
              <div className="text-xs text-gray-500">{transaction.account}</div>
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={onViewAll}
        className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
      >
        View All Transactions
      </button>
    </div>
  );
};