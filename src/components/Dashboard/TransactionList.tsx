import { Transaction } from '@/types/transaction';
import { TrendingUp, TrendingDown, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export function TransactionList({ transactions, onDelete }: TransactionListProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-card rounded-2xl p-8 shadow-card text-center">
        <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
          <TrendingUp className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="font-display font-semibold text-foreground mb-2">No transactions yet</h3>
        <p className="text-sm text-muted-foreground">
          Add your first transaction to start tracking your finances
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl shadow-card overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="font-display font-semibold text-foreground">Recent Transactions</h3>
      </div>
      <div className="divide-y divide-border">
        {transactions.map((transaction, index) => (
          <div 
            key={transaction.id} 
            className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
              transaction.type === 'income' ? 'bg-income-muted' : 'bg-expense-muted'
            )}>
              {transaction.type === 'income' ? (
                <TrendingUp className="w-5 h-5 text-income" />
              ) : (
                <TrendingDown className="w-5 h-5 text-expense" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">
                {transaction.category}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {transaction.description || 'No description'}
              </p>
            </div>

            <div className="text-right shrink-0">
              <p className={cn(
                "font-semibold",
                transaction.type === 'income' ? 'text-income' : 'text-expense'
              )}>
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </p>
              <p className="text-xs text-muted-foreground">
                {format(new Date(transaction.date), 'MMM d, yyyy')}
              </p>
            </div>

            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onDelete(transaction.id)}
              className="shrink-0 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
