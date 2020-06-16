export class Marcador {

    // Forma corta de especificar las propiedades de una clase (propio de Typescript)
    constructor(public id: string,
        public nombre: string,
        public lng: number,
        public lat: number,
        public color: string) {
    }
}