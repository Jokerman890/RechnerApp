import { useState } from 'react';
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
  Watch
} from 'lucide-react';
import { View, KPI, Activity, Claim, Product, CartItem } from './types';

// --- Mock Data ---
const KPIs: KPI[] = [
  { label: 'Umsatz Heute', value: '450,20€', trend: '+5.2% ggü. gestern', icon: 'euro', color: 'primary' },
  { label: 'Anfahrt', value: '145,00€', trend: '+2.1% ggü. gestern', icon: 'car', color: 'tertiary' },
  { label: 'Offene Posten', value: '2.840,00€', trend: '3 Rechnungen überfällig', icon: 'receipt', color: 'error' },
];

const ACTIVITIES: Activity[] = [
  { id: '1', title: 'Rechnung #RE-2023-089 bezahlt', subtitle: 'Kunde: Muster GmbH', amount: '+ 1.250,00€', time: 'Vor 2 Std.', icon: 'check', color: 'tertiary' },
  { id: '2', title: 'Neue Buchung erstellt', subtitle: 'Kunde: Max Mustermann', amount: '450,20€', time: 'Vor 5 Std.', icon: 'plus', color: 'primary' },
];

const CLAIMS: Claim[] = [
  { id: '1', name: 'Lukas Müller', status: 'Kritisch', statusDetail: 'Überfällig', amount: '4.200,00€', overdueDays: 42 },
  { id: '2', name: 'Sarah Schmidt', status: 'Fällig', statusDetail: 'in 3 Tagen', amount: '1.250,00€' },
  { id: '3', name: 'Felix Wagner', status: 'Normal', statusDetail: 'Fällig am 24.11.', amount: '850,00€' },
  { id: '4', name: 'Anna Weber', status: 'Ratenzahlung', statusDetail: '(3/6)', amount: '450,00€' },
];

const PRODUCTS: Product[] = [
  { id: '1', name: 'Aura Watch S2', location: 'Regal A1', units: 12, status: 'WENIG', image: 'https://picsum.photos/seed/watch/200' },
  { id: '2', name: 'Liquid Sound G1', location: 'Zone C', units: 85, status: 'OPTIMAL', image: 'https://picsum.photos/seed/speaker/200' },
  { id: '3', name: 'Prism Display Pro', location: 'Regal B2', units: 42, status: 'OPTIMAL', image: 'https://picsum.photos/seed/display/200' },
];

// --- Components ---

const BottomNav = ({ currentView, setView }: { currentView: View, setView: (v: View) => void }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'claims', label: 'Forderungen', icon: ReceiptText },
    { id: 'inventory', label: 'Bestand', icon: Package },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
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

const Dashboard = ({ setView }: { setView: (v: View) => void }) => (
  <div className="flex flex-col gap-8 pb-24">
    <header className="flex items-center justify-between px-6 py-4 glass-panel rounded-b-xl sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <div className="size-10 rounded-full bg-surface-container-highest border border-outline-variant/15 overflow-hidden">
          <img src="https://picsum.photos/seed/user/100" alt="User" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="font-bold text-xl leading-none">Rechner</h1>
          <p className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-widest mt-1">Dashboard</p>
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
          <h2 className="font-bold text-3xl tracking-tight mb-2">Willkommen zurück, <span className="primary-gradient-text">Alex</span></h2>
          <p className="text-on-surface-variant">Hier ist dein aktueller Überblick für heute.</p>
          <button 
            onClick={() => setView('sales')}
            className="mt-6 w-full md:w-auto liquid-gradient rounded-full px-6 py-3 flex items-center justify-center gap-2 font-bold text-sm hover:scale-[1.02] transition-transform"
          >
            <Plus size={18} /> Neue Buchung
          </button>
        </div>
      </section>

      <section>
        <h3 className="font-medium text-xl mb-6 px-2">Key Performance Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {KPIs.map((kpi) => (
            <div key={kpi.label} className="glass-card rounded-xl p-6 flex flex-col gap-3 group relative overflow-hidden cursor-pointer">
              <div className={`absolute inset-0 bg-gradient-to-br from-${kpi.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="flex items-center justify-between">
                <p className="text-on-surface-variant text-sm font-medium">{kpi.label}</p>
                <div className={`size-8 rounded-full bg-${kpi.color}/10 flex items-center justify-center text-${kpi.color}`}>
                  {kpi.icon === 'euro' && <Euro size={16} />}
                  {kpi.icon === 'car' && <Car size={16} />}
                  {kpi.icon === 'receipt' && <Receipt size={16} />}
                </div>
              </div>
              <p className="font-bold text-3xl tracking-tight mt-2">{kpi.value}</p>
              <div className={`flex items-center gap-1 mt-1 text-${kpi.color === 'error' ? 'error' : 'tertiary'}`}>
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
            { label: 'Neue Buchung', icon: PlusSquare, color: 'primary', view: 'sales' },
            { label: 'Export PDF', icon: FileText, color: 'secondary', view: 'dashboard' },
            { label: 'Neuer Kunde', icon: Users, color: 'tertiary', view: 'dashboard' },
            { label: 'Taschenrechner', icon: CalculatorIcon, color: 'on-surface-variant', view: 'calculator' },
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
          <h3 className="font-medium text-xl">Letzte Aktivitäten</h3>
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

const ClaimsList = ({ setView }: { setView: (v: View) => void }) => (
  <div className="flex flex-col gap-8 pb-32">
    <header className="sticky top-0 z-50 glass-panel border-b px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant/15 overflow-hidden">
          <img src="https://picsum.photos/seed/user/100" alt="User" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">Schulden-Management</h1>
      </div>
      <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center">
        <Bell size={20} />
      </button>
    </header>

    <main className="px-6 flex flex-col gap-10">
      <section className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/15 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="text-center md:text-left">
            <p className="text-on-surface-variant text-sm font-medium uppercase tracking-widest mb-2">Gesamtübersicht</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">12.450,00€</h2>
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <div className="flex justify-between items-end">
              <span className="font-medium text-lg">Rückzahlungsquote</span>
              <span className="text-tertiary font-bold text-xl">65%</span>
            </div>
            <div className="h-4 bg-surface-container-highest rounded-full overflow-hidden border border-outline-variant/15 relative">
              <div className="absolute top-0 left-0 h-full liquid-gradient rounded-full w-[65%]" />
            </div>
            <div className="flex justify-between text-sm text-on-surface-variant">
              <span>8.092,50€ erhalten</span>
              <span>4.357,50€ offen</span>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-outline-variant/15 pb-4">
          <h3 className="text-2xl font-bold">Offene Forderungen</h3>
          <button className="px-4 py-2 rounded-full glass-panel text-sm font-medium flex items-center gap-2">
            <Search size={16} /> Filter
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {CLAIMS.map((claim) => (
            <div 
              key={claim.id} 
              onClick={() => setView('details')}
              className="bg-surface-container rounded-lg p-5 border border-outline-variant/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden group cursor-pointer hover:bg-surface-container-high transition-colors"
            >
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${claim.status === 'Kritisch' ? 'bg-error' : claim.status === 'Fällig' ? 'bg-tertiary' : 'bg-outline-variant'}`} />
              <div className="flex items-center gap-4 pl-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${claim.status === 'Kritisch' ? 'bg-error/10 text-error' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                  {claim.status === 'Kritisch' ? <Receipt size={24} /> : <Users size={24} />}
                </div>
                <div>
                  <h4 className="text-lg font-bold">{claim.name}</h4>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <span className={`font-medium px-2 py-0.5 rounded-sm ${claim.status === 'Kritisch' ? 'bg-error/20 text-error' : claim.status === 'Fällig' ? 'bg-tertiary/20 text-tertiary' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                      {claim.status} {claim.statusDetail}
                    </span>
                    {claim.overdueDays && <span className="text-on-surface-variant text-xs">• seit {claim.overdueDays} Tagen</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <div className="text-right">
                  <p className="text-xl font-bold">{claim.amount}</p>
                  <p className="text-xs text-on-surface-variant uppercase tracking-wider mt-1">Offen</p>
                </div>
                {claim.status === 'Kritisch' ? (
                  <button className="liquid-gradient px-6 py-2.5 rounded-full font-bold text-sm shadow-lg">Erinnern</button>
                ) : (
                  <button className="glass-panel px-6 py-2.5 rounded-full font-bold text-sm">Details</button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="pt-4 flex justify-center">
          <button className="bg-surface-container-lowest border border-outline-variant/15 text-primary px-8 py-3 rounded-full font-bold text-sm hover:bg-surface-container-highest transition-colors flex items-center gap-2">
            <Plus size={20} /> Neue Forderung anlegen
          </button>
        </div>
      </section>
    </main>
  </div>
);

const DebtDetails = ({ setView }: { setView: (v: View) => void }) => (
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
        <span className="px-4 py-1.5 rounded-full bg-error/20 text-error text-xs font-extrabold uppercase tracking-wider mb-8">Kritisch</span>
        
        <p className="text-[3.5rem] font-bold tracking-tighter leading-none mb-8">
          4.200,00 <span className="text-on-surface-variant text-[2rem]">€</span>
        </p>

        <div className="w-full max-w-sm glass-panel p-4 rounded-xl">
          <div className="flex justify-between items-end mb-3">
            <span className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-wider">Gezahlt</span>
            <div className="text-right">
              <span className="text-lg font-bold block leading-tight">654,50 €</span>
              <span className="text-xs text-outline block">von 4.854,50 €</span>
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
        <h2 className="text-xl font-medium px-2">Zahlungsverlauf</h2>
        <div className="relative flex flex-col gap-4 pl-4 before:content-[''] before:absolute before:left-8 before:top-4 before:bottom-4 before:w-[1px] before:bg-outline-variant/30">
          {[
            { title: 'Fahrtkosten gebucht', amount: '+ 45,50 €', date: '12. Okt 2023', icon: Car, color: 'primary', isNegative: false },
            { title: 'Teilzahlung Bar', amount: '- 200,00 €', date: '10. Okt 2023', icon: Euro, color: 'secondary', isNegative: true },
            { title: 'Teilzahlung Karte', amount: '- 500,00 €', date: '01. Okt 2023', icon: Receipt, color: 'secondary', isNegative: true },
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
          <PlusSquare size={24} /> Zahlung hinzufügen
        </button>
        <button className="w-full h-14 rounded-full glass-panel font-medium flex items-center justify-center gap-2 hover:bg-surface-variant/60 transition-all">
          <Bell size={20} /> Erinnerung senden
        </button>
      </div>
    </div>
  </div>
);

const PaymentProcess = ({ setView }: { setView: (v: View) => void }) => (
  <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 blur-[80px] rounded-full" />
      <div className="absolute top-1/2 -right-48 w-[30rem] h-[30rem] bg-tertiary/10 blur-[80px] rounded-full" />
    </div>

    <header className="fixed top-0 w-full flex items-center justify-between px-6 h-16 bg-surface/60 backdrop-blur-xl border-b border-outline-variant/15">
      <button onClick={() => setView('details')} className="text-primary hover:opacity-80 transition-opacity">
        <X size={24} />
      </button>
      <h1 className="text-xl font-medium tracking-tight text-primary">Zahlungsvorgang</h1>
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
          <span className="text-[3.5rem] leading-none font-semibold tracking-tighter">13,40 €</span>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-tertiary rounded-full mt-4 opacity-60" />
        </div>
        <div className="pt-6">
          <p className="text-lg font-medium">Bitte Karte vorhalten...</p>
          <p className="text-xs uppercase tracking-widest text-on-surface-variant mt-2">Bereit für Zahlung</p>
        </div>
      </div>

      <div className="w-full max-w-sm grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl glass-panel flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Smartphone size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-tighter text-on-surface-variant font-semibold">Sensor</span>
            <span className="text-xs font-medium">Aktiv</span>
          </div>
        </div>
        <div className="p-4 rounded-xl glass-panel flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
            <ShieldCheck size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-tighter text-on-surface-variant font-semibold">Sicherheit</span>
            <span className="text-xs font-medium">Verschlüsselt</span>
          </div>
        </div>
      </div>
    </main>

    <div className="fixed bottom-0 left-0 w-full p-8 flex justify-center">
      <button 
        onClick={() => setView('details')}
        className="w-full max-w-md py-4 px-8 rounded-xl glass-panel font-medium tracking-wide hover:bg-surface-container-highest/50 transition-all active:scale-95"
      >
        Abbrechen
      </button>
    </div>
  </div>
);

const Settings = ({ setView }: { setView: (v: View) => void }) => (
  <div className="flex flex-col min-h-screen pb-24">
    <header className="flex items-center justify-between p-6 bg-surface-dim/80 backdrop-blur-md sticky top-0 z-50">
      <button onClick={() => setView('dashboard')} className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-surface-container transition-colors">
        <ArrowLeft size={24} />
      </button>
      <h1 className="text-2xl font-bold tracking-tight">Einstellungen</h1>
      <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant/15">
        <img src="https://picsum.photos/seed/user/100" alt="User" className="w-full h-full object-cover" />
      </div>
    </header>

    <main className="px-6 space-y-8 max-w-2xl mx-auto w-full">
      <section className="mt-4 text-center space-y-2">
        <h2 className="text-4xl font-bold tracking-tight primary-gradient-text">Sicherheit & Profil</h2>
        <p className="text-on-surface-variant font-medium">Verwalten Sie Ihre persönlichen Tresoreinstellungen</p>
      </section>

      <section className="glass-panel p-2 rounded-2xl">
        <h3 className="px-4 pt-4 pb-2 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">Sicherheit</h3>
        <div className="space-y-2">
          {[
            { label: 'PIN ändern', sub: 'Master-PIN aktualisieren', icon: Lock, color: 'primary' },
            { label: 'Biometrie', sub: 'Face ID / Touch ID', icon: Fingerprint, color: 'tertiary', hasSwitch: true },
            { label: 'Auto-Lock', sub: 'Sperren nach 5 Minuten', icon: Timer, color: 'on-surface' },
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

      <section className="glass-panel p-2 rounded-2xl">
        <h3 className="px-4 pt-4 pb-2 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">Privatsphäre & Daten</h3>
        <div className="space-y-2">
          {[
            { label: 'Privacy-Modus', sub: 'Vorschaubilder ausblenden', icon: EyeOff, color: 'primary-fixed', hasSwitch: true, checked: false },
            { label: 'Backup & Sync', sub: 'Letztes Backup: Heute, 08:30', icon: RefreshCw, color: 'secondary-dim' },
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
                <div className="w-14 h-7 bg-surface-variant rounded-full relative">
                  <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full" />
                </div>
              ) : (
                <ChevronRight size={20} className="text-outline" />
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="pt-4 flex justify-center">
        <button className="px-8 py-4 rounded-full glass-panel text-error flex items-center gap-2 hover:bg-surface-variant/60 transition-all shadow-lg">
          <LogOut size={20} />
          <span className="font-bold">Abmelden</span>
        </button>
      </div>
    </main>
  </div>
);

const Calculator = ({ setView }: { setView: (v: View) => void }) => (
  <div className="flex flex-col items-center justify-end min-h-screen pb-12 bg-surface relative">
    <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50">
      <button onClick={() => setView('dashboard')} className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-on-surface">
        <ArrowLeft size={20} />
      </button>
      <div className="text-on-surface-variant/40 text-[10px] font-bold tracking-widest uppercase">TR-X9</div>
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

const Inventory = ({ setView }: { setView: (v: View) => void }) => (
  <div className="flex flex-col min-h-screen pb-32">
    <header className="flex items-center justify-between p-6 pb-4 sticky top-0 bg-surface/80 backdrop-blur-xl z-50">
      <div className="size-10 rounded-full bg-surface-container-highest border border-outline-variant/15 overflow-hidden">
        <img src="https://picsum.photos/seed/user/100" alt="User" className="w-full h-full object-cover" />
      </div>
      <h1 className="text-xl font-bold flex-1 ml-4">Bestand</h1>
      <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center">
        <Search size={20} />
      </button>
    </header>

    <main className="px-6 flex flex-col gap-8">
      <section className="flex flex-wrap gap-4">
        <div className="glass-card flex-1 min-w-[160px] p-6 flex flex-col gap-2 rounded-2xl">
          <p className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-widest">Gesamtübersicht</p>
          <p className="text-[2rem] font-bold text-tertiary leading-tight">1.240 <span className="text-lg text-on-surface-variant font-medium">Units</span></p>
          <div className="mt-2 flex items-center gap-1 text-sm text-primary">
            <TrendingUp size={14} />
            <span className="font-bold">+5% zur Vorwoche</span>
          </div>
        </div>
        <div className="glass-card flex-1 min-w-[160px] p-6 flex flex-col gap-2 rounded-2xl">
          <p className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-widest">Umsatzprognose</p>
          <p className="text-[2rem] font-bold text-tertiary leading-tight">€ 45K</p>
          <div className="mt-2 flex items-center gap-1 text-sm text-primary">
            <TrendingUp size={14} />
            <span className="font-bold">Stabil</span>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium">Produkte</h2>
          <button className="text-[10px] font-extrabold text-primary uppercase tracking-widest flex items-center gap-1">
            Filter <Search size={14} />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {PRODUCTS.map((prod) => (
            <div key={prod.id} className="glass-card p-4 flex gap-4 items-center rounded-2xl">
              <div className="bg-surface-container-highest rounded-3xl p-3 shrink-0 relative overflow-hidden group">
                <img src={prod.image} alt={prod.name} className="size-16 rounded-xl object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="font-bold">{prod.name}</h3>
                <p className="text-sm text-on-surface-variant mt-1">Lagerort: {prod.location}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-[10px] font-bold">{prod.units} Einheiten</span>
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-end gap-2">
                <div className={`w-3 h-3 rounded-full ${prod.status === 'WENIG' ? 'bg-error' : 'bg-primary'} shadow-lg`} />
                <span className={`text-[10px] font-bold tracking-wider uppercase ${prod.status === 'WENIG' ? 'text-error' : 'text-primary'}`}>{prod.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <button className="liquid-gradient w-full py-4 font-bold text-lg mt-4 flex items-center justify-center gap-2 rounded-full shadow-lg">
        <Plus size={24} /> Neues Produkt erfassen
      </button>
    </main>
  </div>
);

const Sales = ({ setView }: { setView: (v: View) => void }) => {
  const [cart, setCart] = useState<CartItem[]>([
    { id: '1', name: 'Mate Eistee 0.5L', price: 2.80, quantity: 2, icon: 'drink' },
    { id: '2', name: 'Bio Chips Paprika', price: 3.50, quantity: 1, icon: 'snack' },
  ]);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen pb-32">
      <header className="flex items-center justify-between p-6 pb-2 sticky top-0 bg-background/80 backdrop-blur-xl z-10">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-full bg-surface-container-low border border-outline-variant/15 flex items-center justify-center overflow-hidden">
            <img src="https://picsum.photos/seed/store/100" alt="Store" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-[2rem] font-bold tracking-tight">Verkauf</h1>
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
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {['Alle', 'Getränke', 'Snacks', 'Zubehör', 'Merch'].map((cat, i) => (
              <button key={cat} className={`flex h-10 shrink-0 items-center justify-center rounded-full px-5 border border-outline-variant/15 ${i === 0 ? 'bg-primary/20 text-primary' : 'bg-surface-container-low text-on-surface-variant'}`}>
                <span className="text-[10px] font-bold tracking-widest uppercase">{cat}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="flex-1 px-6 flex flex-col gap-4 overflow-y-auto mb-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-surface-container p-4 rounded-lg border border-outline-variant/15 shadow-xl relative overflow-hidden group">
              <div className="size-14 rounded-md bg-surface-container-highest flex items-center justify-center shrink-0">
                {item.icon === 'drink' ? <Speaker size={24} /> : <Package size={24} />}
              </div>
              <div className="flex-1">
                <h3 className="font-medium leading-tight">{item.name}</h3>
                <p className="text-on-surface-variant text-sm mt-1">{item.quantity} x {item.price.toFixed(2)}€</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">{(item.price * item.quantity).toFixed(2)}€</p>
                <div className="flex items-center gap-2 mt-1 bg-surface-container-high rounded-full px-2 py-0.5 border border-outline-variant/20">
                  <button className="text-on-surface-variant"><Minus size={14} /></button>
                  <span className="text-xs font-bold w-3 text-center">{item.quantity}</span>
                  <button className="text-on-surface-variant"><Plus size={14} /></button>
                </div>
              </div>
            </div>
          ))}
          <button className="w-full py-4 border border-dashed border-outline-variant/40 rounded-lg text-on-surface-variant flex items-center justify-center gap-2">
            <Nfc size={20} />
            <span className="text-sm font-medium">Artikel scannen oder hinzufügen</span>
          </button>
        </section>

        <section className="bg-surface-bright rounded-t-[2rem] p-6 border border-outline-variant/15 shadow-2xl flex flex-col gap-6 relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-tertiary/10 blur-[40px] rounded-full pointer-events-none" />
          <div className="flex items-end justify-between">
            <span className="text-on-surface-variant text-lg font-medium mb-1">Total ({cart.length} Artikel)</span>
            <span className="text-[3.5rem] font-bold tracking-tighter leading-none">{total.toFixed(2)}€</span>
          </div>
          <div className="flex gap-2">
            {['10€', '20€', '50€'].map(amt => (
              <button key={amt} className="flex-1 h-12 rounded-lg bg-surface-container border border-outline-variant/15 font-bold text-sm">{amt}</button>
            ))}
            <button className="flex-1 h-12 rounded-lg bg-surface-container border border-outline-variant/15 flex items-center justify-center">
              <CalculatorIcon size={20} />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <button className="flex flex-col items-center justify-center gap-2 h-24 rounded-lg glass-panel hover:bg-surface-variant/60 transition-all">
              <Euro size={24} className="text-tertiary" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider">Bar</span>
            </button>
            <button 
              onClick={() => setView('payment')}
              className="col-span-1 flex flex-col items-center justify-center gap-2 h-24 rounded-lg liquid-gradient"
            >
              <Receipt size={24} />
              <span className="text-[10px] font-extrabold uppercase tracking-wider">Karte</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 h-24 rounded-lg glass-panel hover:bg-surface-variant/60 transition-all">
              <FileText size={24} className="text-on-surface-variant" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-on-surface-variant">Offen</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<View>('dashboard');

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
          {view === 'dashboard' && <Dashboard setView={setView} />}
          {view === 'claims' && <ClaimsList setView={setView} />}
          {view === 'details' && <DebtDetails setView={setView} />}
          {view === 'payment' && <PaymentProcess setView={setView} />}
          {view === 'inventory' && <Inventory setView={setView} />}
          {view === 'sales' && <Sales setView={setView} />}
          {view === 'settings' && <Settings setView={setView} />}
          {view === 'calculator' && <Calculator setView={setView} />}
        </motion.div>
      </AnimatePresence>

      {['dashboard', 'claims', 'inventory', 'settings'].includes(view) && (
        <BottomNav currentView={view} setView={setView} />
      )}
    </div>
  );
}
