import { NextFunction, Request, Response } from 'express';


export class FileUploadMiddleware {

    //Un middleware es una función que se ejecuta antes de que se procesen las solicitudes HTTP. Y recibe la request, response y next como argumentos.
    static containFiles(req: Request, res: Response, next: NextFunction) {

        if(!req.files || Object.keys(req.files).length === 0) {//si no existe o no hay archivos lo mandamos un error
            return res.status(400).json({ error: 'No files were selected' });
        }
        if( !Array.isArray( req.files.file ) ) {//si no es un array, significa que es una imagen unica que viene en objeto y entonces lo mandamos en un array
            req.body.files = [req.files.file];
        } else {//si es un arreglo de imagenes lo guardamos en el body
            req.body.files = req.files.file;
        }
        //si todo sale bien, continuamos y llamamos al siguiente middleware con next()
        next();
    }

}