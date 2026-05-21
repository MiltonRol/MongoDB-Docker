## Bloc 0 – Preparació de l’entorn i documentació 
Per fer aquesta pràctica necessites: SCV al núvol (GitHub o GitLab) i Docker 
 
**Comencem amb l’SCV:** 
 
1.  Crea el projecte al SCV al núvol. Comença a actualitzar el fitxer README.md amb el títol i descripció breu del projecte.  
 
2.  Crea un fitxer anomenat practica.md per respondre a les preguntes i penjar les captures de pantalla d’aquest enunciat. 
 
  * A  partir  d’ara  hauràs d’anar actualitzant tant el fitxer README.md com practica.md. Els fitxers han d’estar escrits en Markdown.
 
  * En  finalitzar  la  pràctica  el fitxer README.md haurà de permetre que qualsevol persona pugui replicar l’entorn. Contingut mínim del fitxer: 
 
    - Títol i descripció breu del projecte 
    - Prerequisits (programari i versions) 
    - Instruccions d'instal·lació i posada en marxa 
    - Estructura de fitxers  
    - Comandes principals per operar l'entorn (com fer consultes i crear dades) 
    - Explicació dels volums i xarxes configurats 
 
  * En finalitzar la pràctica el fitxer practica.md haurà de tenir: 
    - Respostes a les preguntes teòriques de tots els blocs 
    - Captures de pantalla que es demanen. 
 
3.  Instal·la git en local, si no el tens. Verifica la versió amb: git --version 
 
4.  Clona el repositori en remot al teu local. A partir d’aquí pots treballar en el teu repositori local. Pots utilitzar un IDE com VS Code per editar els fitxers Markdown. 
 
5.  Ves fent commits sovint per tenir el repositori al núvol sincronitzat amb el teu local. 
 
En finalitzar la pràctica hauràs de tenir en el teu repositori al núvol tot el teu projecte.


**Seguim amb Docker:** 
 
Cal que tinguis instal·lat en el teu entorn de treball docker. Un cop instal·lat, executa les comandes següents al terminal i comprova que no retornen errors: 

 ```bash
docker --version 
docker compose version 
docker run hello-world 
 ```
Crea la següent estructura de projecte. Crea la carpeta del projecte i l'estructura de fitxers tal com s'indica. Pots fer-ho manualment o amb les comandes del terminal. 

```
practica-mongodb/ 
├── docker-compose.yml       # Definició dels serveis 
├── mongo-init/ 
│   └── init.js            # Script d'inicialització 
├── queries/ 
│   ├── crud.js            # Operacions CRUD 
│   └── advanced.js        # Consultes avançades 
├── data/                    # Volum de dades (auto-generat) 
└── README.md                # Documentació del projecte
```
