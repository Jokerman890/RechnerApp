import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutGrid, 
  ReceiptText, 
  Package, 
  Settings as SettingsIcon, 
  Calculator as CalculatorIcon,
  ShoppingCart,
  Bell,
  Search,
  Plus,
  ArrowLeft,
  MoreVertical,
  TrendingUp,
  Euro,
  Car,
  Receipt,
  CheckCircle2,
  PlusSquare,
  MapPin,
  Layers,
  FileText,
  Users,
  MoreHorizontal,
  ChevronRight,
  Fingerprint,
  Lock,
  Timer,
  EyeOff,
  Cloud,
  RefreshCw,
  LogOut,
  X,
  Nfc,
  ShieldCheck,
  Trash2,
  Minus,
  Smartphone,
  Speaker,
  Watch,
  Camera,
  Upload
} from 'lucide-react';
import { View, KPI, Activity, Product, CartItem, Customer } from './types';
import { Language, translations } from './translations';
import { Debt, formatEuroFromCents, getDebtMeta } from './debt';

// --- Mock Data ---
const CUSTOMERS: Customer[] = [
  { id: '1', name: 'Lukas Müller', email: 'lukas.mueller@example.com', phone: '+49 123 456789', lastOrder: 'Vor 2 Tagen', totalSpent: '4.854,50 €', avatar: 'https://picsum.photos/seed/lukas/200' },
  { id: '2', name: 'Sarah Schmidt', email: 'sarah.schmidt@example.com', phone: '+49 123 987654', lastOrder: 'Vor 5 Tagen', totalSpent: '1.250,00 €', avatar: 'https://picsum.photos/seed/sarah/200' },
  { id: '3', name: 'Felix Wagner', email: 'felix.wagner@example.com', phone: '+49 123 112233', lastOrder: 'Gestern', totalSpent: '850,00 €', avatar: 'https://picsum.photos/seed/felix/200' },
  { id: '4', name: 'Anna Weber', email: 'anna.weber@example.com', phone: '+49 123 445566', lastOrder: 'Vor 1 Std.', totalSpent: '450,00 €', avatar: 'https://picsum.photos/seed/anna/200' },
];
const KPIs: KPI[] = [
  { label: 'Umsatz Heute', value: '450,20€', trend: '+5.2% ggü. gestern', icon: 'euro', color: 'primary' },
  { label: 'Anfahrt', value: '145,00€', trend: '+2.1% ggü. gestern', icon: 'car', color: 'tertiary' },
  { label: 'Offene Posten', value: '2.840,00€', trend: '3 Rechnungen überfällig', icon: 'receipt', color: 'error' },
];

const ACTIVITIES: Activity[] = [
  { id: '1', title: 'Rechnung #RE-2023-089 bezahlt', subtitle: 'Kunde: Muster GmbH', amount: '+ 1.250,00€', time: 'Vor 2 Std.', icon: 'check', color: 'tertiary' },
  { id: '2', title: 'Neue Buchung erstellt', subtitle: 'Kunde: Max Mustermann', amount: '450,20€', time: 'Vor 5 Std.', icon: 'plus', color: 'primary' },
];

const DEBTS: Debt[] = [
  { id: '1', name: 'Lukas Müller', amountCents: 420000, dueDate: '2026-03-20' },
  { id: '2', name: 'Sarah Schmidt', amountCents: 125000, dueDate: '2026-03-27' },
  { id: '3', name: 'Felix Wagner', amountCents: 85000, dueDate: '2026-03-30' },
  { id: '4', name: 'Anna Weber', amountCents: 90000, paidCents: 45000 },
];

const PRODUCTS: Product[] = [
  { id: '1', name: 'Aura Watch S2', location: 'Regal A1', units: 12, status: 'WENIG', image: 'https://picsum.photos/seed/watch/200' },
  { id: '2', name: 'Liquid Sound G1', location: 'Zone C', units: 85, status: 'OPTIMAL', image: 'https://picsum.photos/seed/speaker/200' },
  { id: '3', name: 'Prism Display Pro', location: 'Regal B2', units: 42, status: 'OPTIMAL', image: 'https://picsum.photos/seed/display/200' },
];

// --- Components ---

const BottomNav = ({ currentView, setView, t }: { currentView: View, setView: (v: View) => void, t: any }) => {
  const navItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutGrid },
    { id: 'claims', label: t.claims, icon: ReceiptText },
    { id: 'customers', label: t.customers, icon: Users },
    { id: 'inventory', label: t.inventory, icon: Package },
    { id: 'settings', label: t.settings, icon: SettingsIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface-container/90 backdrop-blur-xl border-t border-outline-variant/15 px-4 pt-3 flex justify-around items-center" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 1rem)' }}>
      {navItems.map((item) => {
        const isActive = currentView === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => setView(item.id as View)}
            className={`flex flex-1 flex-col items-center gap-1 transition-colors relative ${isActive ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            {isActive && (
              <motion.div 
                layoutId="nav-active"
                className="absolute -top-3 w-8 h-1 bg-primary rounded-full blur-[2px]"
              />
            )}
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

const Dashboard = ({ setView, t }: { setView: (v: View) => void, t: any }) => (
  <div className="flex flex-col gap-8 pb-24">
    <header className="flex items-center justify-between px-6 py-4 glass-panel rounded-b-xl sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <div className="size-10 rounded-full bg-surface-container-highest border border-outline-variant/15 overflow-hidden">
          <img src="https://picsum.photos/seed/user/100" alt="Benutzer" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="font-bold text-xl leading-none">LiquidGlass</h1>
          <p className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-widest mt-1">{t.overview}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <button className="size-10 rounded-full glass-panel flex items-center justify-center hover:bg-surface-variant/60 transition-colors">
          <Bell size={20} />
        </button>
        <button className="size-10 rounded-full glass-panel flex items-center justify-center hover:bg-surface-variant/60 transition-colors">
          <Search size={20} />
        </button>
      </div>
    </header>

    <main className="px-6 flex flex-col gap-8">
      <section className="glass-panel rounded-xl p-8 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10">
          <h2 className="font-bold text-3xl tracking-tight mb-2">Willkommen zurück, <span className="primary-gradient-text">Valentina</span></h2>
          <p className="text-on-surface-variant">Hier ist dein aktueller Überblick für heute.</p>
          <button 
            onClick={() => setView('sales')}
            className="mt-6 w-full md:w-auto liquid-gradient rounded-full px-6 py-3 flex items-center justify-center gap-2 font-bold text-sm hover:scale-[1.02] transition-transform"
          >
            <Plus size={18} /> {t.sales}
          </button>
        </div>
      </section>

      <section>
        <h3 className="font-medium text-xl mb-6 px-2">Leistungskennzahlen</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {KPIs.map((kpi) => (
            <div key={kpi.label} className="glass-card rounded-xl p-6 flex flex-col gap-3 group relative overflow-hidden cursor-pointer">
              <div className={`absolute inset-0 bg-gradient-to-br from-${kpi.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="flex items-center justify-between">
                <p className="text-on-surface-variant text-sm font-medium">{kpi.label === 'Umsatz Heute' ? t.revenue_today : kpi.label === 'Anfahrt' ? t.arrival : t.open_items}</p>
                <div className={`size-8 rounded-full bg-${kpi.color}/10 flex items-center justify-center text-${kpi.color}`}>
                  {kpi.icon === 'euro' && <Euro size={16} />}
                  {kpi.icon === 'car' && <Car size={16} />}
                  {kpi.icon === 'receipt' && <Receipt size={16} />}
                </div>
              </div>
              <p className="font-bold text-3xl tracking-tight mt-2">{kpi.value}</p>
              <div className={`flex items-center gap-1 mt-1 ${kpi.color === 'error' ? 'text-error' : 'text-tertiary'}`}>
                <TrendingUp size={14} />
                <span className="text-xs font-bold">{kpi.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="font-medium text-xl mb-6 px-2">Schnellzugriff</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: t.sales, icon: PlusSquare, color: 'primary', view: 'sales' },
            { label: 'Export PDF', icon: FileText, color: 'secondary', view: 'dashboard' },
            { label: t.customers, icon: Users, color: 'tertiary', view: 'customers' },
            { label: t.calculator, icon: CalculatorIcon, color: 'on-surface-variant', view: 'calculator' },
          ].map((btn) => (
            <button 
              key={btn.label}
              onClick={() => setView(btn.view as View)}
              className="glass-card rounded-xl p-5 flex flex-col items-center justify-center gap-3 hover:bg-surface-container-highest transition-colors group"
            >
              <div className={`size-12 rounded-full bg-${btn.color}/10 flex items-center justify-center text-${btn.color} group-hover:scale-110 transition-transform`}>
                <btn.icon size={24} />
              </div>
              <span className="text-sm font-medium">{btn.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="glass-panel rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-medium text-xl">{t.recent_activities}</h3>
          <button className="text-primary text-sm font-bold hover:text-primary-dim transition-colors">Alle ansehen</button>
        </div>
        <div className="flex flex-col gap-4">
          {ACTIVITIES.map((act) => (
            <div key={act.id} className="flex items-center gap-4 p-4 rounded-lg bg-surface-container-lowest border border-outline-variant/10 hover:bg-surface-container transition-colors cursor-pointer">
              <div className={`size-10 rounded-full bg-${act.color}/20 flex items-center justify-center text-${act.color} shrink-0`}>
                {act.icon === 'check' ? <CheckCircle2 size={20} /> : <PlusSquare size={20} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{act.title}</p>
                <p className="text-on-surface-variant text-xs truncate mt-0.5">{act.subtitle}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-sm">{act.amount}</p>
                <p className="text-on-surface-variant text-xs mt-0.5">{act.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  </div>
);

const ClaimsList = ({ setView, t, showToast }: { setView: (v: View) => void, t: any, showToast: (m: string) => void }) => {
  const today = new Date();

  const debtRows = DEBTS.map((debt) => ({ debt, meta: getDebtMeta(debt, today) }))
    .sort((a, b) => a.meta.priority - b.meta.priority);

  const overdueTodayCount = debtRows.filter((row) => row.meta.urgency === 'overdue').length;
  const dueThisWeekCount = debtRows.filter((row) => row.meta.daysUntilDue !== null && row.meta.daysUntilDue >= 0 && row.meta.daysUntilDue <= 6).length;
  const totalOpenCents = debtRows.reduce((sum, row) => sum + row.meta.openCents, 0);

  return (
    <div className="flex flex-col gap-8 pb-32">
      <header className="sticky top-0 z-50 glass-panel border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant/15 overflow-hidden">
            <img src="https://picsum.photos/seed/user/100" alt="Benutzer" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">{t.claims}</h1>
        </div>
        <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center">
          <Bell size={20} />
        </button>
      </header>

      <main className="px-6 flex flex-col gap-10">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Mini-Dashboard</h3>
            <span className="text-xs uppercase tracking-wider text-on-surface-variant">Operativer Fokus</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-lg border border-outline-variant/20 bg-surface-container-low p-4">
              <p className="text-xs uppercase tracking-wider text-on-surface-variant mb-2">Heute überfällig</p>
              <p className="text-3xl font-bold">{overdueTodayCount}</p>
            </div>
            <div className="rounded-lg border border-outline-variant/20 bg-surface-container-low p-4">
              <p className="text-xs uppercase tracking-wider text-on-surface-variant mb-2">Diese Woche fällig</p>
              <p className="text-3xl font-bold">{dueThisWeekCount}</p>
            </div>
            <div className="rounded-lg border border-outline-variant/20 bg-surface-container-low p-4">
              <p className="text-xs uppercase tracking-wider text-on-surface-variant mb-2">Total offen</p>
              <p className="text-2xl font-bold">{formatEuroFromCents(totalOpenCents)}</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-outline-variant/15 pb-4">
            <h3 className="text-2xl font-bold">{t.open_claims}</h3>
            <button className="px-4 py-2 rounded-full glass-panel text-sm font-medium flex items-center gap-2">
              <Search size={16} /> {t.filter}
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {debtRows.map(({ debt, meta }) => {
              const badgeLabel =
                meta.urgency === 'overdue'
                  ? 'Kritisch · Überfällig'
                  : meta.urgency === 'dueToday'
                    ? 'Fällig · Heute'
                    : meta.urgency === 'dueSoon'
                      ? `Fällig · in ${meta.daysUntilDue} Tagen`
                      : meta.paymentStatus === 'partial'
                        ? 'Ratenzahlung'
                        : 'Normal';

              const showReminder = meta.urgency === 'overdue' || meta.urgency === 'dueToday' || meta.urgency === 'dueSoon';
              const badgeCritical = meta.urgency === 'overdue';
              const badgeDue = meta.urgency === 'dueToday' || meta.urgency === 'dueSoon';

              return (
                <div
                  key={debt.id}
                  onClick={() => setView('details')}
                  className="bg-surface-container rounded-lg p-5 border border-outline-variant/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden group cursor-pointer hover:bg-surface-container-high transition-colors"
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${badgeCritical ? 'bg-error' : badgeDue ? 'bg-tertiary' : 'bg-outline-variant'}`} />
                  <div className="flex items-center gap-4 pl-2">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${badgeCritical ? 'bg-error/10 text-error' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                      {badgeCritical ? <Receipt size={24} /> : <Users size={24} />}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">{debt.name}</h4>
                      <div className="flex items-center gap-2 text-sm mt-1">
                        <span className={`font-medium px-2 py-0.5 rounded-sm ${badgeCritical ? 'bg-error/20 text-error' : badgeDue ? 'bg-tertiary/20 text-tertiary' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                          {badgeLabel}
                        </span>
                        {meta.urgency === 'overdue' && meta.daysUntilDue !== null && (
                          <span className="text-on-surface-variant text-xs">• seit {Math.abs(meta.daysUntilDue)} Tagen</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <p className="text-xl font-bold">{formatEuroFromCents(meta.openCents)}</p>
                      <p className="text-xs text-on-surface-variant uppercase tracking-wider mt-1">{t.pending}</p>
                    </div>
                    {showReminder ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          showToast(t.reminder_sent);
                        }}
                        className="liquid-gradient px-6 py-2.5 rounded-full font-bold text-sm shadow-lg active:scale-95 transition-transform"
                      >
                        {t.send_reminder}
                      </button>
                    ) : (
                      <button className="glass-panel px-6 py-2.5 rounded-full font-bold text-sm">{t.details}</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

const DebtDetails = ({ setView, t, showToast }: { setView: (v: View) => void, t: any, showToast: (m: string) => void }) => (
  <div className="flex flex-col min-h-screen relative overflow-x-hidden">
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-[120px] opacity-20" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-secondary/10 blur-[120px] opacity-10" />
    </div>

    <header className="relative z-10 flex items-center justify-between p-6">
      <button onClick={() => setView('claims')} className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-surface-container transition-all">
        <ArrowLeft size={24} />
      </button>
      <div className="flex-1 flex justify-center">
        <div className="font-bold text-xl tracking-tighter opacity-60">LiquidGlass</div>
      </div>
      <button className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-surface-container transition-all">
        <MoreVertical size={24} />
      </button>
    </header>

    <main className="relative z-10 px-6 pb-32 flex flex-col gap-8">
      <section className="flex flex-col items-center pt-4 pb-8">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-6 glass-panel p-1">
          <img src="https://picsum.photos/seed/lukas/300" alt="Lukas" className="w-full h-full object-cover rounded-full" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Lukas Müller</h1>
        <span className="px-4 py-1.5 rounded-full bg-error/20 text-error text-xs font-extrabold uppercase tracking-wider mb-8">{t.critical}</span>
        
        <p className="text-[3.5rem] font-bold tracking-tighter leading-none mb-8">
          4.200,00 <span className="text-on-surface-variant text-[2rem]">€</span>
        </p>

        <div className="w-full max-w-sm glass-panel p-4 rounded-xl">
          <div className="flex justify-between items-end mb-3">
            <span className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-wider">{t.paid}</span>
            <div className="text-right">
              <span className="text-lg font-bold block leading-tight">654,50 €</span>
              <span className="text-xs text-outline block">{t.of} 4.854,50 €</span>
            </div>
          </div>
          <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full liquid-gradient rounded-full" style={{ width: '13.5%' }}>
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full h-[40%]" />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-medium px-2">{t.payment_history}</h2>
        <div className="relative flex flex-col gap-4 pl-4 before:content-[''] before:absolute before:left-8 before:top-4 before:bottom-4 before:w-[1px] before:bg-outline-variant/30">
          {[
            { title: t.travel_expenses_booked, amount: '+ 45,50 €', date: '12. Okt 2023', icon: Car, color: 'primary', isNegative: false },
            { title: t.partial_payment_cash, amount: '- 200,00 €', date: '10. Okt 2023', icon: Euro, color: 'secondary', isNegative: true },
            { title: t.partial_payment_card, amount: '- 500,00 €', date: '01. Okt 2023', icon: Receipt, color: 'secondary', isNegative: true },
          ].map((item, i) => (
            <div key={i} className="relative flex gap-6 items-start">
              <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-surface-container-highest border border-outline-variant/30 flex items-center justify-center mt-2">
                <item.icon size={14} className={`text-${item.color}`} />
              </div>
              <div className="flex-1 glass-panel rounded-lg p-5 hover:bg-white/5 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold">{item.title}</h3>
                  <span className={`font-bold ${item.isNegative ? 'text-tertiary' : 'text-error'}`}>{item.amount}</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant text-xs">
                  <Timer size={12} /> {item.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>

    <div className="fixed bottom-0 left-0 w-full p-6 pt-10 bg-gradient-to-t from-surface via-surface/90 to-transparent z-50">
      <div className="max-w-2xl mx-auto flex flex-col gap-4">
        <button 
          onClick={() => setView('payment')}
          className="w-full h-16 rounded-full liquid-gradient font-bold text-lg flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02] transition-transform"
        >
          <PlusSquare size={24} /> {t.add_payment}
        </button>
        <button 
          onClick={() => showToast(t.reminder_sent)}
          className="w-full h-14 rounded-full glass-panel font-medium flex items-center justify-center gap-2 hover:bg-surface-variant/60 transition-all"
        >
          <Bell size={20} /> {t.send_reminder}
        </button>
      </div>
    </div>
  </div>
);

const PaymentProcess = ({ setView, amount, t }: { setView: (v: View) => void, amount: number, t: any }) => (
  <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 blur-[80px] rounded-full" />
      <div className="absolute top-1/2 -right-48 w-[30rem] h-[30rem] bg-tertiary/10 blur-[80px] rounded-full" />
    </div>

    <header className="fixed top-0 w-full flex items-center justify-between px-6 h-16 bg-surface/60 backdrop-blur-xl border-b border-outline-variant/15">
      <button onClick={() => setView('details')} className="text-primary hover:opacity-80 transition-opacity">
        <X size={24} />
      </button>
      <h1 className="text-xl font-medium tracking-tight text-primary">{t.payment_process}</h1>
      <div className="w-6" />
    </header>

    <main className="flex flex-col items-center justify-center gap-12">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-tertiary opacity-20 blur-3xl animate-pulse scale-150" />
        <div className="relative w-64 h-64 flex items-center justify-center rounded-full bg-surface-container-highest/40 backdrop-blur-2xl border border-outline-variant/10 shadow-2xl">
          <div className="absolute flex items-center justify-center w-full h-full">
            <div className="absolute w-48 h-48 border-4 border-primary/20 rounded-full animate-ping" />
            <div className="absolute w-32 h-32 border-2 border-tertiary/30 rounded-full" />
          </div>
          <div className="flex flex-col items-center gap-4 z-20">
            <Nfc size={72} className="text-primary" />
            <Receipt size={36} className="text-tertiary/80" />
          </div>
        </div>
      </div>

      <div className="text-center space-y-4">
        <div className="flex flex-col items-center">
          <span className="text-[3.5rem] leading-none font-semibold tracking-tighter">{amount.toFixed(2)} €</span>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-tertiary rounded-full mt-4 opacity-60" />
        </div>
        <div className="pt-6">
          <p className="text-lg font-medium">{t.hold_card}</p>
          <p className="text-xs uppercase tracking-widest text-on-surface-variant mt-2">{t.ready_for_payment}</p>
        </div>
      </div>

      <div className="w-full max-w-sm grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl glass-panel flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Smartphone size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-tighter text-on-surface-variant font-semibold">{t.sensor}</span>
            <span className="text-xs font-medium">{t.active}</span>
          </div>
        </div>
        <div className="p-4 rounded-xl glass-panel flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
            <ShieldCheck size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-tighter text-on-surface-variant font-semibold">{t.security}</span>
            <span className="text-xs font-medium">{t.encrypted}</span>
          </div>
        </div>
      </div>
    </main>

    <div className="fixed bottom-0 left-0 w-full p-8 flex justify-center">
      <button 
        onClick={() => setView('details')}
        className="w-full max-w-md py-4 px-8 rounded-xl glass-panel font-medium tracking-wide hover:bg-surface-container-highest/50 transition-all active:scale-95"
      >
        {t.cancel}
      </button>
    </div>
  </div>
);

const Settings = ({ setView, lang, setLang, t }: { setView: (v: View) => void, lang: Language, setLang: (l: Language) => void, t: any }) => (
  <div className="flex flex-col min-h-screen pb-24">
    <header className="flex items-center justify-between p-6 bg-surface-dim/80 backdrop-blur-md sticky top-0 z-50">
      <button onClick={() => setView('dashboard')} className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-surface-container transition-colors">
        <ArrowLeft size={24} />
      </button>
      <h1 className="text-2xl font-bold tracking-tight">{t.settings}</h1>
      <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant/15">
        <img src="https://picsum.photos/seed/user/100" alt="Benutzer" className="w-full h-full object-cover" />
      </div>
    </header>

    <main className="px-6 space-y-8 max-w-2xl mx-auto w-full">
      <section className="mt-4 text-center space-y-2">
        <h2 className="text-4xl font-bold tracking-tight primary-gradient-text">{t.security_profile}</h2>
        <p className="text-on-surface-variant font-medium">{t.manage_vault_settings}</p>
      </section>

      <section className="glass-panel p-2 rounded-2xl">
        <h3 className="px-4 pt-4 pb-2 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">{t.language}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2">
          {(['de', 'en', 'ru', 'ar', 'tr', 'ro', 'pl'] as Language[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-4 py-3 rounded-xl font-bold text-xs transition-all ${lang === l ? 'liquid-gradient shadow-lg' : 'bg-surface-container hover:bg-surface-container-high'}`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      <section className="glass-panel p-2 rounded-2xl">
        <h3 className="px-4 pt-4 pb-2 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">{t.security}</h3>
        <div className="space-y-2">
          {[
            { label: t.change_pin, sub: t.update_master_pin, icon: Lock, color: 'primary' },
            { label: t.biometrics, sub: 'Face ID / Touch ID', icon: Fingerprint, color: 'tertiary', hasSwitch: true },
            { label: t.auto_lock, sub: t.lock_after_5_min, icon: Timer, color: 'on-surface' },
          ].map((item, i) => (
            <div key={i} className="bg-surface-container rounded-xl flex items-center justify-between p-4 cursor-pointer hover:bg-surface-container-high transition-colors">
              <div className="flex items-center gap-4">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-surface-variant text-${item.color}`}>
                  <item.icon size={24} />
                </div>
                <div>
                  <p className="text-lg font-medium">{item.label}</p>
                  <p className="text-sm text-on-surface-variant">{item.sub}</p>
                </div>
              </div>
              {item.hasSwitch ? (
                <div className="w-14 h-7 bg-primary rounded-full relative">
                  <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full" />
                </div>
              ) : (
                <ChevronRight size={20} className="text-outline" />
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="pt-4 flex flex-col items-center gap-4">
        <button className="px-8 py-4 rounded-full glass-panel text-error flex items-center gap-2 hover:bg-surface-variant/60 transition-all shadow-lg">
          <LogOut size={20} />
          <span className="font-bold">{t.logout}</span>
        </button>
        <p className="text-[10px] text-on-surface-variant/40 font-bold tracking-widest uppercase">v1.4.0</p>
      </div>
    </main>
  </div>
);

const Calculator = ({ setView, t }: { setView: (v: View) => void, t: any }) => (
  <div className="flex flex-col items-center justify-end min-h-screen pb-12 bg-surface relative">
    <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50">
      <button onClick={() => setView('dashboard')} className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-on-surface">
        <ArrowLeft size={20} />
      </button>
      <div className="text-on-surface-variant/40 text-[10px] font-bold tracking-widest uppercase">TR-X9 v1.3.0</div>
    </header>

    <div className="w-full max-w-md px-8 mb-8 flex flex-col items-end justify-end flex-grow">
      <div className="text-on-surface text-[5rem] leading-none font-bold tracking-tighter tabular-nums truncate w-full text-right">
        1337
      </div>
    </div>

    <div className="w-full max-w-md px-6 grid grid-cols-4 gap-4">
      {['AC', '+/-', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '−', '1', '2', '3', '+'].map((btn, i) => (
        <button 
          key={btn} 
          className={`h-20 rounded-full flex items-center justify-center text-2xl font-bold transition-transform active:scale-95 ${i < 4 || i % 4 === 3 ? 'bg-primary/15 text-primary border border-primary/20' : 'bg-surface-variant/40 text-on-surface border border-outline-variant/15'}`}
        >
          {btn}
        </button>
      ))}
      <button className="col-span-2 h-20 rounded-[2.5rem] bg-surface-variant/40 border border-outline-variant/15 flex items-center justify-start pl-8 text-2xl font-bold active:scale-95 transition-transform">0</button>
      <button className="h-20 rounded-full bg-surface-variant/40 border border-outline-variant/15 flex items-center justify-center text-2xl font-bold active:scale-95 transition-transform">.</button>
      <button className="h-20 rounded-full liquid-gradient flex items-center justify-center text-3xl font-bold active:scale-95 transition-transform shadow-lg">=</button>
    </div>
  </div>
);

const Inventory = ({ setView, products, setProducts, t }: { setView: (v: View) => void, products: Product[], setProducts: React.Dispatch<React.SetStateAction<Product[]>>, t: any }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newUnits, setNewUnits] = useState(0);
  const [newImage, setNewImage] = useState<string | null>(null);

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    if (!newName || !newLocation) return;
    
    const newProduct: Product = {
      id: Date.now().toString(),
      name: newName,
      location: newLocation,
      units: newUnits,
      status: newUnits < 10 ? 'WENIG' : 'OPTIMAL',
      image: newImage || 'https://picsum.photos/seed/placeholder/200'
    };

    setProducts(prev => [newProduct, ...prev]);
    setIsAdding(false);
    setNewName('');
    setNewLocation('');
    setNewUnits(0);
    setNewImage(null);
  };

  return (
    <div className="flex flex-col min-h-screen pb-32">
      <header className="flex items-center justify-between p-6 pb-4 sticky top-0 bg-surface/80 backdrop-blur-xl z-50">
        <div className="size-10 rounded-full bg-surface-container-highest border border-outline-variant/15 overflow-hidden">
          <img src="https://picsum.photos/seed/user/100" alt="Benutzer" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-xl font-bold flex-1 ml-4">{t.inventory}</h1>
        <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center">
          <Search size={20} />
        </button>
      </header>

      <main className="px-6 flex flex-col gap-8">
        <section className="flex flex-wrap gap-4">
          <div className="glass-card flex-1 min-w-[160px] p-6 flex flex-col gap-2 rounded-2xl">
            <p className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-widest">{t.overview}</p>
            <p className="text-[2rem] font-bold text-tertiary leading-tight">
              {products.reduce((acc, p) => acc + p.units, 0).toFixed(2)} <span className="text-lg text-on-surface-variant font-medium">g</span>
            </p>
            <div className="mt-2 flex items-center gap-1 text-sm text-primary">
              <TrendingUp size={14} />
              <span className="font-bold">{t.vs_last_week}</span>
            </div>
          </div>
          <div className="glass-card flex-1 min-w-[160px] p-6 flex flex-col gap-2 rounded-2xl">
            <p className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-widest">{t.revenue_forecast}</p>
            <p className="text-[2rem] font-bold text-tertiary leading-tight">€ 45K</p>
            <div className="mt-2 flex items-center gap-1 text-sm text-primary">
              <TrendingUp size={14} />
              <span className="font-bold">{t.stable}</span>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium">{t.products}</h2>
            <button className="text-[10px] font-extrabold text-primary uppercase tracking-widest flex items-center gap-1">
              {t.filter} <Search size={14} />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {products.map((prod) => (
              <div 
                key={prod.id} 
                onClick={() => setSelectedProduct(prod)}
                className="glass-card p-4 flex gap-4 items-center rounded-2xl cursor-pointer hover:bg-white/5 transition-colors active:scale-[0.98]"
              >
                <div className="bg-surface-container-highest rounded-3xl p-3 shrink-0 relative overflow-hidden group flex items-center justify-center w-24 h-24">
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="w-full h-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-110" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-bold">{prod.name}</h3>
                  <p className="text-sm text-on-surface-variant mt-1">{t.location}: {prod.location}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-[10px] font-bold">{prod.units.toFixed(2)} g</span>
                  </div>
                </div>
                <div className="shrink-0 flex flex-col items-end gap-2">
                  <div className={`w-3 h-3 rounded-full ${prod.status === 'WENIG' ? 'bg-error' : 'bg-primary'} shadow-lg`} />
                  <span className={`text-[10px] font-bold tracking-wider uppercase ${prod.status === 'WENIG' ? 'text-error' : 'text-primary'}`}>{prod.status === 'WENIG' ? t.low_stock : t.optimal}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <button 
          onClick={() => setIsAdding(true)}
          className="liquid-gradient w-full py-4 font-bold text-lg mt-4 flex items-center justify-center gap-2 rounded-full shadow-lg"
        >
          <Plus size={24} /> {t.add_product}
        </button>
      </main>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-background/80 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-md glass-panel rounded-[2.5rem] p-8 flex flex-col gap-8 relative overflow-hidden"
            >
              <div className="absolute -top-32 -left-32 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" />
              <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-tertiary/10 rounded-full blur-[100px]" />

              <div className="flex items-center justify-between relative z-10">
                <h2 className="text-2xl font-bold tracking-tight">{t.product_details}</h2>
                <button onClick={() => setSelectedProduct(null)} className="size-12 rounded-full glass-panel flex items-center justify-center hover:bg-surface-container transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col items-center gap-6 relative z-10">
                <div className="size-48 rounded-[2rem] bg-surface-container-highest border border-outline-variant/15 overflow-hidden shadow-2xl group">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-bold tracking-tight mb-2">{selectedProduct.name}</h3>
                  <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase ${selectedProduct.status === 'WENIG' ? 'bg-error/20 text-error' : 'bg-primary/20 text-primary'}`}>
                    <div className={`w-2 h-2 rounded-full ${selectedProduct.status === 'WENIG' ? 'bg-error' : 'bg-primary'} animate-pulse`} />
                    {selectedProduct.status === 'WENIG' ? t.low_stock : t.optimal}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="glass-panel p-5 rounded-3xl flex flex-col gap-3">
                  <div className="size-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-widest">{t.location}</p>
                    <p className="text-lg font-bold">{selectedProduct.location}</p>
                  </div>
                </div>
                <div className="glass-panel p-5 rounded-3xl flex flex-col gap-3">
                  <div className="size-10 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Layers size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-widest">{t.inventory}</p>
                    <p className="text-lg font-bold">{selectedProduct.units.toFixed(2)} <span className="text-xs font-medium opacity-60">g</span></p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 relative z-10">
                <button className="w-full py-4 liquid-gradient rounded-full font-bold text-lg shadow-xl active:scale-95 transition-transform">
                  {t.adjust_stock}
                </button>
                <button className="w-full py-4 glass-panel rounded-full font-bold text-sm hover:bg-surface-variant/60 transition-all active:scale-95">
                  {t.view_history}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isAdding && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-xl flex items-end sm:items-center justify-center p-4"
          >
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="w-full max-w-lg glass-panel rounded-3xl p-8 flex flex-col gap-6 relative overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
              
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">{t.new_product}</h2>
                <button onClick={() => setIsAdding(false)} className="size-10 rounded-full glass-panel flex items-center justify-center">
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-widest ml-2">{t.product_name}</label>
                  <input 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full h-14 bg-surface-container-low rounded-xl border border-outline-variant/15 px-4 outline-none focus:border-primary/50 transition-colors"
                    placeholder="z.B. Liquid Sound G2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-widest ml-2">{t.location}</label>
                    <input 
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full h-14 bg-surface-container-low rounded-xl border border-outline-variant/15 px-4 outline-none focus:border-primary/50 transition-colors"
                      placeholder="z.B. Regal B3"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-widest ml-2">{t.units}</label>
                    <input 
                      type="number"
                      value={newUnits}
                      onChange={(e) => setNewUnits(parseInt(e.target.value) || 0)}
                      className="w-full h-14 bg-surface-container-low rounded-xl border border-outline-variant/15 px-4 outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-widest ml-2">{t.product_image}</label>
                  <div className="flex gap-4 items-center">
                    <div className="size-24 rounded-2xl bg-surface-container-highest border border-outline-variant/15 overflow-hidden flex items-center justify-center shrink-0 group">
                      {newImage ? (
                        <img src={newImage} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      ) : (
                        <Package size={32} className="text-on-surface-variant/30" />
                      )}
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <label className="cursor-pointer liquid-gradient rounded-xl h-12 flex items-center justify-center gap-2 font-bold text-sm shadow-lg active:scale-95 transition-transform">
                        <Camera size={18} /> {t.use_camera}
                        <input 
                          type="file" 
                          accept="image/*" 
                          capture="environment" 
                          className="hidden" 
                          onChange={handleCapture}
                        />
                      </label>
                      <label className="cursor-pointer glass-panel rounded-xl h-12 flex items-center justify-center gap-2 font-bold text-sm hover:bg-surface-variant/60 transition-all active:scale-95">
                        <Upload size={18} /> {t.upload_file}
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleCapture}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleAddProduct}
                disabled={!newName || !newLocation}
                className="w-full py-4 liquid-gradient rounded-full font-bold text-lg shadow-xl disabled:opacity-50 disabled:grayscale transition-all"
              >
                {t.save_product}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Sales = ({ setView, setPaymentAmount, products, t }: { setView: (v: View) => void, setPaymentAmount: (a: number) => void, products: Product[], t: any }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isWeightSelectorOpen, setIsWeightSelectorOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [weight, setWeight] = useState(0);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const addToCart = (product: Product, qty: number) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + qty } : item));
    } else {
      setCart([...cart, { 
        id: product.id, 
        name: product.name, 
        price: 10, // Mock price per gram
        quantity: qty, 
        icon: 'package' 
      }]);
    }
    setIsWeightSelectorOpen(false);
    setWeight(0);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: parseFloat(newQty.toFixed(2)) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  return (
    <div className="flex flex-col min-h-screen pb-32">
      <header className="flex items-center justify-between p-6 pb-2 sticky top-0 bg-background/80 backdrop-blur-xl z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => setView('dashboard')} className="size-10 rounded-full glass-panel flex items-center justify-center">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-[2rem] font-bold tracking-tight">{t.sales}</h1>
        </div>
        <div className="size-10 rounded-full glass-panel flex items-center justify-center">
          <Users size={20} className="text-on-surface-variant" />
        </div>
      </header>

      <main className="flex-1 flex flex-col w-full max-w-lg mx-auto">
        <section className="px-6 py-4 flex flex-col gap-6">
          <div className="relative w-full h-14 bg-surface-container-low rounded-lg border border-outline-variant/15 flex items-center px-4">
            <Search size={20} className="text-on-surface-variant" />
            <input className="w-full h-full bg-transparent border-none text-on-surface placeholder:text-on-surface-variant focus:ring-0 text-base ml-3 outline-none" placeholder="Produkt suchen..." />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {products.slice(0, 4).map(prod => (
              <button 
                key={prod.id} 
                onClick={() => {
                  setSelectedProduct(prod);
                  setIsWeightSelectorOpen(true);
                }}
                className="glass-panel p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-primary/10 transition-colors"
              >
                <div className="size-12 rounded-lg overflow-hidden">
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-bold">{prod.name}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="flex-1 px-6 flex flex-col gap-4 overflow-y-auto mb-6">
          <h2 className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-widest ml-1">{t.cart}</h2>
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-on-surface-variant/40">
              <ShoppingCart size={48} strokeWidth={1} />
              <p className="text-sm mt-2">{t.cart_empty}</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-surface-container p-4 rounded-lg border border-outline-variant/15 shadow-xl relative overflow-hidden group">
                <div className="size-14 rounded-md bg-surface-container-highest flex items-center justify-center shrink-0">
                  <Package size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium leading-tight">{item.name}</h3>
                  <p className="text-on-surface-variant text-sm mt-1">{item.quantity.toFixed(2)}g x {item.price.toFixed(2)}€</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{(item.price * item.quantity).toFixed(2)}€</p>
                  <div className="flex items-center gap-2 mt-1 bg-surface-container-high rounded-full px-2 py-0.5 border border-outline-variant/20">
                    <button onClick={() => updateQuantity(item.id, -0.1)} className="text-on-surface-variant"><Minus size={14} /></button>
                    <span className="text-[10px] font-bold w-8 text-center">{item.quantity.toFixed(2)}g</span>
                    <button onClick={() => updateQuantity(item.id, 0.1)} className="text-on-surface-variant"><Plus size={14} /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>

        <section className="bg-surface-bright rounded-t-[2rem] p-6 border border-outline-variant/15 shadow-2xl flex flex-col gap-6 relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-tertiary/10 blur-[40px] rounded-full pointer-events-none" />
          <div className="flex items-end justify-between">
            <span className="text-on-surface-variant text-lg font-medium mb-1">{t.total} ({cart.length} Artikel)</span>
            <span className="text-[3.5rem] font-bold tracking-tighter leading-none">{total.toFixed(2)}€</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <button 
              onClick={() => {
                setPaymentAmount(total);
                setView('payment');
              }}
              disabled={cart.length === 0}
              className="col-span-3 flex items-center justify-center gap-3 h-16 rounded-2xl liquid-gradient font-bold text-lg shadow-xl active:scale-95 transition-transform disabled:opacity-50 disabled:grayscale"
            >
              <Euro size={24} /> {t.checkout}
            </button>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {isWeightSelectorOpen && selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-background/90 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-sm glass-panel rounded-[2.5rem] p-8 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{selectedProduct.name}</h3>
                <button onClick={() => setIsWeightSelectorOpen(false)} className="size-10 rounded-full glass-panel flex items-center justify-center">
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="text-[4rem] font-bold tracking-tighter leading-none primary-gradient-text">
                  {weight.toFixed(2)}<span className="text-2xl ml-1">g</span>
                </div>
                <p className="text-xs text-on-surface-variant font-medium uppercase tracking-widest">{t.select_weight}</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[0.2, 0.5, 1.0, 2.0, 5.0, 10.0].map(val => (
                  <button 
                    key={val} 
                    onClick={() => setWeight(val)}
                    className={`h-12 rounded-xl glass-panel font-bold text-sm transition-all ${weight === val ? 'bg-primary/30 border-primary/50' : 'hover:bg-primary/20'}`}
                  >
                    {val.toFixed(1)}g
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between gap-4">
                <button 
                  onClick={() => setWeight(prev => Math.max(0, prev - 0.01))}
                  className="size-14 rounded-2xl glass-panel flex items-center justify-center text-primary"
                >
                  <Minus size={24} />
                </button>
                <div className="flex-1 text-center font-mono text-lg font-bold bg-surface-container-low py-3 rounded-2xl border border-outline-variant/15">
                  + 0.01g
                </div>
                <button 
                  onClick={() => setWeight(prev => prev + 0.01)}
                  className="size-14 rounded-2xl glass-panel flex items-center justify-center text-primary"
                >
                  <Plus size={24} />
                </button>
              </div>

              <button 
                onClick={() => addToCart(selectedProduct, weight)}
                disabled={weight <= 0}
                className="w-full py-5 liquid-gradient rounded-full font-bold text-lg shadow-xl disabled:opacity-50 transition-all"
              >
                {t.add_to_cart}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Customers = ({ setView, t }: { setView: (v: View) => void, t: any }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState<Customer[]>(CUSTOMERS);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCustomer = () => {
    if (!newName) return;
    const newCustomer: Customer = {
      id: Date.now().toString(),
      name: newName,
      email: newEmail,
      phone: newPhone,
      lastOrder: 'Gerade eben',
      totalSpent: '0,00 €',
      avatar: `https://picsum.photos/seed/${Date.now()}/200`
    };
    setCustomers([newCustomer, ...customers]);
    setIsAdding(false);
    setNewName('');
    setNewEmail('');
    setNewPhone('');
  };

  return (
    <div className="flex flex-col min-h-screen pb-32">
      <header className="flex items-center justify-between p-6 pb-4 sticky top-0 bg-surface/80 backdrop-blur-xl z-50">
        <div className="size-10 rounded-full bg-surface-container-highest border border-outline-variant/15 overflow-hidden">
          <img src="https://picsum.photos/seed/user/100" alt="Benutzer" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-xl font-bold flex-1 ml-4">{t.customers}</h1>
        <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center">
          <Bell size={20} />
        </button>
      </header>

      <main className="px-6 flex flex-col gap-8">
        <section className="flex flex-col gap-4">
          <div className="relative w-full h-14 bg-surface-container-low rounded-xl border border-outline-variant/15 flex items-center px-4">
            <Search size={20} className="text-on-surface-variant" />
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-full bg-transparent border-none text-on-surface placeholder:text-on-surface-variant focus:ring-0 text-base ml-3 outline-none" 
              placeholder={t.search_customers}
            />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-medium">{t.customer_list}</h2>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{filteredCustomers.length} {t.customers}</span>
          </div>
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="glass-card p-4 flex gap-4 items-center rounded-2xl hover:bg-surface-container-high transition-colors cursor-pointer">
              <div className="size-14 rounded-full overflow-hidden border border-outline-variant/15 shrink-0">
                <img src={customer.avatar} alt={customer.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold truncate">{customer.name}</h3>
                <p className="text-xs text-on-surface-variant truncate">{customer.email}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{t.last_order}: {customer.lastOrder}</span>
                  <span className="text-[10px] font-bold text-tertiary uppercase tracking-wider">{customer.total_spent}: {customer.totalSpent}</span>
                </div>
              </div>
              <ChevronRight size={20} className="text-outline shrink-0" />
            </div>
          ))}
        </section>

        <button 
          onClick={() => setIsAdding(true)}
          className="liquid-gradient w-full py-4 font-bold text-lg mt-4 flex items-center justify-center gap-2 rounded-full shadow-lg"
        >
          <Plus size={24} /> Neuer Kunde
        </button>
      </main>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-xl flex items-end sm:items-center justify-center p-4"
          >
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="w-full max-w-lg glass-panel rounded-3xl p-8 flex flex-col gap-6 relative overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
              
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Neuer Kunde</h2>
                <button onClick={() => setIsAdding(false)} className="size-10 rounded-full glass-panel flex items-center justify-center">
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-widest ml-2">Name</label>
                  <input 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full h-14 bg-surface-container-low rounded-xl border border-outline-variant/15 px-4 outline-none focus:border-primary/50 transition-colors"
                    placeholder="Vollständiger Name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-widest ml-2">E-Mail</label>
                  <input 
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full h-14 bg-surface-container-low rounded-xl border border-outline-variant/15 px-4 outline-none focus:border-primary/50 transition-colors"
                    placeholder="email@beispiel.de"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-widest ml-2">Telefon</label>
                  <input 
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full h-14 bg-surface-container-low rounded-xl border border-outline-variant/15 px-4 outline-none focus:border-primary/50 transition-colors"
                    placeholder="+49 ..."
                  />
                </div>
              </div>

              <button 
                onClick={handleAddCustomer}
                disabled={!newName}
                className="w-full py-4 liquid-gradient rounded-full font-bold text-lg shadow-xl disabled:opacity-50 disabled:grayscale transition-all"
              >
                Kunde anlegen
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<View>('dashboard');
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [lang, setLang] = useState<Language>('de');
  const [toast, setToast] = useState<string | null>(null);

  const t = translations[lang];

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {view === 'dashboard' && <Dashboard setView={setView} t={t} />}
          {view === 'claims' && <ClaimsList setView={setView} t={t} showToast={showToast} />}
          {view === 'customers' && <Customers setView={setView} t={t} />}
          {view === 'details' && <DebtDetails setView={setView} t={t} showToast={showToast} />}
          {view === 'payment' && <PaymentProcess setView={setView} amount={paymentAmount} t={t} />}
          {view === 'inventory' && <Inventory setView={setView} products={products} setProducts={setProducts} t={t} />}
          {view === 'sales' && <Sales setView={setView} setPaymentAmount={setPaymentAmount} products={products} t={t} />}
          {view === 'settings' && <Settings setView={setView} lang={lang} setLang={setLang} t={t} />}
          {view === 'calculator' && <Calculator setView={setView} t={t} />}
        </motion.div>
      </AnimatePresence>

      {['dashboard', 'claims', 'customers', 'inventory', 'settings'].includes(view) && (
        <BottomNav currentView={view} setView={setView} t={t} />
      )}

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-full glass-panel border-primary/30 text-primary font-bold shadow-2xl flex items-center gap-2"
          >
            <CheckCircle2 size={20} />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
