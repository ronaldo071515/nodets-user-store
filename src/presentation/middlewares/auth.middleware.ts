import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config';
import { UserModel } from '../../data';
import { UserEntity } from '../../domain';


export class AuthMiddleware {

    // DI
    constructor(){}

    static async validateJWT(req: Request, res: Response, next: NextFunction) {

        const authorization = req.header('Authorization');
        if( !authorization ) return res.status(401).json({ error: 'No token provider' });
        if( !authorization.startsWith('Bearer ') ) return res.status(401).json({ error: 'Invalid Bearer Token' });

        const token = authorization.split(' ').at(1) || '';

        try {
            
            const payload = await JwtAdapter.validateToken<{id: string}>(token);
            if(!payload) return res.status(401).json({ error: 'Invalid Token' });

            const user = await UserModel.findById( payload.id );
            if( !user ) return res.status(401).json({ error: 'Invalid Token - user' });
            
            //TODO: validar si el usuario está activo isActive

            req.body.user = UserEntity.fromObject(user);//siempre vamos a tener en el body el user

            next();

        } catch (error) {
            console.log(error);
            res.status(500).json({error: 'Internal server error'})
        }


    }

}