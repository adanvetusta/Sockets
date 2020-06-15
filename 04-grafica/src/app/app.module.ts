import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';

// Sockets
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'environments/environment';
import { GraficaComponent } from './components/grafica/grafica.component';


const config: SocketIoConfig = { url: environment.wsUrl, options: {} };


@NgModule({
  declarations: [
    AppComponent,
    GraficaComponent
  ],
  imports: [
    ChartsModule,
    SocketIoModule.forRoot(config),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
