import { Transaction, Budget, Investment, FinancialGoal, FinancialHealth, AIInsight, Notification } from '../types';

export const mockTransactions: Transaction[] = [
  { id: '1', amount: -85.50, description: 'Grocery Shopping', category: 'Food & Dining', date: '2024-01-15', type: 'expense', account: 'Checking' },
  { id: '2', amount: -1200.00, description: 'Rent Payment', category: 'Housing', date: '2024-01-01', type: 'expense', account: 'Checking' },
  { id: '3', amount: 3500.00, description: 'Salary', category: 'Salary', date: '2024-01-01', type: 'income', account: 'Checking' },
  { id: '4', amount: -45.20, description: 'Gas Station', category: 'Transportation', date: '2024-01-14', type: 'expense', account: 'Credit Card' },
  { id: '5', amount: -29.99, description: 'Netflix Subscription', category: 'Entertainment', date: '2024-01-10', type: 'expense', account: 'Credit Card' },
  { id: '6', amount: -156.78, description: 'Electricity Bill', category: 'Utilities', date: '2024-01-08', type: 'expense', account: 'Checking' },
  { id: '7', amount: -67.45, description: 'Restaurant Dinner', category: 'Food & Dining', date: '2024-01-12', type: 'expense', account: 'Credit Card' },
  { id: '8', amount: 500.00, description: 'Freelance Work', category: 'Freelance', date: '2024-01-10', type: 'income', account: 'Checking' },
  { id: '9', amount: -89.99, description: 'Gym Membership', category: 'Health & Fitness', date: '2024-01-05', type: 'expense', account: 'Checking' },
  { id: '10', amount: -234.56, description: 'Online Shopping', category: 'Shopping', date: '2024-01-13', type: 'expense', account: 'Credit Card' },
];

export const mockBudgets: Budget[] = [
  { id: '1', category: 'Food & Dining', limit: 400, spent: 152.95, period: 'monthly' },
  { id: '2', category: 'Transportation', limit: 200, spent: 45.20, period: 'monthly' },
  { id: '3', category: 'Entertainment', limit: 150, spent: 29.99, period: 'monthly' },
  { id: '4', category: 'Shopping', limit: 300, spent: 234.56, period: 'monthly' },
  { id: '5', category: 'Health & Fitness', limit: 100, spent: 89.99, period: 'monthly' },
  { id: '6', category: 'Utilities', limit: 250, spent: 156.78, period: 'monthly' },
];

export const mockInvestments: Investment[] = [
  { id: '1', name: 'Apple Inc. (AAPL)', type: 'stocks', currentValue: 15420, initialInvestment: 12000, riskLevel: 'medium', expectedReturn: 8.5 },
  { id: '2', name: 'Vanguard S&P 500 ETF', type: 'etf', currentValue: 8950, initialInvestment: 8000, riskLevel: 'low', expectedReturn: 7.2 },
  { id: '3', name: 'US Treasury Bonds', type: 'bonds', currentValue: 5100, initialInvestment: 5000, riskLevel: 'low', expectedReturn: 3.5 },
  { id: '4', name: 'Bitcoin', type: 'crypto', currentValue: 3200, initialInvestment: 4000, riskLevel: 'high', expectedReturn: 12.8 },
  { id: '5', name: 'Microsoft Corporation', type: 'stocks', currentValue: 7850, initialInvestment: 7000, riskLevel: 'medium', expectedReturn: 9.1, recommended: true },
  { id: '6', name: 'High-Yield Savings', type: 'savings', currentValue: 12500, initialInvestment: 12000, riskLevel: 'low', expectedReturn: 4.2 },
];

export const mockGoals: FinancialGoal[] = [
  { id: '1', name: 'Emergency Fund', targetAmount: 15000, currentAmount: 8500, deadline: '2024-12-31', priority: 'high' },
  { id: '2', name: 'Vacation Fund', targetAmount: 5000, currentAmount: 2100, deadline: '2024-08-15', priority: 'medium' },
  { id: '3', name: 'New Car', targetAmount: 25000, currentAmount: 3200, deadline: '2025-06-30', priority: 'medium' },
  { id: '4', name: 'House Down Payment', targetAmount: 60000, currentAmount: 15000, deadline: '2026-01-01', priority: 'high' },
];

export const mockFinancialHealth: FinancialHealth = {
  score: 78,
  factors: {
    budgetAdherence: 85,
    savingsRate: 72,
    debtToIncome: 68,
    emergencyFund: 85,
  },
  recommendations: [
    'Consider increasing your savings rate to 25% of income',
    'Your shopping budget is 78% over limit - review recent purchases',
    'Great job maintaining your emergency fund target',
    'Consider diversifying your investment portfolio',
  ],
};

export const mockAIInsights: AIInsight[] = [
  {
    id: '1',
    type: 'spending',
    title: 'Unusual Spending Pattern Detected',
    message: 'Your shopping expenses are 78% higher than usual this month. Consider reviewing recent purchases.',
    action: 'Review Shopping Category',
    priority: 'high',
    date: '2024-01-15',
  },
  {
    id: '2',
    type: 'saving',
    title: 'Savings Opportunity',
    message: 'Based on your income pattern, you could save an additional $200/month by optimizing your dining expenses.',
    action: 'Create Savings Plan',
    priority: 'medium',
    date: '2024-01-14',
  },
  {
    id: '3',
    type: 'investment',
    title: 'Investment Recommendation',
    message: 'Your portfolio could benefit from more diversification. Consider adding international ETFs.',
    action: 'Explore Investments',
    priority: 'medium',
    date: '2024-01-13',
  },
  {
    id: '4',
    type: 'budget',
    title: 'Budget Achievement',
    message: 'Congratulations! You\'re 23% under budget for transportation this month.',
    priority: 'low',
    date: '2024-01-12',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Budget Alert',
    message: 'You\'ve exceeded your shopping budget by $34.56',
    type: 'warning',
    timestamp: '2024-01-15T10:30:00Z',
    read: false,
  },
  {
    id: '2',
    title: 'Goal Progress',
    message: 'You\'re 57% towards your Emergency Fund goal!',
    type: 'success',
    timestamp: '2024-01-14T15:45:00Z',
    read: false,
  },
  {
    id: '3',
    title: 'Investment Update',
    message: 'Your Apple stock is up 12% this month',
    type: 'success',
    timestamp: '2024-01-13T09:15:00Z',
    read: true,
  },
];

export const categories = [
  'Food & Dining',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Health & Fitness',
  'Utilities',
  'Housing',
  'Salary',
  'Freelance',
  'Investment',
  'Other',
];