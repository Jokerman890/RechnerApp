export interface Debt {
  id: string;
  name: string;
  amountCents: number;
  dueDate?: string;
  paidCents?: number;
}

export type DebtUrgency =
  | 'overdue'
  | 'dueToday'
  | 'dueSoon'
  | 'upcoming'
  | 'noDueDate'
  | 'paid';

export interface DebtMeta {
  openCents: number;
  paymentStatus: 'open' | 'partial' | 'paid';
  urgency: DebtUrgency;
  daysUntilDue: number | null;
  priority: number;
}

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getDebtMeta(debt: Debt, referenceDate: Date = new Date()): DebtMeta {
  const paidCents = Math.max(0, debt.paidCents ?? 0);
  const openCents = Math.max(0, debt.amountCents - paidCents);

  const paymentStatus: DebtMeta['paymentStatus'] =
    openCents === 0 ? 'paid' : paidCents > 0 ? 'partial' : 'open';

  if (paymentStatus === 'paid') {
    return {
      openCents,
      paymentStatus,
      urgency: 'paid',
      daysUntilDue: null,
      priority: 5,
    };
  }

  if (!debt.dueDate) {
    return {
      openCents,
      paymentStatus,
      urgency: 'noDueDate',
      daysUntilDue: null,
      priority: 3,
    };
  }

  const due = startOfDay(new Date(debt.dueDate));
  const today = startOfDay(referenceDate);
  const daysUntilDue = Math.round((due.getTime() - today.getTime()) / MS_PER_DAY);

  if (daysUntilDue < 0) {
    return { openCents, paymentStatus, urgency: 'overdue', daysUntilDue, priority: 0 };
  }

  if (daysUntilDue === 0) {
    return { openCents, paymentStatus, urgency: 'dueToday', daysUntilDue, priority: 1 };
  }

  if (daysUntilDue <= 7) {
    return { openCents, paymentStatus, urgency: 'dueSoon', daysUntilDue, priority: 2 };
  }

  return { openCents, paymentStatus, urgency: 'upcoming', daysUntilDue, priority: 4 };
}

export function formatEuroFromCents(cents: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(cents / 100);
}
