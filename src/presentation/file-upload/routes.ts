import { Router } from 'express';
import { FileUploadController } from './controller';
import { FileUploadService } from '../services/file-upload.service';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';
import { TypeMiddleware } from '../middlewares/type.middleware';



export class FileUploadRoutes {

    static get routes(): Router {

        const router = Router();

        const controller = new FileUploadController(
            new FileUploadService()
        );

        router.use( FileUploadMiddleware.containFiles );// middleware para subir archivos se ejecuta para todas las rutas que empiecen con /api/upload
        router.use( TypeMiddleware.validTypes(['users', 'categories', 'products']) );

        // Definir las rutas
        // api/upload/single/<user|category|product>/
        // api/upload/multiple/<user|category|product>/
        router.post('/single/:type', controller.uploadFile);
        router.post('/multiple/:type', controller.uploadMultipleFiles);

        return router;
    }


}
