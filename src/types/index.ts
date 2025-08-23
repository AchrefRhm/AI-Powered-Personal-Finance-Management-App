export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: 'income' | 'expense';
  account?: string;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: 'monthly' | 'yearly';
}

export interface Investment {
  id: string;
  name: string;
  type: 'stocks' | 'bonds' | 'etf' | 'crypto' | 'savings';
  currentValue: number;
  initialInvestment: number;
  riskLevel: 'low' | 'medium' | 'high';
  expectedReturn: number;
  recommended?: boolean;
}

export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
}

export interface FinancialHealth {
  score: number;
  factors: {
    budgetAdherence: number;
    savingsRate: number;
    debtToIncome: number;
    emergencyFund: number;
  };
  recommendations: string[];
}

export interface AIInsight {
  id: string;
  type: 'spending' | 'saving' | 'investment' | 'budget';
  title: string;
  message: string;
  action?: string;
  priority: 'low' | 'medium' | 'high';
  date: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  read: boolean;
}