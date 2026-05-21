// Este archivo lo puedes ejecutar desde el mongo shell o MongoDB CLI
// por ejemplo: `mongosh "mongodb://admin:admin123@localhost:27017/botiga" crud.js`

// Seleccionamos la base de datos
db = db.getSiblingDB("botiga");

// Helper para imprimir separadores
function printSeparator(title) {
  print("\n==================== " + title + " ====================\n");
}

// 3.1 CREATE

printSeparator("CREATE 1 - insertOne");
const resultInsertOne = db.productes.insertOne({
  nom: "Auriculars Bluetooth",
  preu: 59.99,
  categoria: "electrònica",
  estoc: 15,
  valoracio: 4.3,
  actiu: true,
  etiquetes: ["audio", "oferta"],
  creat_el: new Date()
});
printjson(resultInsertOne);

printSeparator("CREATE 2 - insertMany (ofertes)");
const resultInsertMany = db.productes.insertMany([
  {
    nom: "Ratolí Òptic Bàsic",
    preu: 9.99,
    categoria: "ofertes",
    estoc: 50,
    valoracio: 3.8,
    actiu: true,
    etiquetes: ["oferta", "bàsic"],
    creat_el: new Date()
  },
  {
    nom: "Teclat Mecànic",
    preu: 79.99,
    categoria: "ofertes",
    estoc: 10,
    valoracio: 4.6,
    actiu: true,
    etiquetes: ["oferta", "gaming"],
    creat_el: new Date()
  },
  {
    nom: "Monitor 24 polzades",
    preu: 129.99,
    categoria: "ofertes",
    estoc: 8,
    valoracio: 4.1,
    actiu: true,
    etiquetes: ["oferta", "oficina"],
    creat_el: new Date()
  }
]);
printjson(resultInsertMany);

// 3.2 READ

printSeparator("READ 3 - Llistar tots els productes");
const totsProductes = db.productes.find({});
totsProductes.forEach(doc => printjson(doc));

printSeparator("READ 4 - Productes amb preu < 50");
const productesMenys50 = db.productes.find({ preu: { $lt: 50 } });
productesMenys50.forEach(doc => printjson(doc));

printSeparator("READ 5 - Productes d'una categoria amb estoc > 0");
const categoria = "electrònica";
const productesCategoriaEstoc = db.productes.find({
  categoria: categoria,
  estoc: { $gt: 0 }
});
productesCategoriaEstoc.forEach(doc => printjson(doc));

printSeparator("READ 6 - Productes valoracio >= 4.0 (nom, preu, valoracio)");
const productesBonaValoracio = db.productes.find(
  { valoracio: { $gte: 4.0 } },
  { nom: 1, preu: 1, valoracio: 1, _id: 0 }
);
productesBonaValoracio.forEach(doc => printjson(doc));

printSeparator("READ 7 - Productes per etiqueta");
const etiqueta = "oferta";
const productesEtiqueta = db.productes.find({ etiquetes: etiqueta });
productesEtiqueta.forEach(doc => printjson(doc));

// 3.3 UPDATE

printSeparator("UPDATE 8 - Actualitzar preu d'un producte");
const resultUpdateOne = db.productes.updateOne(
  { nom: "Auriculars Bluetooth" },   // filtre
  { $set: { preu: 49.99 } }          // canvi
);
printjson(resultUpdateOne);

printSeparator("UPDATE 9 - Augmentar estoc d'una categoria en 10 unitats");
const resultUpdateManyEstoc = db.productes.updateMany(
  { categoria: "ofertes" },
  { $inc: { estoc: 10 } }
);
printjson(resultUpdateManyEstoc);

printSeparator("UPDATE 10 - Afegir nova etiqueta a un producte");
const resultAddTag = db.productes.updateOne(
  { nom: "Teclat Mecànic" },
  { $push: { etiquetes: "nou-model" } }
);
printjson(resultAddTag);

printSeparator("UPDATE 11 - Desactivar productes sense estoc");
const resultDeactivate = db.productes.updateMany(
  { estoc: 0 },
  { $set: { actiu: false } }
);
printjson(resultDeactivate);

// 3.4 DELETE

printSeparator("DELETE 12 - Eliminar un producte pel seu nom");
const resultDeleteOne = db.productes.deleteOne({ nom: "Ratolí Òptic Bàsic" });
printjson(resultDeleteOne);

printSeparator("DELETE 13 - Eliminar tots els productes de categoria 'ofertes'");
const resultDeleteMany = db.productes.deleteMany({ categoria: "ofertes" });
printjson(resultDeleteMany);