import jwt from "jsonwebtoken"

const generateToken = (res, userId) => {

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    //set JWT as http-only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV !== 'development',
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: '/',
        sameSite: 'None'
    });
    return token;
}

export default generateToken