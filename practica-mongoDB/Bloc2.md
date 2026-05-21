
## Bloc 2 – Model de dades, volums i persistència de dades 
En aquesta pràctica crearem l’estructura de dades necessàries per gestionar una botiga en línia.  
 
**2.1 Script d'inicialització**

Crea  el  fitxer  mongo-init/init.js.  Aquest  script  s'executarà  automàticament  quan  el  contenidor s'engegui per primera vegada. Ha de crear la base de dades botiga i les següents col·leccions:

-   productes amb, com a mínim, 10 documents amb l'estructura següent:

```json
{
  nom: String,         // Nom del producte 
  preu: Number,        // Preu en euros (decimal) 
  categoria: String,   // 'electrònica', 'roba', 'llar', 'esport'... 
  estoc: Number,       // Unitats disponibles 
  valoracio: Number,   // De 1.0 a 5.0 
  actiu: Boolean,      // Si el producte està disponible per a vendre 
  etiquetes: [String], // Array d'etiquetes 
  creat_el: Date       // Data de creació 
} 
```
-  clients: 
-  Defineix les dades mínimes que necessites del client i modelitza la col·lecció.  
-  Crea com a mínim 10 clients. 
-  comandes:  
-  Defineix les dades mínimes que necessites d’una comanda i modelitza la col·lecció. 
-  Crea com a mínim 10 comandes. 

A l’hora de crear les col·leccions decideix si utilitzes una estratègia embedding o referència. 


**Embedding (dades dins del document)**
S’utilitza quan les dades secundàries SEMPRE es consulten juntament amb les principals.  

`Exemple:` els gèneres d'un contingut audiovisual d’una plataforma d’streaming, ja que voldré filtrar tots els continguts que siguin d’un o diversos gèneres.

`Avantatge:` amb una única consulta a una col·lecció, obtenim tota la informació que l’usuari vol. 

`Inconvenient:` utilització de més espai d'emmagatzematge, noms dels gèneres no harmonitzats (puc 
tenir un mateix gènere escrit de diferents maneres) 
 
**Referència (semblant al model relacional)** 
S’utilitza quan les dades secundàries tenen “vida pròpia” o són molt voluminoses. 
 
`Exemple:` l’historial de visualització d’un usuari en una plataforma d’streaming. Caldrà crear una 
col·lecció a part referenciant l’usuari amb el seu id. 
 
`Avantatge:` les dades mestres d’usuari no es dupliquen (nom, cognoms, correu, pla de facturació...) 
Inconvenient: cal fer $lookup (similar al join) per creuar dades. 
 
Utilitza `insertMany()` per inserir tots els documents en una sola operació. Varia les categories dels productes i els valors per tenir dades representatives per a les consultes.
  
**2.2 Prova de persistència**
Demostra que els volums funcionen correctament seguint aquests passos i documenta cada pas amb una captura de pantalla: 
  
1. Engega l'entorn: docker compose up -d 
2. Accedeix a Mongo Express (http://localhost:8081) i verifica que existeix la BD botiga 
3. Atura i elimina els contenidors: docker compose down 
4. Torna a engegar: docker compose up -d 
5. Verifica que les dades encara existeixen 

**2.3 Preguntes teòriques**
Prepara la resposta d’aquestes preguntes i escriu-la al fitxer `practica.md`. Aquestes preguntes se’t podran demanar en la validació oral.
 
1. Què  passaria  si  no  definíssim  cap  volum  al `docker-compose.yml`?  Fes  la  prova  i documenta el resultat.
2. Explica la diferència entre un volum named (amb nom) i un bind mount (ruta del host).Quan convé usar cada un?
3. Explica la diferència entre l’estratègia embedding i l’estratègia referència amb exemples. Cal que els exemples siguin diferents dels que s’exposen en aquest document. 
4. Explica quina estratègia o estratègies has fet servir en la col·lecció comandes i per quin motiu. 