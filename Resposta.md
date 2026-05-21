---
title: Respostes Practica MongoDB-Docker
author: Milton Moreta
output: pdf
---
# Bloc 0
- ![Estructura Carpetes i Archius](./practica-mongoDB/img/Estructura%20carpetas.png)
- [URL Repositori Git]()

# Bloc 1

[Respuesta 1.1-1.2](./practica-mongoDB/docker-compose.yaml)


## 1.3

1.  Quina és la diferència entre docker run i docker compose up?

```MarkDown
La diferencia es que el docker run es una comanda per al `motor` de docker que conté els contenidors, en canvi docker compose up inicialitza els contenidors amb els serveis
```

2.  Per a què serveix la instrucció depends_on? Garanteix que el servei dependent estigui completament operatiu?

```MarkDown
La instrucció depends-on serveix per posar en marxa serveis en ordre.
Si un servei depen d'un altre, aquest servei no es posarà operatiu si del qual depén no ho està previament.

Aixo no garanteix que el servei depenent estigui completament operatiu pero si garanteix que intentara posar-se en marxa.
```

3.  Explica  quina  és  la  diferència  entre  una xarxa  bridge  per  defecte  i  una  xarxa personalitzada (amb nom) a Docker Compose.

```
La diferencia es l'entorn on es despleguen els serveis, si fas servir la xarxa bridge per defecte el docker crea una xarxa amb el nom del projecte i els serveis es despleguen de forma que tots son visibles entre ells dins el contenidor.
En canvi si fas servir un personalitzada el despleg serà a la xarxa indicada. D'aquesta manera pots aïllar serveis entre ells o controlar la visibilitat entre ells i oferir mes securetat.
```






