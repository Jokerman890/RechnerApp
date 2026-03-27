export type View = 'dashboard' | 'claims' | 'details' | 'payment' | 'inventory' | 'sales' | 'settings' | 'calculator' | 'customers';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastOrder: string;
  totalSpent: string;
  avatar: string;
}

export interface KPI {
  label: string;
  value: string;
  trend: string;
  icon: string;
  color: 'primary' | 'tertiary' | 'error';
}

export interface Activity {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  time: string;
  icon: string;
  color: 'primary' | 'tertiary' | 'error';
}

export interface Claim {
  id: string;
  name: string;
  status: 'Kritisch' | 'Fällig' | 'Ratenzahlung' | 'Normal';
  statusDetail: string;
  amount: string;
  overdueDays?: number;
  dueDate?: string;
}

export type DebtReminderMode =
  | 'none'
  | 'due_day'
  | '1_day_before'
  | '3_days_before'
  | '7_days_before'
  | 'daily_after_due'
  | 'every_3_days'
  | 'weekly'
  | 'custom_date';

export interface DebtPayment {
  id: string;
  amount: number;
  createdAt: string;
  note?: string;
}

export interface Debt {
  id: string;
  name: string;
  originalAmount: number;
  phone?: string;
  dueDate?: string;
  reminderMode: DebtReminderMode;
  reminderDate?: string;
  note?: string;
  contactLink?: string;
  payments: DebtPayment[];
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  location: string;
  units: number;
  status: 'WENIG' | 'OPTIMAL';
  image: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  icon: string;
}
