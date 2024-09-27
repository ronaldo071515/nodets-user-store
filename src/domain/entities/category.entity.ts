

export class CategoryEntity {

    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly available: boolean,
    ) { }

    static fromObject(categories: any[]) {
        return categories.map(category => new CategoryEntity(category.id, category.name, category.available));

    }
}