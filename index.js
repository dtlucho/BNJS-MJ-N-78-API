/*
- API RESTFUL: PELICULAS

http://localhost/api/peliculas

- GET: (/ o /14) Obtener todas o una pelicula puntual
- POST: (/) Recibe y genera una nueva pelicula
- PUT: (/14) Recibe y actualiza una pelicula puntual
- DELETE: (/14) Recibe y borra una pelicula puntual
*/
const express = require("express")
const MongoClient = require("mongodb").MongoClient;

const api = express()

//puerto por default de mongo
const uri = "mongodb://localhost:27017";
const dbName  = "test";
const collectionName = "mongoTest";
const config = {};

const client = MongoClient(uri, config);

const port = 80;
api.listen(port, () => {
	console.log(`server started on port ${port}`)
});

api.use( express.urlencoded({ extended : true }) )
api.use( express.json() )

//Endpoints
api.get("/api/peliculas", function(request, response){

	client.connect(err => {
		if(err) throw err;

    	const db = client.db(dbName);
		const collection = db.collection(collectionName);

		collection.find().toArray((err, result) => {
			if (err) throw err;
	
			client.close();
			response.json( result )
		});
	})
})

api.post("/api/peliculas", function(request, response){

	let obj = request.body

	client.connect(err => {
		if(err) throw err;
	
		const db = client.db(dbName);
		const collection = db.collection(collectionName);
	
		// const obj = { name: "Carlitos", address: "Corrientes 1234" };
		collection.insertOne(obj, (err, result) => {
			if (err) throw err;
	
			client.close();

			response.json("Register created")
		})
	})
})

api.put("/api/peliculas/:id?", function(request, response){

	let elID = request.params.id

	if( !elID ){
		response.json({ rta : "error", message : "ID no especificado" })
	} else {

		let datos = request.body

		peliculas.put(elID, datos, function(error, value){

			let rta = error ? { rta : "error", error } : { rta : "ok", message : "Pelicula actualizada", id : elID}

			response.json( rta )

		})
	}	

})

api.delete("/api/peliculas/:id", function(request, response){
	let elID = request.params.id

	peliculas.delete(elID, function(error){
		response.json({ rta : "error", error })
	})

	response.json({ rta : "ok", message : "Pelicula borrada", id : elID })
})