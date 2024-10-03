import path from 'path';
import fs from 'fs';
import { UploadedFile } from 'express-fileupload';
import { Uuid } from '../../config';
import { CustomError } from '../../domain';


export class FileUploadService {

    constructor(
        private readonly uuid = Uuid.v4
    ) { }

    //save images in fyle system
    private checkFolder(folderPath: string) {//método para verificar si la carpeta existe
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
    }

    async uploadSingle(
        file: UploadedFile,
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
    ) {
        try {
            const fileExtension = file.mimetype.split('/').at(1) ?? '';

            if(!validExtensions.includes(fileExtension)) {
                throw CustomError.badRequest(`Invalid file extension: ${ fileExtension }, valid ones: ${ validExtensions }`);
            }

            const destination = path.resolve(__dirname, '../../../', folder);
            this.checkFolder(destination);

            const fileName = `${ this.uuid() }.${ fileExtension }`;

            file.mv(`${ destination }/${ fileName }`);

            return { fileName };

        } catch (error) {
            throw error;
            // console.log(error);
        }
    }

    async uploadMultiple(
        file: any[],
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
    ) {

    }

}