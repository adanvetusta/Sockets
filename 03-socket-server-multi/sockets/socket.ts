import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../clases/usuarios-lista';
import { Usuario } from '../clases/usuario';
import { Mapa } from '../clases/mapa';
import { Marcador } from '../clases/marcador';

export const usuariosConectados = new UsuariosLista();
export const mapa = new Mapa();


export const mapaSockets = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('marcador-nuevo', (marcador: Marcador) => {
        mapa.agregarMarcador(marcador);
        // Broadcast --> Se excluye a sí mismo
        cliente.broadcast.emit('marcador-nuevo', marcador);
    });
    cliente.on('marcador-borrar', (id: string) => {
        mapa.borrarMarcador(id);
        cliente.broadcast.emit('marcador-borrar', id);
    });
    cliente.on('marcador-mover', (marcador: Marcador) => {
        mapa.moverMarcador(marcador);
        cliente.broadcast.emit('marcador-mover', marcador);
    });
}

export const desconectar = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('disconnect', () => {
        usuariosConectados.borrarUsuarios(cliente.id);
        io.emit('usuarios-activos', usuariosConectados.getLista());
    });
}

export const conectarCliente = (cliente: Socket, io: SocketIO.Server) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
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
        
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

        io.emit('usuarios-activos', usuariosConectados.getLista());

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} configurado`
        })
    });
}

// Obtener usuarios
export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('obtener-usuarios', () => {
        // Con el to, emitimos a un usuario específico
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
    });
}