export interface Lugar {
    id: string;
    nombre: string;
    lng: number;
    lat: number;
    color: string;
}

export interface RespMarcadores {
    [key: string]: Lugar;
}