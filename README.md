# Liquid Glass Finanzen v1.3.0

Liquid Glass Finanzen ist ein hochmodernes Finanzmanagement- und Kassensystem (POS) mit einer eleganten "Dark Glass"-Ästhetik. Die Anwendung wurde entwickelt, um kleinen Unternehmen und Dienstleistern eine intuitive, mobile-first Lösung für die Verwaltung von Verkäufen, Beständen, Kunden und Forderungen zu bieten.

![Liquid Glass Finanzen Logo](https://ais-dev-pv4gl6y4muu5v4ksszczke-172324752526.europe-west3.run.app/logo.png) *Hinweis: Platzhalter für das App-Logo*

## 🌟 Hauptmerkmale

- **Interaktives Dashboard:** Echtzeit-Überblick über Leistungskennzahlen (KPIs), aktuelle Aktivitäten und Schnellzugriff auf Kernfunktionen.
- **Forderungsmanagement:** Detaillierte Liste offener Posten mit Statusverfolgung (Kritisch, Fällig, Normal) und Zahlungsverlauf.
- **Kundenverwaltung:** Zentrale Datenbank für Kundenkontakte, Bestellhistorie und Umsatzstatistiken.
- **Bestandsverwaltung:** Visuelle Inventarliste mit Lagerort-Tracking und integrierter Kamerafunktion zur Produkterfassung.
- **Point of Sale (POS):** Schneller Verkaufsprozess mit Warenkorb-System, Kategorie-Filtern und simulierter NFC-Zahlungsabwicklung.
- **Integrierter Taschenrechner:** Ein spezialisiertes Werkzeug für schnelle Berechnungen direkt in der App.
- **Sicherheit & Datenschutz:** Anpassbare Sicherheitseinstellungen wie PIN-Änderung, Biometrie-Optionen und Privacy-Modus.

## 🛠 Technologie-Stack

- **Frontend:** React 18 mit TypeScript
- **Styling:** Tailwind CSS für das "Liquid Glass" Design
- **Animationen:** Framer Motion für flüssige Übergänge und Interaktionen
- **Icons:** Lucide React
- **Build-Tool:** Vite
- **Backend API:** Express (Node.js)

## 🔐 Umgebungsvariablen (Frontend vs. Backend)

### Frontend (öffentlich)

Nur Variablen mit `VITE_` Prefix dürfen im Frontend verwendet werden, da diese beim Build in den Browser-Code eingebettet werden.

Beispiel:

- `VITE_APP_URL`

### Backend (geheim)

Geheime API-Keys müssen **ohne `VITE_` Prefix** ausschließlich serverseitig liegen.

Beispiel:

- `GEMINI_API_KEY`

> Wichtig: `GEMINI_API_KEY` wird nicht mehr in `vite.config.ts` ins Frontend injiziert.

## 🚀 Erste Schritte

### Voraussetzungen

- Node.js (Version 18 oder höher)
- npm oder yarn

### Installation

1. Klonen Sie das Repository oder laden Sie die Dateien herunter.
2. Installieren Sie die Abhängigkeiten:
   ```bash
   npm install
   ```
3. Legen Sie `.env` auf Basis von `.env.example` an und setzen Sie mindestens `GEMINI_API_KEY`.
4. Starten Sie die App:
   ```bash
   npm run dev
   ```
5. Öffnen Sie `http://localhost:3000` in Ihrem Browser.

## 🧠 Gemini-Anbindung (serverseitig)

Der Client ruft Gemini über den Backend-Endpunkt auf:

- `POST /api/gemini/generate`

Dadurch bleibt der API-Key auf dem Server und wird nie an den Browser ausgeliefert.

## ✅ Start-Validierung für Secrets

Vor `npm run dev` läuft automatisch eine Validierung (`predev`), die den Start abbricht, wenn erforderliche serverseitige Secrets (aktuell `GEMINI_API_KEY`) fehlen.

## 📱 Design-Philosophie

Die App nutzt ein **Glassmorphismus-Design**, das durch folgende Elemente geprägt ist:
- **Transparenz:** Halbtransparente Panels mit Backdrop-Blur-Effekten.
- **Gradients:** Dynamische "Liquid Gradients" für primäre Interaktionselemente.
- **Tiefe:** Subtile Schatten und Lichtkanten zur Hervorhebung von Ebenen.
- **Mobile-First:** Optimiert für die einhändige Bedienung auf Smartphones.

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert.
