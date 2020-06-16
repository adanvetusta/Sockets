import { Router, Request, Response} from 'express';
import Server from '../clases/server';
import { usuariosConectados } from '../sockets/socket';
import { GraficaData } from '../clases/grafica';
import { Mapa } from '../clases/mapa';

export const router = Router();

/**
 =========================================== GRÁFICAS ===========================================
 */
const grafica = new GraficaData();

router.get('/grafica', (req: Request, res: Response) => {
    res.json(grafica.getDataGrafica());
});

router.post('/grafica', (req: Request, res: Response) => {

    const mes = req.body.mes;
    const unidades = req.body.unidades;

    grafica.incrementarValor(mes, Number(unidades));

    const server = Server.instance;
    server.io.emit('cambio-grafica', grafica.getDataGrafica());

    res.json(grafica.getDataGrafica());
});



/**
 =========================================== MAPA ===========================================
 */
const mapa = new Mapa();

router.get('/mapa', (req: Request, res: Response) => {
    res.json(mapa.getMarcadores());
});



export default router;