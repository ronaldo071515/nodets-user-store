import { Request, Response } from 'express';
import { CustomError, PaginationDto, CreateProductDto } from '../../domain';
import { ProductService } from '../services';

export class ProductController {

    // DI
    constructor(
        private readonly productService: ProductService
    ){}

    private handleError = (error: unknown, res: Response) => {
        if( error instanceof CustomError ) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        // log del error
        return res.status(500).json({error: 'Internal Server Error'});
    }

    createProduct = (req: Request, res: Response) => {
        const [ error, createProductDto ] = CreateProductDto.create({ 
            ...req.body,
            user: req.body.user.id,
          });
        if( error ) return res.status(400).json({error});
        
        this.productService.createProduct(createProductDto!)
            .then(product => res.status(201).json( product ))
            .catch(error => this.handleError(error, res));
    }
    
    getProducts = (req: Request, res: Response) => {

        const { page = 1, limit = 10 } = req.query;
        const [error, paginationDto] = PaginationDto.create(+page, +limit);
        if( error ) return res.status(400).json({error});

        this.productService.getProducts(paginationDto!)
            .then(products => res.status(200).json( products ))
            .catch(error => this.handleError(error, res));

    }

}