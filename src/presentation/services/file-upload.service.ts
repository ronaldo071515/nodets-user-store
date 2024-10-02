

export class FileUploadService {

    constructor() {}

    //save images in fyle system
    private checkFolder( folderPath: string ) {
        throw new Error('Not implemented');
    }

    uploadSingle(
        file: any,
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
    ) {

    }

    uploadMultiple(
        file: any[],
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
    ) {

    }

}