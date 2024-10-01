import { ProductModel } from '../../data';
import { CustomError, PaginationDto, CreateProductDto } from '../../domain';


export class ProductService {

    constructor() { }


    async createProduct(createProductDto: CreateProductDto) {

        const productExist = await ProductModel.findOne({ name: createProductDto.name });
        if (productExist) throw CustomError.badRequest('Product already exist');

        try {

            const product = new ProductModel(createProductDto);

            await product.save();

            return product;


        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    async getProducts(paginationDto: PaginationDto) {

        const { page, limit } = paginationDto;

        try {

            const [total, products] = await Promise.all([
                ProductModel.countDocuments(),
                ProductModel.find()
                    .skip( (page - 1) * limit)
                    .limit( limit )
                    .populate('user')
                    .populate('category')
            ]);

            if (!products) throw CustomError.notFound('Products not found');

            const next = limit * page >= total ? null : `/api/products?page=${ (page + 1) }&limit=${ limit }`;
            const prev = page - 1 === 0 ? null : `/api/products?page=${( page -1 )}&limit=${ limit }`;

            return {
                page: page,
                limit: limit,
                total: total,
                next: next,
                prev: prev,
                products: products
            }

        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }

}