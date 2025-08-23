import { Transaction, Budget, Investment, FinancialGoal, FinancialHealth, AIInsight, Notification } from '../types';
import { 
  mockTransactions, 
  mockBudgets, 
  mockInvestments, 
  mockGoals, 
  mockFinancialHealth, 
  mockAIInsights,
  mockNotifications 
} from './mockData';

// Simulate API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Transaction API
export const transactionApi = {
  getAll: async (): Promise<Transaction[]> => {
    await delay(500);
    return mockTransactions;
  },
  
  create: async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
    await delay(300);
    const newTransaction = { ...transaction, id: Date.now().toString() };
    return newTransaction;
  },
  
  delete: async (id: string): Promise<void> => {
    await delay(200);
    // In a real app, this would delete from database
  }
};

// Budget API
export const budgetApi = {
  getAll: async (): Promise<Budget[]> => {
    await delay(400);
    return mockBudgets;
  },
  
  update: async (budget: Budget): Promise<Budget> => {
    await delay(300);
    return budget;
  }
};

// Investment API
export const investmentApi = {
  getAll: async (): Promise<Investment[]> => {
    await delay(600);
    return mockInvestments;
  },
  
  getRecommendations: async (riskProfile: string, goals: FinancialGoal[]): Promise<Investment[]> => {
    await delay(800);
    return mockInvestments.filter(inv => inv.recommended);
  }
};

// Goals API
export const goalsApi = {
  getAll: async (): Promise<FinancialGoal[]> => {
    await delay(300);
    return mockGoals;
  },
  
  create: async (goal: Omit<FinancialGoal, 'id'>): Promise<FinancialGoal> => {
    await delay(400);
    return { ...goal, id: Date.now().toString() };
  },
  
  update: async (goal: FinancialGoal): Promise<FinancialGoal> => {
    await delay(300);
    return goal;
  }
};

// Financial Health API
export const healthApi = {
  getScore: async (): Promise<FinancialHealth> => {
    await delay(700);
    return mockFinancialHealth;
  }
};

// AI Insights API
export const aiApi = {
  getInsights: async (): Promise<AIInsight[]> => {
    await delay(1000);
    return mockAIInsights;
  },
  
  generateRecommendation: async (type: string, data: any): Promise<AIInsight> => {
    await delay(1500);
    // Simulate AI processing
    return {
      id: Date.now().toString(),
      type: type as any,
      title: 'AI Generated Insight',
      message: 'Based on your financial data, here\'s a personalized recommendation...',
      priority: 'medium',
      date: new Date().toISOString(),
    };
  }
};

// Notifications API
export const notificationApi = {
  getAll: async (): Promise<Notification[]> => {
    await delay(200);
    return mockNotifications;
  },
  
  markAsRead: async (id: string): Promise<void> => {
    await delay(100);
    // Mark notification as read
  }
};