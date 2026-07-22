import { create, find } from './user.js';
import { generateAccessToken } from '../config/jwt.js';
import { UnauthorizedError } from '../errors/unauthorized.js';
import { compare } from 'bcrypt';

export const register = async (data) => {
    const user = await create(data);
    return generateAccessToken({ userId: user._id });
}

export const login = async (data) => {
    const user = await find({ email: data.email });
    if (!await compare(data.password, user.password)) {
        throw new UnauthorizedError("invalid creaddentials");
    }
    return generateAccessToken({ userId: user._id });
}