# cc:Apartment
Eine Wohnungsbörse, wo sich Suchende und Anbieter über einen Matching Algorithmus finden und sich somit das endlose Schreiben bzw. Lesen von Bewerbungen ersparen

## Installation
1. (Installieren von Node.js: https://nodejs.org/en/download/)
2. (Installieren von Git: https://gitforwindows.org/)
3. Klonen in gewünschtes Verzeichnis:
    1. $ git clone https://github.com/nick2202/cc-apartment-backend.git
    2. $ git clone https://github.com/nick2202/cc-apartment-frontend.git
4. Temporäre .env-Datei mit Variablen erstellen (benötigt für Verbindung zu unserem MongoDB-Cluster + Port + JWT-Secret (Standardwerte können für Dev-Umgebung benutzt werden)):
    1. $ cd cc-apartment-backend
    2. $ mkdir config
    3. $ cd config
    4. $ echo <url to your MongoDB> > a.env
    5. $ echo PORT=<your backend port> >> a.env
    6. $ echo SECRET=<your JWT secret> >> a.env
5. Temporäre .env-Datei (a.env) zu UTF-8 konvertieren (kann sonst nicht gelesen werden):
    1. $ Get-Content a.env | Set-Content -Encoding utf8 .env
    2. $ del a.env
6. Installieren + Starten des Backends:
    1. $ cd ..
    2. $ npm install
    3. $ npm start
7. In cc-apartment-frontend gehen (dafür neue Konsoleninstanz öffnen):
    1. $ cd <Verzeichnis mit Projekten>
    2. $ cd cc-apartment-frontend
8. Installieren + Starten des Frontends:
    1. $ npm install
    1. $ npm start
9. Browser öffnen und http://localhost:3002 aufrufen

    

## Example request (POST Bewerber MatchingKriterien):
```yaml
{
    "geschlecht": [
        "m"
    ],
    "alter": [
        35
    ],
    "raucher": [
        "Raucher"
    ],
    "ernaehrung": [
        "vegan"
    ],
    "taetigkeit": [
        "Schüler"
    ],
    "politischeGesinnung": [
        "links"
    ],
    "hobbies": [{
        "brettspiele": 0.5,
        "videospiele": 0.75,
        "lesen": 1,
        "sport": 1,
        "reisen": 1,
        "feiernGehen": 1,
        "musizieren": 1
    }],
    "interessen": [{
        "politik": 1,
        "kultur": 1,
        "naturwissenschaften": 1,
        "technik": 1,
        "sport": 1
    }]
}
```
