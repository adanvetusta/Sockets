import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;

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
      this.socketStatus = true;
    });
    this.socket.on('disconnect', () => {
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
  
}
