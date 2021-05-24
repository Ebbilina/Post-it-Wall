# Projekt

[Beschreiben Sie hier in einer kurzen Zusammenfassung Hintergrund, Ziele und Funktionen Ihrer Anwendung. Fügen Sie einen sinnvollen Screenshot ein. Geben Sie eine Link zu einer lauffähigen, online-erreichbaren Version der fertigen Anwendung an.]

Ziele: Die Digitale-Post-It-Wand unterstützt die Kommunikation eines lokal ungebundenen Teams (z. B. mit Homeoffice-Zeiten). Wie im richtigen Büro steht sie an zentraler Stelle und unterstützt die Ideensammlung und -strukturierung und damit verbundene Tasks. Ein kurzer Blick darauf zu Beginn des Tages oder nach der Mittagspause bietet Struktur und eine Erinnerungshilfe des aktuellen Standes als optimale Ergänzung zu anderen Kollaborationstools. Dadurch wird die Organisation im Team vereinfacht.

Screenshot: https://user-images.githubusercontent.com/42045741/95502101-99d61800-09a9-11eb-9aca-1ed9882683da.PNG

Link zur Website: https://post-it-pinnwand.herokuapp.com/

Die geplanten Features der Anwendung werden [hier](./Features.md) beschrieben. Das verwendete Software Design ist [hier](./Design.md) zusammengefasst. Allgemeine Guidelines, die das Team im Rahmen des Projekts einhalten möchte werden [hier](./GFuidelines.md) zusammengetragen.

## Team
Eva Pulina (Ebbilina), eva.pulina@stud.uni-regensburg.de :
 - Drag and Drop mit interact.js + postit-position an Windowgröße anpassen und hervorheben der Post-Its mittels Click ([FE] postitView.js)
 - initiale Postitstruktur ([FE] Observer.js, Event.js, postitModel.js, postitView.js, index.js)
 - CSS-Grundlage der Postits und Pinnwand ([FE] index.html , style.css)

Juliana Zgryzek (Tschuliana) juliana.zgryzek@stud.uni-regensburg.de :
 - Raumlogik zur Pinnwanderstellung + joinen des Raums per Invitelink ( [BE] index.js [FE] index.js)
 - Datenspeicherung über Firebase + Integration im Frontend ([BE] db.js)
 - Websitesynchronisierung über socket.io + Integration im Frontend ( [BE] websocket.js, [FE] socket.js)
 
Leonie Deger (leoniedeger) leonie.deger@stud.uni-regensburg.de :
 - Modal window zum erstellen und bearbeiten der post-its ([FE] modal.js , editmenu.js, index.html, style.css, index.js, postitModel.js)  
  -> Postitfarbe  
  -> Textfarbe  
  -> Textgröße  
  
Elisabeth Tjatjuchin (ElisabethTja) elisabeth.tjatjuchin@stud.uni-regensburg.de :
  - Help-page([FE] helpPage.html , styleHelpPage.css)
  - Hosting per Heroku/Git (procfile)

## Setup und Testing

Im Starterpaket ist ein einfacher Webserver vorgegeben, mit dem Sie die Inhalte des Ordners `/app` statisch ausliefern können. Benutzen Sie diesen, um Ihre Anwendung zu entwickeln und zu testen. Sollten Sie zu Realisierung Ihrer Anwendung eine komplexere Serverkomponente benötigen, können Sie die vorhandenen Dateien (`index.js` und `lib/AppServer.js`) als Ausgangslage für eigene Erweiterungen nutzten. Speichern Sie alle weiteren, serverseitig verwendeten Dateien im Verzeichnis `/lib` ab.

So nutzen Sie den vorgegebenen Server:

1. Führen Sie **einmalig** den Befehl `npm install` aus, um die notwendigen Abhängigkeiten (`express`) zu installieren.

2. Führen Sie den Befehl `npm start` aus um die Anwendung zu starten. Der Inhalt des `/app`-Verzeichnis ist anschließend über die die Adresse `http://localhost:8000/app` erreichbar.

### Automatisches Bauen der Anwendung

Unter Umständen müssen oder wollen Sie vor dem Ausführen bzw. Bereitstellen Ihrer Anwendung bestimmte Optimierungsvorgänge durchführen (z.B. mehrere Javascript-Dateien zu einer zusammenfügen oder Grafikdateien für die Verwendung im Browser anpassen). Versuchen Sie diese Schritte mithilfe entsprechende *Node.js*-Module zu lösen und implementieren Sie die Automatisierung in der Datei `build.js`. Sie können diese Datei über den Befehl `npm run build` starten. Dabei wird vor dem Ausführen der Datei der Javascript-Code unter `app/resources/js/` auf Fehler und Warnungen (*eslint*) geprüft. Der automatisierte Bau der Software startet nur dann, wenn Ihr Code fehlerfrei ist.

Um per Localhost die Anwendung auszuführen sind die folgenden Schritte notwendig:

- Im Frontend und Backend "npm install" ausführen.  
- Änderungen im Code:  
  - index.js [FE] 3 Änderungen:
    - Zeile 24 die URL mit dem darunter auskommentierten Localhost ersetzten
    - Zeile 76 die URL mit dem darunter auskommentierten Localhost ersetzten
    - Zeile 143 die URL mit dem darunter auskommentierten Localhost ersetzten
  - index.js [BE] 1 Änderung:
    - Zeile 68 mit der darunter auskommentierten Zeile 69 ersetzten
  - socket.js [FE] 1 Änderung:
    - Zeile 8 die URL mit dem darunter auskommentierten Localhost ersetzten
 - die Änderungen speichern und "npm start" ausführen
    
[Beschreiben Sie alle Schritte, die notwendig sind um Ihre Anwendung auf Basis dieses Repositorys zu starten.]

## Beschreibung
- per "new Pinnboard" neue Pinnwand erstellen um mit, vom User eingeladenen Leuten, kollaborativ zu arbeiten.
- per versendeten Invitelink Teilnehmer einladen.
- über "Hilfe"-Button einen Überblick über die wesentlichen Funktionen der Pinnwand erhalten.  
 -> Screenshot: https://user-images.githubusercontent.com/65229928/95576234-6094bb00-0a30-11eb-9844-db306b0fd3e8.PNG
- per "+"-Button neues post it erstellen
 -> im modal window Text eingeben und die Eigenschaften von Textgröße, Textfarbe und Post-it farbe über ein Drop-down-menü auswählen.  
 -> Screenshot: https://user-images.githubusercontent.com/42045741/95502780-a5760e80-09aa-11eb-89fe-73c31f65ef2d.PNG
- über "edit"-button des jeweiligen post-its öffnen des modal windows und erneute Bearbeitung
- per "delete"-button postit aus der Datenbank und der View löschen
- postit per Mausclick + Führung verschieben

[Dokumentieren Sie ausführlich alle Funktionen der Anwendung. Verwenden Sie Screenshots und ggf. auch Gif-Dateien um zentrale Elemente und Abläufe zu beschreiben.]
