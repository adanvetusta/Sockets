import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario: Usuario;

  /**
   * Sólo con declarar el Socket se establece la conexión
   * @param socket
   */
  constructor(private socket: Socket) {
    this.checkStatus();
  }

  /**
   * this.socket.on.... Son observables
   */
  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });
    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }

  emit(evento: string, payload?: any, callback?: Function) {
    // emit('evento', contenido a enviar, callback?)
    this.socket.emit(evento, payload, callback);
  }

  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }

  loginWs(nombre: string) {
    console.log('Configurando', nombre);
    this.emit('configurar-usuario', {nombre}, res => {
      console.log(res);
    });
  }
}
