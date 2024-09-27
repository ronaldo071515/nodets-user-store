import { CategoryModel } from '../../data';
import { CreateCategoryDto, CustomError, UserEntity } from '../../domain';
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

    async getCategories() {

        try {
            const categories = await CategoryModel.find();
            if (!categories) throw CustomError.notFound('Categories not found');

            const categoriesEntity = CategoryEntity.fromObject(categories);

            return categoriesEntity

        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }

}