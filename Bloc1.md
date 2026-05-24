
## Bloc 1 – Configuració Docker Compose  

Crea  el  fitxer  docker-compose.yml  a  l'arrel  del  projecte.  Aquest  fitxer  definirà  dos  serveis:  el servidor MongoDB i el client Mongo Express per gestionar la base de dades des del navegador.

```
Un  servei  és  un  programa  que  s’executa  en  segon  pla de  forma  contínua,  sense  necessitat d’interacció directa amb l’usuari.
```
### 1.1 Servei MongoDB 
El servei de MongoDB ha de complir els requisits següents:  
*  Imatge: mongo:7.0 
*  Nom del contenidor: mongodb-botiga 
*  Port exposat: 27017 (host) → 27017 (contenidor) 
*  Variables  d'entorn:  MONGO_INITDB_ROOT_USERNAME  i MONGO_INITDB_ROOT_PASSWORD 
*  Volum: muntar ./data a /data/db per a la persistència 
*  Volum: muntar ./mongo-init a /docker-entrypoint-initdb.d per a la inicialització 
*  Xarxa: xarxa personalitzada (amb nom) anomenada xarxa-botiga 

**1.2 Servei Mongo Express** 
Mongo Express és una interfície web per gestionar MongoDB. Ha de complir:
*  Imatge: mongo-express:1.0 
*  Nom del contenidor: mongoexpress-botiga 
*  Port exposat: 8081 (host) → 8081 (contenidor) 
*  Dependència: ha d'arrancar després de mongodb-botiga 
 
 
 
**Variables  d'entorn  per  connectar  amb  MongoDB:**

```yaml
ME_CONFIG_MONGODB_ADMINUSERNAME, 
ME_CONFIG_MONGODB_ADMINPASSWORD, ME_CONFIG_MONGODB_URL 
#Reinici automàtic: 
restart: unless-stopped 
```
---

```
No s’han de posar mai contrasenyes en clar en fitxers que pugin a repositoris públics.
```
---

En un entorn productiu s'utilitzen Docker Secrets o fitxers .env (afegit al `.gitignore`).

**1.2 Preguntes teòriques**

Prepara la resposta d’aquestes preguntes i escriu-la al fitxer `practica.md`. Aquestes preguntes se’t podran demanar en la validació oral.
1.  Quina és la diferència entre docker run i docker compose up?
2.  Per a què serveix la instrucció depends_on? Garanteix que el servei dependent estigui completament operatiu?
3.  Explica  quina  és  la  diferència  entre  una  xarxa  bridge  per  defecte  i  una  xarxa personalitzada (amb nom) a Docker Compose.