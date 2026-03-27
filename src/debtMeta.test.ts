import { describe, expect, it } from 'vitest';
import { getDebtMeta } from './debtMeta';

describe('getDebtMeta', () => {
  const now = new Date('2026-03-27T10:00:00.000Z');

  it('maps status edge cases correctly (open without due date, partial, paid)', () => {
    const openWithoutDue = getDebtMeta({ totalAmount: 100, paidAmount: 0, dueDate: null }, now);
    const partial = getDebtMeta({ totalAmount: 100, paidAmount: 20, dueDate: '2026-03-30' }, now);
    const paid = getDebtMeta({ totalAmount: 100, paidAmount: 100, dueDate: '2026-03-01' }, now);

    expect(openWithoutDue.status).toBe('open');
    expect(openWithoutDue.statusLabel).toBe('Offen');
    expect(openWithoutDue.urgency).toBe('normal');
    expect(openWithoutDue.daysUntilDue).toBeNull();

    expect(partial.status).toBe('partial');
    expect(partial.statusLabel).toBe('Teilbezahlt');
    expect(partial.openAmount).toBe(80);

    expect(paid.status).toBe('paid');
    expect(paid.statusLabel).toBe('Bezahlt');
    expect(paid.urgency).toBe('none');
    expect(paid.isOpen).toBe(false);
  });

  it('prioritizes urgency edge cases correctly (soon, today, overdue)', () => {
    const soon = getDebtMeta({ totalAmount: 100, dueDate: '2026-03-29' }, now);
    const today = getDebtMeta({ totalAmount: 100, dueDate: '2026-03-27' }, now);
    const overdue = getDebtMeta({ totalAmount: 100, dueDate: '2026-03-26' }, now);

    expect(soon.urgency).toBe('soon');
    expect(soon.daysUntilDue).toBe(2);
    expect(soon.isDueThisWeek).toBe(true);

    expect(today.urgency).toBe('today');
    expect(today.isDueToday).toBe(true);

    expect(overdue.urgency).toBe('overdue');
    expect(overdue.isOverdue).toBe(true);
    expect(overdue.daysUntilDue).toBe(-1);
  });
});
