# Features für die digitale Post-It-Wand

[Notieren und beschreiben Sie hier alle wesentlichen Funktionen bzw. *Features* Ihrer Anwendung. Seien Sie möglichst ausführlich in der Dokumentation und beachten Sie für die Erläuterungen ("Beschreibung") die Perspektive Ihrer NutzerInnen. Schätzen Sie initial den wahrscheinlichen Aufwand - auch um diese Schätzung am Ende des Projekts mit dem tatsächlichen Aufwand vergleichen zu können. Priorisieren Sie die Features hinsichtlich des zentralen *Use Case* Ihrer Anwendung und notieren Sie, welche größeren Bereiche der Anwendung von diesen Funktionen betroffen sind]

| Feature | Beschreibung | Priorität | Geschätzter Aufwand | Betroffene Schichten | Status |
|---------|--------------|-----------|--------------------|---------------------|---------------------|
| Zettel erstellen | Einen Post-It-Zettel an der Wand hinzufügen, default-Einstellungen | "kritisch" | 7 Tage | alles | integriert |
| Zetteleigenschaften bearbeiten | Mittels Menü Form, Farben, etc eines ausgewählten Zettels ändern | "mittel"| 7 Tage | View, Controller, Speicher | integriert |
| Startseite | HTML, CSS, Javascript Grundgerüst für die Post-it-Wand| "kritisch" | 7 Tage | View | integriert |
| Verschiedene Zettelformen | Kreis, Viereck, Pfeil, Herz | "nice-to-have" | 4 Tage | View | nicht integriert |
| verschiedene Farben der Zettel | Auswahl aus 5 gegebenen Farben | "mittel" | 3 Tage | View | integriert |
| Schriftgröße -farbe variabel | Auswahl aus 3 Größen und 2 Farben |  "nice-to-have" | 3 Tage | View | integriert |
| Symbole hinzufügen | Symbole auswählen aus gegebener Auswahl | "nice-to-have" | 5 Tage | View | nicht integriert |
| frei Zeichnen | auf Notizzettel frei Zeichnen können, Auswahl aus 5 Farben, 3 Strichstärken | "nice-to-have" | 6 Tage | View | nicht integriert |
| Bilder hinzufügen | eigene Bilder von PC auf Wand hochladen, Skalieren | "nice-to-have" | 6 Tage | Lokaler Speicher, View | nicht integriert |
| Zettel verschiebbar | Zettel "draggen und droppen" per Maus-Interaktion | "kritisch" | 6 Tage | View | integriert |
| Fälligkeitsdatum | Zettel kann Datum enthalten zur zeitlichen Orientierung | "nice-to-have" | 4 Tage | View | nicht integriert |
| übergeordnete Kategorisierung möglich (Zeichnen, Kategorisieren, Überschriften) | könnte kompliziert werden | "nice-to-have" | 7 Tage | View | nicht integriert |
| Notizen löschen | Notizen werden aus der View und aus dem Speicherort gelöscht |"hoch" |5 Tage| View, Speicher | integriert |
| Notizen bearbeiten | Edit-Mode - Inhalte, Textgröße etc. verändern | "kritisch" | 5 Tage | Speicher (Serverseitig), View | integriert |
| Persistenz | Zustand soll serverseitig gespeichert werden | "kritisch"|6 Tage | Speicher | integriert |
| kollaborativer Zugriff  | ausgewählte Kolleg_innen können per Invite mitarbeiten |"kritisch" | 8 Tage | Speicher Serverseitig, Controller | integriert |
| automatisches Speichern | in regelmäßigen Zeitabschnitten automatisch abspeichern | "kritisch" | 7 Tage | Speicher | integriert |
| automatisches Update | um immer den aktuellen Stand der Anwendung zu sehen und damit zu interagieren, wird der Server über veränderungen benachrichtigt | "kritisch" | 7 Tage | Speicher | integriert |
| Konflikte vermeiden | wollen zwei Personen gleichzeitig einen Zettel bearbeiten, muss hier ein entsprechender Mechanismus greifen, damit die Bearbeitung automatisch eine Person gewährt bekommt und die andere einen Hinweis, dass der Zettel aktuell von einer anderen Person bearbeitet wird | nice-to-have | 4 Tage | Server, View | nicht integriert |
| Überlappungen von Zetteln darstellen oder vermeiden | Zettel transparent machen oder automatisch verschieben bei zu starker Überlappung(?) Ebenso zurückschieben, wenn zu weit über Außenrand hinausgeschoben | mittel | 4 Tage | View, Controller | teilweise integriert |
| Unterscheidung der User | intern muss klar sein, wer bearbeitet und welche Rechte besitzt |"nice-to-have" |7 Tage| View, Speicher | nicht integriert |
| Teams mit Accounts erstellen | User  | "nice-to-have" |5 Tage| View, Speicher | nicht integriert |
| Hilfe-button | beschreibt User die möglichen Funktionen | "nice-to-have" | 5 Tage | View | integriert |


## Umsetzung

[Beschreiben Sie kurz das geplante Vorgehen bei der Umsetzung der Features. Entwerfen Sie dazu ein oder mehrere *Vertical Slices* anhand derer Sie den zentralen *Use Case* der Anwendung implementieren werden. Geben Sie an, wann welche Funktionen (und in welchem Vollständigkeitsgrad) implementiert werden. Begründen Sie kurz die gewählte Reihenfolge. ]
