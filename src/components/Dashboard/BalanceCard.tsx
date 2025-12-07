import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BalanceCardProps {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

export function BalanceCard({ totalBalance, totalIncome, totalExpenses }: BalanceCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Total Balance */}
      <div className="bg-primary rounded-2xl p-6 text-primary-foreground animate-slide-up">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
            <Wallet className="w-5 h-5" />
          </div>
          <span className="text-sm font-medium text-primary-foreground/70">Total Balance</span>
        </div>
        <p className="text-3xl font-display font-bold">
          {formatCurrency(totalBalance)}
        </p>
      </div>

      {/* Total Income */}
      <div className="bg-card rounded-2xl p-6 shadow-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-income-muted flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-income" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">Total Income</span>
        </div>
        <p className="text-2xl font-display font-bold text-foreground">
          {formatCurrency(totalIncome)}
        </p>
      </div>

      {/* Total Expenses */}
      <div className="bg-card rounded-2xl p-6 shadow-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-expense-muted flex items-center justify-center">
            <TrendingDown className="w-5 h-5 text-expense" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">Total Expenses</span>
        </div>
        <p className="text-2xl font-display font-bold text-foreground">
          {formatCurrency(totalExpenses)}
        </p>
      </div>
    </div>
  );
}
