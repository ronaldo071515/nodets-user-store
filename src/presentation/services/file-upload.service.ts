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

            //TODO: refactorizar esto
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
        files: UploadedFile[],
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
    ) {

        // llamamos al metodo uploadSingle por cada archivo que viene en el array
        const fileNames = await Promise.all(
            files.map( file => this.uploadSingle(file, folder, validExtensions))//recibimos un array de promesas y retornamos un array de promesas con las respuestas de cada promesa llamando al metodo uploadSingle para subir cada archivo, con el metodo map lo que hacemos es recorrer el array de promesas y llamar al metodo uploadSingle para subir cada archivo
        );

        return fileNames;

    }

}