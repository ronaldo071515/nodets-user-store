

export class PaginationDto {

    //siempre colocamos el constructor privado
    private constructor(
        public readonly page: number,
        public readonly limit: number
    ){}

}