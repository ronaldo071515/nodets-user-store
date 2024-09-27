import { CategoryModel } from '../../data';
import { CreateCategoryDto, CustomError, UserEntity, PaginationDto } from '../../domain';
import { CategoryEntity } from '../../domain/entities/category.entity';


export class CategoryService {

    constructor() { }


    async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {

        const existCategory = await CategoryModel.findOne({ name: createCategoryDto.name });
        if (existCategory) throw CustomError.badRequest('Category already exist');

        try {

            const category = new CategoryModel({
                ...createCategoryDto,
                user: user.id
            });

            await category.save();

            return {
                id: category.id,
                name: category.name,
                available: category.available
            }


        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    async getCategories(paginationDto: PaginationDto) {

        const { page, limit } = paginationDto;

        try {
            // const total = await CategoryModel.countDocuments();
            // const categories = await CategoryModel.find()
            //     .skip( (page - 1) * limit)//pagina 1
            //     .limit( limit );

            const [total, categories] = await Promise.all([
                CategoryModel.countDocuments(),
                CategoryModel.find()
                    .skip( (page - 1) * limit)
                    .limit( limit )
            ]);

            if (!categories) throw CustomError.notFound('Categories not found');
            const categoriesEntity = CategoryEntity.fromObject(categories);

            const next = limit * page >= total ? null : `/api/categories?page=${ (page + 1) }&limit=${ limit }`;
            const prev = page - 1 === 0 ? null : `/api/categories?page=${( page -1 )}&limit=${ limit }`;

            return {
                page: page,
                limit: limit,
                total: total,
                next: next,
                prev: prev,
                categories: categoriesEntity
            }

        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }

}