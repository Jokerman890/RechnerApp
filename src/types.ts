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
