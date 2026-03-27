export type DebtUrgency = 'none' | 'normal' | 'soon' | 'today' | 'overdue';
export type DebtStatus = 'open' | 'partial' | 'paid';

export interface DebtInput {
  totalAmount: number;
  paidAmount?: number;
  dueDate?: string | null;
}

export interface DebtMeta {
  status: DebtStatus;
  statusLabel: 'Offen' | 'Teilbezahlt' | 'Bezahlt';
  urgency: DebtUrgency;
  isOpen: boolean;
  isDueToday: boolean;
  isOverdue: boolean;
  isDueThisWeek: boolean;
  openAmount: number;
  daysUntilDue: number | null;
  dueDetail: string;
}

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const startOfDay = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const endOfDay = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);

const getWeekRange = (date: Date): { weekStart: Date; weekEnd: Date } => {
  const day = date.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const weekStart = startOfDay(new Date(date.getFullYear(), date.getMonth(), date.getDate() + diffToMonday));
  const weekEnd = endOfDay(new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6));
  return { weekStart, weekEnd };
};

export const getDebtMeta = (debt: DebtInput, nowInput: Date = new Date()): DebtMeta => {
  const paidAmount = Math.max(0, debt.paidAmount ?? 0);
  const openAmount = Math.max(0, debt.totalAmount - paidAmount);
  const isOpen = openAmount > 0;
  const status: DebtStatus = openAmount === 0 ? 'paid' : paidAmount > 0 ? 'partial' : 'open';
  const statusLabel: DebtMeta['statusLabel'] = status === 'paid' ? 'Bezahlt' : status === 'partial' ? 'Teilbezahlt' : 'Offen';

  if (!isOpen) {
    return {
      status,
      statusLabel,
      urgency: 'none',
      isOpen,
      isDueToday: false,
      isOverdue: false,
      isDueThisWeek: false,
      openAmount,
      daysUntilDue: null,
      dueDetail: 'Vollständig bezahlt',
    };
  }

  if (!debt.dueDate) {
    return {
      status,
      statusLabel,
      urgency: 'normal',
      isOpen,
      isDueToday: false,
      isOverdue: false,
      isDueThisWeek: false,
      openAmount,
      daysUntilDue: null,
      dueDetail: 'Ohne Fälligkeitsdatum',
    };
  }

  const dueDate = endOfDay(new Date(debt.dueDate));
  const now = startOfDay(nowInput);
  const dayDelta = Math.ceil((startOfDay(dueDate).getTime() - now.getTime()) / MS_PER_DAY);
  const { weekStart, weekEnd } = getWeekRange(nowInput);
  const isDueThisWeek = dueDate >= weekStart && dueDate <= weekEnd;
  const isOverdue = dayDelta < 0;
  const isDueToday = dayDelta === 0;
  const urgency: DebtUrgency = isOverdue ? 'overdue' : isDueToday ? 'today' : dayDelta <= 3 ? 'soon' : 'normal';

  return {
    status,
    statusLabel,
    urgency,
    isOpen,
    isDueToday,
    isOverdue,
    isDueThisWeek,
    openAmount,
    daysUntilDue: dayDelta,
    dueDetail: isOverdue ? `Seit ${Math.abs(dayDelta)} Tag(en) überfällig` : isDueToday ? 'Heute fällig' : `Fällig in ${dayDelta} Tag(en)`,
  };
};
