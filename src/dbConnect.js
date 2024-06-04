import { MongoClient } from "mongodb";

const cliente = new MongoClient("mongodb+srv://gustavoloppesdev:C9Amd7aCPIXasvsr@cursowebsockets.vxbag8d.mongodb.net/?retryWrites=true&w=majority&appName=cursoWebsockets");

let documentosColecao;

try {
   await cliente.connect();
   
   const db = cliente.db("curso-websockets");
   documentosColecao = db.collection("documentos");

   console.log("Conectado ao banco de dados com sucesso!");
} catch (erro) {
    console.log(erro);
}

export { documentosColecao };