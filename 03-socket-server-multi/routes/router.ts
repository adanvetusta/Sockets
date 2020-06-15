import { Router, Request, Response} from 'express';
import Server from '../clases/server';
import { usuariosConectados } from '../sockets/socket';
import { GraficaData } from '../clases/grafica';

export const router = Router();
const grafica = new GraficaData();

router.get('/grafica', (req: Request, res: Response) => {
    res.json(grafica.getDataGrafica());
});

router.post('/grafica', (req: Request, res: Response) => {

    const mes = req.body.mes;
    const unidades = req.body.unidades;

    //const server = Server.instance;
    //server.io.emit('mensaje-nuevo', payload);
    grafica.incrementarValor(mes, Number(unidades));

    res.json(grafica.getDataGrafica());
});

router.post('/mensajes/:id', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const server = Server.instance;

    const payload = {
        de,
        cuerpo
    }

    server.io.in(id).emit('mensaje-privado', payload);


    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});


/**
 * Obtener usuarios con sus ids
 */
router.get('/usuarios', (req: Request, res: Response) => {
    const server = Server.instance;

    server.io.clients( (err: any, clientes: string[]) => {
        if(err) {
            return res.json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            clientes
        })
    })
});


/**
 * Obtener usuarios y sus nombres
 */
router.get('/usuarios/detalle', (req: Request, res: Response) => {
    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    });
});

export default router;