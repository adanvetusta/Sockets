import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {


  texto: string = '';
  mensajesSubscription: Subscription;

  constructor(public chatService: ChatService) { }

  ngOnInit(): void {
    this.mensajesSubscription = this.chatService.getMessages().subscribe( (message) => {
      console.log(message);
    });
  }

  ngOnDestroy(): void {
    this.mensajesSubscription.unsubscribe();
  }

  enviar() {
    this.chatService.sendMessage(this.texto);
    this.texto = '';
  }

}
