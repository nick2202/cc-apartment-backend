Git -> Clone Project -> $npm install -> $npm start

create config/.env in root dir and set Port and MongoDB authentication

Example request (POST Bewerber MatchingKriterien):
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
