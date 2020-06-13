import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'basico';

  constructor(public wsService: WebsocketService, public chatService: ChatService) {

  }

  ngOnInit() {
    // Se hace en el appComponent porque está corriendo todo el tiempo
    this.chatService.getMessagesPrivate().subscribe( msg => console.log(msg));

  }
}
