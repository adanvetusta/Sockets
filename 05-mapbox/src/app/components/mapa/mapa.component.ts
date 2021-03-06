import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Lugar, RespMarcadores } from 'src/app/interfaces/interfaces';
import { generarColorHexadecimal, idUnico } from 'src/app/utils/utils';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../services/websocket.service';



@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  mapa: mapboxgl.Map;

  lugares: RespMarcadores = {};

  markersMapbox: { [id: string]: mapboxgl.Marker } = {};

  constructor(private http: HttpClient, private wsService: WebsocketService) { }

  ngOnInit(): void {

    this.http.get('http://localhost:5000/mapa').subscribe((lugares: RespMarcadores) => {
      console.log('Lugares', lugares);
      this.lugares = lugares;
      this.crearMapa();
    });
    this.escucharSockets();
  }

  crearMapa() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbnZldHVzdGEiLCJhIjoiY2tiZ3R0aml4MTh0ejMxcDhlZzZpd25maiJ9.V1mwfJitXF25Ps2qbrfz7Q';

    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-75.75512993582937, 45.349977429009954],
      zoom: 15.8
    });
    for (const [key, marcador] of Object.entries(this.lugares)) {
      this.agregarMarcador(marcador);
    }
  }

  escucharSockets() {
    //marcador-nuevo
    this.wsService.listen('marcador-nuevo').subscribe((marcador: Lugar) => {
      console.log('Socket', marcador);
      this.agregarMarcador(marcador);
    });

    //marcador-borrar
    this.wsService.listen('marcador-borrar').subscribe((id: string) => {
      this.markersMapbox[id].remove();
      // Eliminamos referencia en memoria
      delete this.markersMapbox[id];
    });

    //marcador-mover
    this.wsService.listen('marcador-mover').subscribe((marcador: Lugar) => {
      this.markersMapbox[marcador.id].setLngLat([marcador.lng, marcador.lat]);
    });
  }


  /**
   * Recibe un marcador y lo coloca en el mapa
   * @param marcador
   */
  agregarMarcador(marcador: Lugar) {

    const h2 = document.createElement('h2');
    h2.innerText = marcador.nombre;

    const btnBorrar = document.createElement('button');
    btnBorrar.innerText = 'Borrar';

    const div = document.createElement('div');
    div.append(h2, btnBorrar);



    const customPoup = new mapboxgl.Popup({
      offset: 25,
      closeOnClick: false
    }).setDOMContent(div);

    const marker = new mapboxgl.Marker({
      draggable: true,
      color: marcador.color,
      style: 'mapbox://styles/mapbox/streets-v11'
    })
    .setPopup(customPoup)
    .setLngLat([marcador.lng, marcador.lat])
    .addTo(this.mapa);


    marker.on('drag', () => {
      const lngLat = marker.getLngLat();
      const nuevoMarcador = {
        id: marcador.id,
        ...lngLat
      };
      this.wsService.emit('marcador-mover', nuevoMarcador);
    });

    btnBorrar.addEventListener('click', () => {
      marker.remove();
      this.wsService.emit('marcador-borrar', marcador.id);
    });

    this.markersMapbox[marcador.id] = marker;
    console.log('markersMapbox', this.markersMapbox);
  }

  /**
   * Creación de un marcador nuevo
   */
  crearMarcador() {
    const customMarker: Lugar = {
      id: idUnico(),
      lng: -75.75512993582937,
      lat: 45.349977429009954,
      nombre: 'Sin nombre',
      color: generarColorHexadecimal()
    };
    this.agregarMarcador(customMarker);

    // emitir marcador nuevo
    this.wsService.emit('marcador-nuevo', customMarker);
  }
}