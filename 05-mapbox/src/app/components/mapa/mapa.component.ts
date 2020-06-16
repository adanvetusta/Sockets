import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Lugar } from 'src/app/interfaces/interfaces';
import { generarColorHexadecimal, idUnico } from 'src/app/utils/utils';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  mapa: mapboxgl.Map;

  lugares: Lugar[] = [{
    id: '1',
    nombre: 'Fernando',
    lng: -75.75512993582937,
    lat: 45.349977429009954,
    color: '#dd8fee'
  },
  {
    id: '2',
    nombre: 'Amy',
    lng: -75.75195645527508,
    lat: 45.351584045823756,
    color: '#790af0'
  },
  {
    id: '3',
    nombre: 'Orlando',
    lng: -75.75900589557777,
    lat: 45.34794635758547,
    color: '#19884b'
  }];

  constructor() { }

  ngOnInit(): void {
    this.crearMapa();
  }

  crearMapa() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbnZldHVzdGEiLCJhIjoiY2tiZ3R0aml4MTh0ejMxcDhlZzZpd25maiJ9.V1mwfJitXF25Ps2qbrfz7Q';

    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-75.75512993582937, 45.349977429009954],
      zoom: 15.8
    });
    for (const marcador of this.lugares) {
      this.agregarMarcador(marcador);
    }
  }

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
      console.log(lngLat);

      // TO DO: crear evento para emitir las coordenadas de este marcador
    });

    btnBorrar.addEventListener('click', () => {
      marker.remove();

      // TO DO: eliminar el marcador mediante sockets
    });
  }

  crearMarcador() {
    const customMarker: Lugar = {
      id: idUnico(),
      lng: -75.75512993582937,
      lat: 45.349977429009954,
      nombre: 'Sin nombre',
      color: generarColorHexadecimal()
    };
    this.agregarMarcador(customMarker);
  }
}
