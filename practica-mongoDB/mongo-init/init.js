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