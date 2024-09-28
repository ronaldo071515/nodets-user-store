
export class CreateProductDto {
    //recomendación seguir el estandar que hemos desarrollado en cuanto a nombres de parametos
    private constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: number,
        public readonly description: string,
        public readonly user: string, //ID del usuario
        public readonly category: string, // ID de la categoria
    ){}

    static create( props: {[key: string]: any} ): [string?, CreateProductDto?] {

        const {name, available, price, description, user, category,} = props;

        if(!name) return ['Missing name'];
        if(!user) return ['Missing user'];
        if(!category) return ['Missing category'];

        /*en el available si viene un valor lo ponermos true, si viene false no pasa nada**/
        return [undefined, new CreateProductDto(name, !!available, price, description, user, category,)]
    
    }
}