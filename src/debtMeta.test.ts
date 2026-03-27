import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { getDebtMeta } from './debtMeta';

describe('getDebtMeta', () => {
  const now = new Date('2026-03-27T10:00:00.000Z');

  it('maps status edge cases correctly (open without due date, partial, paid)', () => {
    const openWithoutDue = getDebtMeta({ totalAmount: 100, paidAmount: 0, dueDate: null }, now);
    const partial = getDebtMeta({ totalAmount: 100, paidAmount: 20, dueDate: '2026-03-30' }, now);
    const paid = getDebtMeta({ totalAmount: 100, paidAmount: 100, dueDate: '2026-03-01' }, now);

    assert.equal(openWithoutDue.status, 'open');
    assert.equal(openWithoutDue.statusLabel, 'Offen');
    assert.equal(openWithoutDue.urgency, 'normal');
    assert.equal(openWithoutDue.daysUntilDue, null);

    assert.equal(partial.status, 'partial');
    assert.equal(partial.statusLabel, 'Teilbezahlt');
    assert.equal(partial.openAmount, 80);

    assert.equal(paid.status, 'paid');
    assert.equal(paid.statusLabel, 'Bezahlt');
    assert.equal(paid.urgency, 'none');
    assert.equal(paid.isOpen, false);
  });

  it('prioritizes urgency edge cases correctly (soon, today, overdue)', () => {
    const soon = getDebtMeta({ totalAmount: 100, dueDate: '2026-03-29' }, now);
    const today = getDebtMeta({ totalAmount: 100, dueDate: '2026-03-27' }, now);
    const overdue = getDebtMeta({ totalAmount: 100, dueDate: '2026-03-26' }, now);

    assert.equal(soon.urgency, 'soon');
    assert.equal(soon.daysUntilDue, 2);
    assert.equal(soon.isDueThisWeek, true);

    assert.equal(today.urgency, 'today');
    assert.equal(today.isDueToday, true);

    assert.equal(overdue.urgency, 'overdue');
    assert.equal(overdue.isOverdue, true);
    assert.equal(overdue.daysUntilDue, -1);
  });
});
