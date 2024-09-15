import { regularExps } from '../../../config/regular-exp';


export class LoginUserDto {

    constructor(
        public readonly email: string,
        public readonly password: string,
    ){}


    static create(object: {[ keys:string ]: any}): [string?, LoginUserDto?] {

        const { email, password } = object;

        if( !email ) return ['Missing name'];
        if( !regularExps.email.test( email ) ) return ['Email is not valid'];
        if( !password ) return ['Missing password'];
        if( password.length < 6 ) return ['Password to short'];

        return [undefined, new LoginUserDto( email, password )];

    }

}