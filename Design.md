# Software Design für die Digitale Post-It-Wand

[Beschreiben Sie hier die intendierte Code-**Struktur** Ihrer Anwendung. Notieren Sie wesentliche **Module** oder Konzepte, entlang derer sich Ihre Anwendung strukturieren lässt. Gehen Sie dabei auch auf grundlegende **Architekturen**, z.B. die Unterscheidung von Server- und Client-Anwendung ein und beschreiben Sie die Art und Weise, wie Teilkomponenten miteinander **kommunizieren** werden. Entwerfen Sie Strukturen und Vorgaben für zentrale Datenobjekte und geben Sie an, welche Teilbereiche der Anwendung unter Verwendung externe APIs oder Bibliotheken umgesetzt werden sollen. Erweitern und Überarbeiten Sie dieses Dokument im Verlauf des Projektes. Hier soll stets eine **aktuelle** Dokumentation des aktuell geplanten bzw. umgesetzten Software Designs einsehbar sein.]

Klassen:
FrontEnd:
- modal.js (Modal für den User zum Bearbeiten der postit-eigenschaften + Text)
- editMenu.js (Schnittstelle User und postitModal, Veränderung der Eigenschaften und updaten der postitView),
- postItView.js (gibt geänderte Eigenschaften über Events (Event.js) an PostItModel weiter, 
Nutzung der externen interact.js für das Drag and Drop der Post-Its), 
postIt.js (Klasse für das Erstellen von neuen Post-Its mit allen nötigen Eigenschaften (zur Darstellung und Speicherung), wird in PostItModel genutzt), 
postItModel.js (wertet Daten aus der Datenbank aus für postItView.js und gibt Änderungen von der View an Datenbank weiter, neues Erstellen eines Post-its initialisiert und an View weitergegeben)
- Event.js (bietet Events zur Kommunikation und Datenweitergabe zwischen Klassen)
- Observer.js (bietet Registrierung von Listenern für Event-Vermittlung)
- index.js (Initialisierung des gesamten Frontends)

- style.css (bietet (größtenteils statische) Style-Eigenschaften der Seite, Buttons und Post-Its, sowie Klassen zur Änderung von Styles von Post-Its)
- styleHelpPage.css (bietet Style-Eigenschaften der Hilfe-Seite)

- index.html (HTML-Struktur der Pinnwand)
-helpPage.html (HTML-Struktur der Helppage)


BackEnd:
- db.js (Datenbank)
- index.js
- ws.js (websocket)

Struktur:
Pinnwand als HTML -> grid-List

technische Anforderungen:
| Feature | API/Bibliothek | 
|---------|--------------|
| drag and drop | interact.js |
| Kollaboration | socket.io |
| Pinnwand-räume | express.js |
| Datenbank | firebase |
| modal | bootstrap |
| enable usage of ES6| babel |
| node. js style modules | browserify |

