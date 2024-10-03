import { Request, Response } from 'express';
import { CustomError } from '../../domain';
import { FileUploadService } from '../services/file-upload.service';
import { UploadedFile } from 'express-fileupload';

export class FileUploadController {

    // DI
    constructor(
        private readonly fileUploadService: FileUploadService
    ){}

    private handleError = (error: unknown, res: Response) => {
        if( error instanceof CustomError ) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        // log del error
        return res.status(500).json({error: 'Internal Server Error'});
    }

    uploadFile = (req: Request, res: Response) => {

        const type = req.params.type;
        const validTypes = ['users', 'categories', 'products'];

        if(!validTypes.includes(type)) {
            return res.status(400).json({error: `Ìnvalid type ${type}, valid ones are ${validTypes}`});
        }

        if(!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: 'No files were selected' });
        }

        const file = req.files.file as UploadedFile;

        this.fileUploadService.uploadSingle( file, `uploads/${ type }` )
            .then( uploaded => res.json(uploaded) )
            .catch(error => this.handleError(error, res));

    }
    
    uploadMultipleFiles = (req: Request, res: Response) => {
        res.json('uploadMultipleFiles');
    }

}