# Technische Dokumentation v1.3.0

Diese Dokumentation bietet einen tieferen Einblick in die Architektur, Komponenten und Datenstrukturen von **Liquid Glass Finanzen**.

## 🏗 Architekturübersicht

Die Anwendung ist als Single-Page-Application (SPA) mit React aufgebaut. Sie nutzt einen komponentenorientierten Ansatz für eine modulare und wartbare Codebasis.

### Hauptkomponenten

1.  **Dashboard (`Dashboard`):** Die zentrale Übersichtskomponente, die KPIs, Schnellzugriffe und Aktivitäten anzeigt.
2.  **Forderungsliste (`ClaimsList`):** Verwaltet die Anzeige und Filterung von offenen Forderungen.
3.  **Forderungsdetails (`DebtDetails`):** Zeigt detaillierte Informationen zu einer spezifischen Forderung an, einschließlich Zahlungsverlauf.
4.  **Kunden (`Customers`):** Eine neue Komponente zur Verwaltung der Kundendatenbank.
5.  **Bestand (`Inventory`):** Verwaltet die Produktliste und bietet Funktionen zum Hinzufügen neuer Produkte (inkl. Kamera-Support).
6.  **Verkauf (`Sales`):** Das POS-Modul mit Warenkorb-Logik, Gewichts-Präzision (0,01g) und Schnellwahl-Presets.
7.  **Zahlungsvorgang (`PaymentProcess`):** Eine immersive Komponente zur Simulation von NFC-Zahlungen.
8.  **Taschenrechner (`Calculator`):** Ein eigenständiges Werkzeug für schnelle Berechnungen.
9.  **Einstellungen (`Settings`):** Verwalten von Benutzerprofilen und Sicherheitseinstellungen.
10. **Navigation (`BottomNav`):** Die globale Navigationsleiste für den schnellen Wechsel zwischen den Ansichten.

## 📊 Datenmodelle (`types.ts`)

Die Anwendung nutzt TypeScript-Interfaces, um Datenstrukturen konsistent zu halten:

- **`View`:** Ein Union-Type, der alle verfügbaren Ansichten definiert (`dashboard`, `claims`, `details`, `payment`, `inventory`, `sales`, `settings`, `calculator`, `customers`).
- **`Customer`:** Repräsentiert einen Kunden (ID, Name, E-Mail, Telefon, Letzte Bestellung, Gesamtumsatz, Avatar).
- **`KPI`:** Struktur für Leistungskennzahlen (Label, Wert, Trend, Icon, Farbe).
- **`Activity`:** Struktur für Aktivitäten (ID, Titel, Untertitel, Betrag, Zeit, Icon, Farbe).
- **`Claim`:** Repräsentiert eine Forderung (ID, Name, Status, Status-Detail, Betrag, Verzugstage).
- **`Product`:** Struktur für Inventar-Artikel (ID, Name, Lagerort, Einheiten, Status, Bild).
- **`CartItem`:** Repräsentiert einen Artikel im Warenkorb (ID, Name, Preis, Menge/Gewicht, Icon).

## ⚖️ Präzisions-Kasse (POS)

Das Verkaufsmodul wurde für maximale Genauigkeit optimiert:
- **Gewichts-Tracking:** Unterstützung für Fließkomma-Mengen (Gramm).
- **0,01g Genauigkeit:** Inkrementelle Anpassung für exakte Messungen.
- **Schnellwahl-Presets:** Buttons für 0,2g, 0,5g und 1,0g für effiziente Bedienung.
- **Echtzeit-Berechnung:** Sofortige Aktualisierung des Gesamtbetrags basierend auf dem Preis pro Gramm.

## 🎨 Styling & Design-System

Das "Liquid Glass" Design-System basiert auf Tailwind CSS Utility-Klassen und benutzerdefinierten CSS-Variablen.

### Schlüsselklassen
- **`.glass-panel`:** Erzeugt ein halbtransparentes Panel mit Backdrop-Blur.
- **`.glass-card`:** Eine Variante für Karten-Elemente mit subtileren Effekten.
- **`.liquid-gradient`:** Ein dynamischer Farbverlauf für primäre Schaltflächen.
- **`.primary-gradient-text`:** Wendet den primären Farbverlauf auf Text an.

### Animationen
Framer Motion (`motion/react`) wird für folgende Zwecke eingesetzt:
- **Seitenübergänge:** Sanftes Ein- und Ausblenden beim Wechsel der Ansichten.
- **Modale:** Animiertes Erscheinen von Formularen (z. B. "Neues Produkt", "Neuer Kunde").
- **Interaktive Elemente:** Hover-Effekte und Skalierung bei Klicks.

## 📸 Kamera-Funktionalität

Die Kamera-Integration nutzt das Standard-HTML5-Input-Element mit dem Attribut `capture="environment"`. Dies ermöglicht auf mobilen Geräten den direkten Zugriff auf die Rückkamera, während auf Desktop-Geräten ein Datei-Upload-Dialog erscheint. Die Bilder werden als Base64-Strings im lokalen State der Anwendung gespeichert.

## 🔐 Sicherheit & Datenschutz

Obwohl es sich um eine Frontend-Demo handelt, sind folgende Sicherheitskonzepte implementiert:
- **Privacy-Modus:** Option zum Ausblenden sensibler Daten (z. B. Vorschaubilder).
- **Biometrie-Simulation:** Vorbereitung für die Integration nativer Biometrie-APIs.
- **Auto-Lock:** Vorbereitung für automatische Sperrsysteme.
