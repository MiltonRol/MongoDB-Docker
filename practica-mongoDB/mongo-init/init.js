// Este script se ejecuta automáticamente la primera vez que se levanta MongoDB
// porque lo montamos en /docker-entrypoint-initdb.d

// Seleccionamos/creamos la base de datos 'botiga'
db = db.getSiblingDB("botiga");

// 1. Crear colección 'productes' e insertar datos iniciales
db.productes.insertMany([
  {
    nom: "Portàtil Gaming",
    preu: 1200.99,
    categoria: "electrònica",
    estoc: 5,
    valoracio: 4.7,
    actiu: true,
    etiquetes: ["gaming", "oferta", "nou"],
    creat_el: new Date()
  },
  {
    nom: "Samarreta Esportiva",
    preu: 25.5,
    categoria: "roba",
    estoc: 20,
    valoracio: 4.2,
    actiu: true,
    etiquetes: ["esport", "rebaixes"],
    creat_el: new Date()
  },
  { nom: "Samarreta Esportiva",
    preu: 25.5,
    categoria: "roba",
    estoc: 20,
    valoracio: 4.2,
    actiu: true,
    etiquetes: ["esport", "rebaixes"],
    creat_el:   new Date()
  },
  { nom: "Pantalons de Xandall",
    preu: 39.9, categoria: "roba",
    estoc: 15,
    valoracio: 4.5,
    actiu: true,
    etiquetes: ["esport", "confort"],
    creat_el: new Date()
  },
  { nom: "Jaqueta Tècnica Impermeable",
    preu: 89.0,
    categoria: "roba",
    estoc: 8,
    valoracio: 4.8,
    actiu: true,
    etiquetes: ["muntanya", "hivern"],
    creat_el: new Date()
  },
  { nom: "Sabatilles de Running Pro",
    preu: 110.0,
    categoria: "calçat",
    estoc: 25,
    valoracio: 4.7,
    actiu: true,
    etiquetes: ["córrer", "professional"],
    creat_el: new Date()
  },
  { nom: "Motxilla Urbana 20L",
    preu: 45.5,
    categoria: "complements",
    estoc: 30,
    valoracio: 4.1,
    actiu: true,
    etiquetes: ["ciutat", "viatges"],
    creat_el: new Date()
  },
  { nom: "Gorra amb Protecció UV",
    preu: 18.0,
    categoria: "complements",
    estoc: 50,
    valoracio: 3.9,
    actiu: false,
    etiquetes: ["sol", "estiu"],
    creat_el: new Date()
  },
  { nom: "Guants de Gimnàs", preu: 12.9, categoria: "complements", estoc: 40, valoracio: 4.3, actiu: true, etiquetes: ["pes", "gimnàs"], creat_el: new Date() },
  { nom: "Calcetins Tècnics Transpirables", preu: 9.5, categoria: "roba", estoc: 100, valoracio: 4.6, actiu: true, etiquetes: ["esport", "confort"], creat_el: new Date() },
  { nom: "Ampolleta d'Aigua Esportiva", preu: 14.0, categoria: "complements", estoc: 60, valoracio: 4.0, actiu: true, etiquetes: ["hidratació", "ecològic"], creat_el: new Date() },
  { nom: "Rellotge Intel·ligent Esportiu", preu: 199.9, categoria: "electrònica", estoc: 10, valoracio: 4.9, actiu: true, etiquetes: ["tecnologia", "salut"], creat_el: new Date() }

  // ... añade hasta tener mínimo 10 productos
]);

// 2. Crear colección 'clients'
db.clients.insertMany([
  {
    nom: "Anna",
    cognoms: "Pérez López",
    email: "anna@example.com",
    telefon: "+34 600000001",
    adreca: {
      carrer: "Carrer Major 1",
      ciutat: "Barcelona",
      codi_postal: "08001",
      pais: "Espanya"
    },
    creat_el: new Date()
  },
  {
    nom: "Marc",
    cognoms: "García Ruiz",
    email: "marc@example.com",
    telefon: "+34 600000002",
    adreca: {
      carrer: "Carrer Nou 5",
      ciutat: "L'Hospitalet",
      codi_postal: "08902",
      pais: "Espanya"
    },
    creat_el: new Date()
  },
  {
    nom: "Juan",
    cognoms: "Sanchez López",
    email: "SanLo@example.com",
    telefon: "+34 600003001",
    adreca: {
      carrer: "Carrer Major 11",
      ciutat: "Barcelona",
      codi_postal: "08011",
      pais: "Espanya"
    },
    creat_el: new Date()
  },
  {
    nom: "Rosa",
    cognoms: "Lietis",
    email: "Roselie@example.com",
    telefon: "+34 630000001",
    adreca: {
      carrer: "Carrer ",
      ciutat: "Barcelona",
      codi_postal: "08001",
      pais: "Espanya"
    },
    creat_el: new Date()
  },
  {
    nom: "Angel",
    cognoms: "Presley",
    email: "Ley@example.com",
    telefon: "+34 600120001",
    adreca: {
      carrer: "Carrer Menor 13",
      ciutat: "Lleida",
      codi_postal: "18001",
      pais: "Espanya"
    },
    creat_el: new Date()
  },
  {
    nom: "Yafreisi",
    cognoms: "Mota Uribe",
    email: "Yamota@example.com",
    telefon: "+34 630560001",
    adreca: {
      carrer: "Carrer Mao 16",
      ciutat: "Santo Domingo",
      pais: "Republica Dominicana"
    },
    creat_el: new Date()
  }
  // ... mínimo 10 clientes
]);

// 3. Crear colección 'comandes'
// Aquí mezclamos referencia (id del cliente) + embedding (líneas de productos)
const clients = db.clients.find().toArray();
const productes = db.productes.find().toArray();

db.comandes.insertMany([
  {
    client_id: clients[0]._id,   // referencia al cliente
    data: new Date(),
    linies: [                    // embedding de productos dentro de la comanda
      {
        producte_id: productes[0]._id,
        nom: productes[0].nom,
        quantitat: 1,
        preu_unitari: productes[0].preu
      },
      {
        producte_id: productes[1]._id,
        nom: productes[1].nom,
        quantitat: 2,
        preu_unitari: productes[1].preu
      }
    ],
    total: productes[0].preu * 1 + productes[1].preu * 2,
    estat: "pagada"
  }
  // ... crea más comandes (mínimo 10)
]);