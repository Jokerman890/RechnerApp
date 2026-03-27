import test from 'node:test';
import assert from 'node:assert/strict';
import { Debt, getDebtMeta } from './debt';

const REFERENCE_DATE = new Date('2026-03-27T10:30:00');

test('getDebtMeta bewertet Status-Kantenfälle korrekt', () => {
  const statusCases: Array<{
    label: string;
    debt: Debt;
    expectedStatus: 'open' | 'partial' | 'paid';
    expectedUrgency: ReturnType<typeof getDebtMeta>['urgency'];
  }> = [
    {
      label: 'offen ohne Fälligkeitsdatum',
      debt: { id: 'a', name: 'A', amountCents: 50000 },
      expectedStatus: 'open',
      expectedUrgency: 'noDueDate',
    },
    {
      label: 'teilbezahlt',
      debt: { id: 'b', name: 'B', amountCents: 50000, paidCents: 15000, dueDate: '2026-04-05' },
      expectedStatus: 'partial',
      expectedUrgency: 'upcoming',
    },
    {
      label: 'bezahlt',
      debt: { id: 'c', name: 'C', amountCents: 50000, paidCents: 50000, dueDate: '2026-03-10' },
      expectedStatus: 'paid',
      expectedUrgency: 'paid',
    },
  ];

  for (const statusCase of statusCases) {
    const result = getDebtMeta(statusCase.debt, REFERENCE_DATE);
    assert.equal(result.paymentStatus, statusCase.expectedStatus, statusCase.label);
    assert.equal(result.urgency, statusCase.expectedUrgency, statusCase.label);
  }
});

test('getDebtMeta leitet Dringlichkeit und Priorität korrekt ab', () => {
  const urgencyCases: Array<{
    label: string;
    debt: Debt;
    expectedUrgency: ReturnType<typeof getDebtMeta>['urgency'];
    expectedDaysUntilDue: number | null;
    expectedPriority: number;
  }> = [
    {
      label: 'bald fällig',
      debt: { id: 'd', name: 'D', amountCents: 50000, dueDate: '2026-03-30' },
      expectedUrgency: 'dueSoon',
      expectedDaysUntilDue: 3,
      expectedPriority: 2,
    },
    {
      label: 'heute fällig',
      debt: { id: 'e', name: 'E', amountCents: 50000, dueDate: '2026-03-27' },
      expectedUrgency: 'dueToday',
      expectedDaysUntilDue: 0,
      expectedPriority: 1,
    },
    {
      label: 'überfällig',
      debt: { id: 'f', name: 'F', amountCents: 50000, dueDate: '2026-03-24' },
      expectedUrgency: 'overdue',
      expectedDaysUntilDue: -3,
      expectedPriority: 0,
    },
  ];

  for (const urgencyCase of urgencyCases) {
    const result = getDebtMeta(urgencyCase.debt, REFERENCE_DATE);
    assert.equal(result.urgency, urgencyCase.expectedUrgency, urgencyCase.label);
    assert.equal(result.daysUntilDue, urgencyCase.expectedDaysUntilDue, urgencyCase.label);
    assert.equal(result.priority, urgencyCase.expectedPriority, urgencyCase.label);
  }
});
