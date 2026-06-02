// docker exec -it mongodb-botiga mongosh -u admin -p pass --authenticationDatabase admin --file /queries/advanced.js

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
    try {
        let productes = db.productes.find({$or: [
            {categoria: categoria},
            {valoracio: {$gte:valoracio}}
        ]})
        
        productes.forEach(prod => printjson(prod));
    } catch (error) {
        console.log("Error: "+error.message+"\n- No s'han trobat productes")
    }
}
//cercarPerCategoria("Electronica",4.5)

function cercarPerParaulaClau(text){
    printSeparator("Consultes Avançades 3.")
    
    /*
    $options: "im"   // insensible + multilínea
    $options: "is"   // insensible + punto salta líneas
    $options: "imu"  // insensible + multilínea + unicode
    $options: "x"    // Ignora espacios y permite # comentarios en la regex
    */
    let productes = db.productes.find({nom: {$regex: text,
                                            $options: "i"}})
                                            

    productes.forEach(produc => printjson(produc))
}
//cercarPerParaulaClau("ofer");


function ordrePreuDes(limit){
    try {
        printSeparator("Consultes Avançades 4.")

        let productes = db.productes.find({})
        .sort({preu: -1}) // El "-1" es para buscar en orden descendente, precio de mayor a menor
        .limit(limit);
        // sort y limit son funciones igual que find o insertMany/One

        productes.forEach(product => printjson(product));
        
    } catch (error) {
        console.log("Error: "+error.message+"\n- No s'ha pogut cercar productes");
    }

}

//ordrePreuDes(5);

function totalProductesCategoria(categoria){
    printSeparator("Consultes Avançades 5.")
    try {

        if (categoria){
            let productes = db.productes.find({categoria: {$regex:categoria, $options:"i"} })
            let total = productes.size()
            console.log("Hay "+total+" de productos en la categoria "+categoria)
        }else{
            let productes = db.productes.aggregate([
                {
                $group:{
                        _id: "$categoria",
                        total: {$sum: 1}
                    }
                }
            ])
            
            productes.forEach(p => printjson("Categoria: "+p._id +"\nTotal Productes: "+p.total))
        }
    } catch (error) {
        console.log("Error: "+error.message+"\n- No s'han trobat productes")
    }

}
//totalProductesCategoria()
//totalProductesCategoria("electrònica")


function preuMig(categoria){
    printSeparator("Consultes Avançades 6.")
    try {

        if (categoria){
            let productes = db.productes.aggregate([

                {$match: {categoria: { $regex: categoria, $options: "i" }}},
                {$group: {_id: "$categoria",preuMig: { $avg: "$preu" }}}
            
            ])
            productes.forEach(p => printjson(p))
        }else{
            let productes = db.productes.aggregate([
                {
                $group:{
                        _id: "$categoria",
                        preuMig: {$avg: "$preu"}
                    }
                }
            ])
            
            productes.forEach(p => printjson(p))
        }
    } catch (error) {
        console.log("Error: "+error.message+"\n- No s'han trobat productes")
    }
}

//preuMig()
//preuMig("Electrònica")

function facturacionCliente(){
    printSeparator("Consultes Avançades 6.")
    try{
        let facturacion = db.comandes.aggregate([
        {$group: {_id: "$client_id",total_gastat: {$sum: "$total"}}}]);
        facturacion.forEach(comanda => printjson(comanda))
    }catch (error){
        console.log("Error: "+error.message+"\n- No s'han trobat comandes")
    }
}
//facturacionCliente()


function getIndexByName(nameIdx){
    try {
        if (nameIdx){
            let index = db.productes.getIndexes().find(
                idx => idx.name === nameIdx)
            printjson(index)
        }else{
            let index = db.productes.getIndexes()
            index.forEach(i => printjson(i))
        }
    } catch (error) {
        console.log("\nError: "+error.message+"\n-No se ha podido encontrar el indice")
    }
}


//db.productes.createIndex({ categoria: 1 },{name: "IDX_categoria"})
//getIndexByName("IDX_categoria")


//db.productes.createIndex({ categoria: 1, preu: 1 },{name: "IDX_categoria_preu"})
//getIndexByName("IDX_categoria_preu")


//db.productes.createIndex({ nom: "text" },{name: "IDX_nom"})
//getIndexByName("IDX_nom")


//getIndexByName()

/*
let producto;


db.productes.createIndex({categoria: 1},{name :"IDX_categoria"})
producto = db.productes.find({categoria: "electrònica"}).explain("executionStats")
printjson(producto)




db.productes.dropIndex("IDX_categoria")
producto = db.productes.find({categoria: "electrònica"}).explain("executionStats")
printjson(producto)
*/










