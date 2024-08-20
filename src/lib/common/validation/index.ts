import type { ShapeValidator } from '../types';
import { UserLoginValidator, UserRegisterValidator } from './user';

export const CommonValidators = {
	UserRegister: UserRegisterValidator,
	UserLogin: UserLoginValidator
} satisfies Record<string, ShapeValidator<string, any>>;
