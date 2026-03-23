# Technical Requirements Document (TRD) - Liquid Glass Finanzen

**Version:** 1.3.0  
**Status:** Final  
**Datum:** 23. März 2026

## 1. Projektübersicht
Liquid Glass Finanzen ist eine progressive Web-App (PWA) für das Finanzmanagement und Point-of-Sale (POS) System. Das Ziel ist es, eine hochperformante, visuell ansprechende und mobil-optimierte Lösung für Kleinunternehmer bereitzustellen.

## 2. Systemarchitektur
Die Anwendung folgt einer modernen Single-Page-Application (SPA) Architektur.

- **Frontend-Framework:** React 18 (Functional Components, Hooks).
- **State Management:** React `useState` und `useMemo` für lokale Datenhaltung.
- **Routing:** Internes View-Management-System (State-basiert) für nahtlose Übergänge ohne Page-Reloads.
- **Styling:** Utility-First CSS via Tailwind CSS 4.0.
- **Animation Engine:** Framer Motion für Hardware-beschleunigte UI-Animationen.

## 3. Funktionale Anforderungen

### 3.1 Dashboard & KPIs
- Anzeige von mindestens 3 Kern-KPIs (Umsatz, Anfahrt, Offene Posten).
- Visualisierung von Trends (Prozentualer Anstieg/Abfall).
- Liste der letzten 5 Aktivitäten mit Icon-Codierung.

### 3.2 Forderungsmanagement
- CRUD-Operationen für Forderungen (derzeit im Mock-State).
- Status-Kategorisierung: `Kritisch`, `Fällig`, `Normal`.
- Detailansicht pro Forderung mit Historie.

### 3.3 Kundenverwaltung
- Suchfunktion (Echtzeit-Filterung nach Name/E-Mail).
- Formular zur Erfassung neuer Kunden (Name, E-Mail, Telefon).
- Anzeige von Kunden-Metriken (Gesamtumsatz, letzte Bestellung).

### 3.4 Point of Sale (POS) & Inventar
- Kategorisierung von Produkten.
- **Präzisions-Warenkorb:** Unterstützung für Gewichts-basierte Mengen (Gramm) mit 0,01g Genauigkeit.
- **Gewichts-Presets:** Schnellwahl-Buttons für 0,2g, 0,5g und 1,0g.
- **Produkt-Visualisierung:** Responsive Bilder mit Hover-Zoom-Effekt (Scale 1.05).
- **Detailansicht:** Erweiterte Produktinfos (Lagerort, Status, Einheiten) via Modal.
- Kamera-Integration für Produktbilder (`input capture="environment"`).
- Simulation von NFC/Kontaktlos-Zahlungen mit haptischem/visuellem Feedback.

### 3.5 Hilfswerkzeuge
- Integrierter Taschenrechner mit Unterstützung für Grundrechenarten.
- Suchfunktion über alle Module hinweg (Vorbereitet).

## 4. Nicht-funktionale Anforderungen

### 4.1 Performance
- **Ladezeit:** Initialer Load < 2s auf 4G-Netzwerken.
- **Interaktions-Latenz:** UI-Reaktionen < 100ms.
- **Animationen:** Konstante 60 FPS für alle Übergänge.

### 4.2 Design & UX (Liquid Glass)
- **Backdrop Blur:** Mindestens 12px-16px für Glass-Effekte.
- **Hover-Effekte:** Sanfte Skalierung (1.05) und Zoom für Bilder.
- **Kontrast:** Einhaltung der WCAG AA Richtlinien für Text auf Glas-Hintergründen.
- **Responsivität:** Volle Funktionalität auf Displays ab 320px Breite.

### 4.3 Kompatibilität
- Unterstützung moderner Evergreen-Browser (Chrome, Safari, Firefox, Edge).
- Optimierung für iOS Safari und Android Chrome (PWA-Fähigkeit).

## 5. Technische Spezifikationen

### 5.1 Entwicklungsumgebung
- **Build-Tool:** Vite 6.x
- **Sprache:** TypeScript 5.x (Strict Mode)
- **Linting:** ESLint mit React-Recommended Regeln.

### 5.2 Datenstrukturen (Auszug)
```typescript
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastOrder: string;
  totalSpent: number;
  avatar: string;
}

interface Product {
  id: string;
  name: string;
  location: string;
  units: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  image?: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number; // Unterstützt Dezimalwerte für Gewicht
  icon: LucideIcon;
}
```

## 6. Sicherheit & Datenschutz
- **Lokale Verschlüsselung:** Vorbereitung für die Speicherung sensibler Daten im `localStorage` mit Verschlüsselung.
- **Privacy-Layer:** Globaler State zum Maskieren von Beträgen und Bildern.
- **PIN-Schutz:** Implementierung eines 4-stelligen PIN-Zugangs für kritische Bereiche.

## 7. Roadmap & Zukünftige Erweiterungen
- **Backend-Anbindung:** Integration von Firebase oder Supabase für Cloud-Sync.
- **Offline-Modus:** Service Worker Implementierung für volle Offline-Funktionalität.
- **Export-Funktion:** PDF-Generierung für Rechnungen und Berichte.
- **Multi-User:** Rollenbasiertes Zugriffssystem (Admin, Mitarbeiter).
