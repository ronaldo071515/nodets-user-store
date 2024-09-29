import { Validators } from '../../../config';


export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string, // ID
    public readonly category: string // ID
  ) {}

  static create(obj: { [key: string]: any }): [string?, CreateProductDto?] {
   
    const { name, available, price, description, user, category } = obj;

    if (!name) return ["Missing name"];

    if (!user) return ["Missing user"];
    if( !Validators.isMongoId( user ) ) return ["Invalid user ID"];

    if (!category) return ["Missing category"];
    if( !Validators.isMongoId( category) ) return ["Invalid category ID"];

    return [ undefined, new CreateProductDto( 
        name,
        !!available, // doble negacion => available: string = "true" => true,  available: boolean = false => false. Mirar la implementacion del categoryDto para ver implementacion mas robusta
        price,
        description,
        user,
        category,
      )];
  }
}