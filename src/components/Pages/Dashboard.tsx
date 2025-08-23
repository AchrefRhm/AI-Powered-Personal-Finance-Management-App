import React, { useState, useEffect } from 'react';
import { FinancialHealthScore } from '../Dashboard/FinancialHealthScore';
import { QuickActions } from '../Dashboard/QuickActions';
import { RecentTransactions } from '../Dashboard/RecentTransactions';
import { BudgetOverview } from '../Dashboard/BudgetOverview';
import { AIInsights } from '../Dashboard/AIInsights';
import { SpendingChart } from '../Charts/SpendingChart';
import { IncomeExpenseChart } from '../Charts/IncomeExpenseChart';
import { LoadingSpinner } from '../LoadingSpinner';
import { AddTransactionModal } from '../Modals/AddTransactionModal';
import { Transaction, Budget, FinancialHealth, AIInsight } from '../../types';
import { transactionApi, budgetApi, healthApi, aiApi } from '../../utils/api';

interface DashboardProps {
  onTabChange: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onTabChange }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [financialHealth, setFinancialHealth] = useState<FinancialHealth | null>(null);
  const [aiInsights, setAIInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [transactionsData, budgetsData, healthData, insightsData] = await Promise.all([
        transactionApi.getAll(),
        budgetApi.getAll(),
        healthApi.getScore(),
        aiApi.getInsights(),
      ]);

      setTransactions(transactionsData);
      setBudgets(budgetsData);
      setFinancialHealth(healthData);
      setAIInsights(insightsData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (transactionData: any) => {
    try {
      const newTransaction = await transactionApi.create(transactionData);
      setTransactions(prev => [newTransaction, ...prev]);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your financial overview.</p>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {financialHealth && <FinancialHealthScore health={financialHealth} />}
        <QuickActions
          onAddTransaction={() => setShowAddModal(true)}
          onSetGoal={() => onTabChange('goals')}
          onViewInvestments={() => onTabChange('investments')}
          onManageBudgets={() => onTabChange('budgets')}
        />
        <BudgetOverview budgets={budgets} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <IncomeExpenseChart transactions={transactions} />
        <SpendingChart transactions={transactions} type="doughnut" />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTransactions transactions={transactions} onViewAll={() => onTabChange('transactions')} />
        <AIInsights insights={aiInsights} />
      </div>

      <AddTransactionModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddTransaction}
      />
    </div>
  );
};