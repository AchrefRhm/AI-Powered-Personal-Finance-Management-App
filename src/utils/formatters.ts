export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString));
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const calculateProgress = (current: number, target: number): number => {
  return Math.min((current / target) * 100, 100);
};

export const getProgressColor = (percentage: number): string => {
  if (percentage >= 90) return 'text-green-600';
  if (percentage >= 70) return 'text-yellow-600';
  return 'text-red-600';
};

export const getBudgetStatus = (spent: number, limit: number) => {
  const percentage = (spent / limit) * 100;
  
  if (percentage > 100) {
    return { status: 'over', color: 'bg-red-500', textColor: 'text-red-600' };
  }
  if (percentage > 80) {
    return { status: 'warning', color: 'bg-yellow-500', textColor: 'text-yellow-600' };
  }
  return { status: 'good', color: 'bg-green-500', textColor: 'text-green-600' };
};