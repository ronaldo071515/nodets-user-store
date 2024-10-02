import { Request, Response } from 'express';
import { CreateCategoryDto, CustomError, PaginationDto } from '../../domain';

export class FileUploadController {

    // DI
    constructor(){}

    private handleError = (error: unknown, res: Response) => {
        if( error instanceof CustomError ) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        // log del error
        return res.status(500).json({error: 'Internal Server Error'});
    }

    uploadFile = (req: Request, res: Response) => {
        console.log(req.files);
        res.json('uploadFile');
    }
    
    uploadMultipleFiles = (req: Request, res: Response) => {
        res.json('uploadMultipleFiles');
    }

}