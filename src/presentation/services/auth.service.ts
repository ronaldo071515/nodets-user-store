import { bcryptAdapter, JwtAdapter } from '../../config';
import { UserModel } from '../../data';
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from '../../domain';

//todo lo relacionado CRUD
export class AuthService {

    // DI
    constructor() { }

    public async registerUser(registerUserDto: RegisterUserDto) {

        const existUser = await UserModel.findOne({ email: registerUserDto.email });
        if (existUser) throw CustomError.badRequest('Email already exist');

        try {

            const user = new UserModel(registerUserDto);

            // encriptar la contraseña
            user.password = bcryptAdapter.hash(registerUserDto.password);

            await user.save();

            //TODO: encriptar la contraseña, JWT <-- para auth del user, email de confirmación
            const { password, ...userEntity } = UserEntity.fromObject(user);
            
            //generar token
            const token = await JwtAdapter.generateToken({ id: userEntity.id });
            if(!token) throw CustomError.internalServer('Error while creating JWT');

            return {
                user: { ...userEntity },
                token: token
            };

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

    public async loginUser(loginUserDto: LoginUserDto) {

        const user = await UserModel.findOne({ email: loginUserDto.email });
        if (!user) throw CustomError.notFound('Email not exist');

        const isMatching = bcryptAdapter.compare(loginUserDto.password, user.password);

        if (!isMatching) throw CustomError.badRequest('Password is not valid');

        const { password, ...userEntity } = UserEntity.fromObject(user);

        const token = await JwtAdapter.generateToken({ id: user.id, email: user.email });

        if(!token) throw CustomError.internalServer('Error while creating JWT');

        return {
            user: userEntity,
            token: token
        };

    }

}