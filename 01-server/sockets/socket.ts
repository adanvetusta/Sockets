import { Socket } from 'socket.io';
import socketIO from 'socket.io';

export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado')
    });
}


// Escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    // Este es el manejador del evento
    cliente.on('mensaje', (payload) => {
        io.emit('mensaje-nuevo', payload);
    });
}

// Configurar usuario
export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {
    // Este es el manejador del evento
    cliente.on('configurar-usuario', (payload, callback: Function) => {
        console.log('Configurando usuario', payload.nombre);
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} configurado`
        })
    });
}