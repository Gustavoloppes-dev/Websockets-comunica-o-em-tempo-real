import { atualizaDocumento, encontrarDocumento } from "./documentosDb.js";
import io from "./servidor.js";

io.on("connection", (socket) => {
    console.log("Cliente se conectou! ID:", socket.id);

    socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) => {
        socket.join(nomeDocumento)
        // console.log(nomeDocumento);
        const documento = await encontrarDocumento(nomeDocumento);
        // console.log(documento);

        if(documento) {
            // socket.emit("texto_documento", documento.texto);

            devolverTexto(documento.texto)
        }
    })

    // socket.on("texto_editor", (texto, nomeDocumento) => {
    //     // socket.broadcast.emit("texto_editor_clientes", texto);

    //     socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
    // });

    socket.on("texto_editor", async ({texto, nomeDocumento}) => {
        // socket.broadcast.emit("texto_editor_clientes", texto);
        const atualizacao = await atualizaDocumento(nomeDocumento, texto);
        console.log(atualizacao);

        if(atualizacao.modifiedCount) {
            socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
        }
    });
});

