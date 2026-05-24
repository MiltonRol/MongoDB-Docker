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
    nom: "Auriculars Bluetooth 3",
    preu: 59.99,
    categoria: "electrònica",
    estoc: 15,
    valoracio: 4.3,
    actiu: true,
    etiquetes: ["audio", "oferta"],
    creat_el: new Date()}
    
//createOne(testCreate);
    
    

    

    
function createMany(arrayJson) {
  printSeparator("CREATE 2 - insertMany (ofertes)");
  try {
    let insert = db.productes.insertMany(arrayJson);
    
    try {
  
      for (let i = 0; i < arrayJson.length; i++) {
        console.log(arrayJson[i].nom);
      }
  
    } catch (error) {
      console.log("Ha habido un error al obtener el nombre del producto:", error.message);
    }

    return insert;
  } catch (error) {
    console.log("Ha habido un error con la inserción:", error.message);
  }
}


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
];
//createMany(testCreateMany)


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

//llistarAll()

function filtroPrecio(min,max){
  printSeparator("READ 4 - Productes amb preu entre"+min+" i "+max+"");
  try {
    let productesResult = db.productes.find({ preu: { $lt: max, $gt:min } });
    if(productesResult != null){

      productesResult.forEach(doc => printjson(doc));
    }else{
      console.log("No hi han productes amb aquest rang de preu")
    }
  } catch (error) {
    console.log("Error al filtrar por precio")
  }
}
//filtroPrecio(10,50)

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

let categoria = "electrònica";
//filtreCategoriaEstoc(categoria);



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
//filtreValoració(4)


function filtreEtiqueta(etiqueta){
  printSeparator("READ 7 - Productes per etiqueta");
  try {
    let productesEtiqueta = db.productes.find({ etiquetes: etiqueta });
    productesEtiqueta.forEach(doc => printjson(doc));
  } catch (error) {
    console.log("Error al filtrar per etiqueta")
  }
}
let etiqueta = "esport"
//filtreEtiqueta(etiqueta)

// 3.3 UPDATE


function updatePriceByName(nomProducte,preu){
  printSeparator("UPDATE 8 - Actualitzar preu d'un producte");
  db.productes.updateOne({nom : nomProducte},{$set:{preu}})
  let resul = db.productes.find({nom: nomProducte, preu: preu})
  print(resul)
}
//updatePriceByName("Samarreta Esportiva",1234)


function addEstocByCategoria(categoria,estoc){
  printSeparator("UPDATE 9 - Augmentar estoc d'una categoria en 10 unitats");
  
  let resultUpdateManyEstoc = db.productes.updateMany(
    { categoria: categoria },
    { $inc: { estoc: estoc } }
  );
  printjson(resultUpdateManyEstoc);
}
//addEstocByCategoria("roba",10)


function afegirEtiqueta(nomProducte,etiqueta){
  printSeparator("UPDATE 10 - Afegir nova etiqueta a un producte");
  
  try {
    db.productes.updateOne(
      { nom: nomProducte },
      { $push: { etiquetes: etiqueta } }
    );
  } catch (error) {
    console.log(error.message)
  }
  let resultAddTag =  db.productes.find({etiquetes: etiqueta})
  printjson(resultAddTag);
}
//afegirEtiqueta("Pantalons de Xandall","Test New Etiqueta");


function cleanStock(){
  printSeparator("UPDATE 11 - Desactivar productes sense estoc");
  let resultClean = db.productes.updateMany(
    { estoc: 0 },
    { $set: { actiu: false } }
  );
  printjson(resultClean);
}//cleanStock()


// 3.4 DELETE

function deleteByName(nomProducte){
  printSeparator("DELETE 12 - Eliminar un producte pel seu nom");
  let resultDelete = db.productes.deleteOne({ nom: nomProducte });
  printjson(resultDelete);
  
}
//deleteByName("Auriculars Bluetooth 3")


function deleteByCategory(categoria){
  printSeparator("DELETE 13 - Eliminar tots els productes de categoria 'ofertes'");
  
  try {
    let resultDelete = db.productes.deleteMany({ categoria: categoria });
    printjson(resultDelete);
    
  } catch (error) {
  console.log("Error al eliminar els productes de la categoria: "+categoria)
  }
}

//deleteByCategory("")



