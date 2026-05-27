load('/queries/crud.js');

// Bloc 04 de practica Mongo DB en (Docker Consultes avançades)


const db = db.getSiblingDB("botiga");

function cercarPerPreu (minPreu,maxPreu){
    printSeparator("Consultes Avançades 1.")
    productes = db.productes.find({$and:[
                                        {preu: {$gt: minPreu}},
                                        {preu: {$lt: maxPreu}},
                                        {estoc : {$gt: 0}}]});
    productes.forEach(prod => printjson(prod));
}

///cercarPerPreu(20,100)

function cercarPerCategoria(categoria, valoracio){
    printSeparator("Consultes Avançades 2.")
    let productes = db.productes.find({$or: [
        {categoria: categoria},
        {valoracio: {$gte:valoracio}}
    ]})
    productes.forEach(prod => printjson(prod));
}
//cercarPerCategoria("Electronica",4.5)

function cercarPerParaulaClau(text){
    printSeparator("Consultes Avançades 3.")

    let productes = db.productes.find({nom: {$regex: text,
                                            $options: "i"}})

    productes.forEach(produc => printjson(produc))
}
//cercarPerParaulaClau("ofer");

function ordrePreuDes(limit){
    let productes = db.productes.find({})
}










