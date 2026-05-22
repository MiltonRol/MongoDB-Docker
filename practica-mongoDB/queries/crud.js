// Este archivo lo puedes ejecutar desde el mongo shell o MongoDB CLI
// por ejemplo: `mongosh "mongodb://admin:admin123@localhost:27017/botiga" crud.js`

// Seleccionamos la base de datos
db = db.getSiblingDB("botiga");

// Helper para imprimir separadores
function printSeparator(title) {
  print("\n==================== " + title + " ====================\n");
}

// 3.1 CREATE

function createOne(nuevoProducto) {
  
  printSeparator("CREATE 1 - insertOne");
  try {
    db.productes.insertOne(nuevoProducto);
    
    console.log("El producto "+nuevoProducto.nom+" ha sido añadido");
    
  } catch (error) {
    console.log("Hubo un problema al añadir el producto "+nuevoProducto.nom)
  }
}

  const testCreate ={
    nom: "Auriculars Bluetooth",
    preu: 59.99,
    categoria: "electrònica",
    estoc: 15,
    valoracio: 4.3,
    actiu: true,
    etiquetes: ["audio", "oferta"],
    creat_el: new Date()}
    
    createOne(testCreate);
    
    

    

    
  function createMany(arrayJson){
      
  printSeparator("CREATE 2 - insertMany (ofertes)");
  try {
    nuevosProductos = db.productes.insertMany(arrayJson)

    for ( let i = 0 ; i < arrayJson.toArray() ;i++){
      console.log(i.nom)
      
    }
  } catch (error) {
    console.log("Ha habido un error con el producto")
  }
}
/*
let testCreateMany = [
  
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

  createMany(testCreateMany)
]; */


// 3.2 READ


function llistarAll(){
  printSeparator("READ 3 - Llistar tots els productes");
  let totsProductes = db.productes.find({});
  if (totsProductes != null){

    totsProductes.forEach(doc => printjson(doc));
  }else{
    console.log("No hi han productes")
  }
}



function filtroPrecio(min,max){
  printSeparator("READ 4 - Productes amb preu entre"+min+" i "+max+"");
  try {
    
    let productesResult = db.productes.find({ preu: { $lt: max, $and, $gt:min } });
    if(productesResult != null){

      productesResult.forEach(doc => printjson(doc));
    }else{
      console.log("No hi han productes amb aquest rang de preu")
    }
    
  } catch (error) {
    console.log("Error al filtrar por precio")
  }
  
}


function filtreCategoriaEstoc(categoriaProd){
  printSeparator("READ 5 - Productes d'una categoria amb estoc > 0");
  
  try {
    productesResult = db.productes.find(
      {
        categoria: categoriaProd,
        estoc: { $gt: 0 }
      }
    );
    if (productesResult != null){
      productesResult.forEach(doc => printjson(doc));

    }else{
      console.log("No hi han productes d'aquesta categoria")
    }

  } catch (error) {
    console.log("Error al filtar per categoria")
  }
}

/*let categoria = "electrònica";
filtreCategoriaEstoc(categoria);
*/


function filtreValoració(valoracio){
  printSeparator("READ 6 - Productes valoracio >= "+valoracio+" (nom, preu, valoracio)");
  
  try {
    let productesBonaValoracio = db.productes.find(
      { valoracio: { $gte:valoracio } },
      { nom: 1, preu: 1, valoracio: 1 }
    );
    productesBonaValoracio.forEach(doc => printjson(doc));
  
  } catch (error) {
    console.log("Error al filtrar per Valoració")
  }
}

function filtreEtiqueta(etiqueta){
  printSeparator("READ 7 - Productes per etiqueta");
  try {
    let productesEtiqueta = db.productes.find({ etiquetes: etiqueta });
    productesEtiqueta.forEach(doc => printjson(doc));
    
    
  } catch (error) {
    console.log("Error al filtrar per etiqueta")
  }
}
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




