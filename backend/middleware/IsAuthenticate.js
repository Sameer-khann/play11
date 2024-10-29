// src/middlewares/auth.middleware.js
import jwt from 'jsonwebtoken';


export const isAuthenticated = (req, res, next) => {
    
    const token = req.cookies.token;
    // console.log("Request", req);
    console.log("Token: " , token);
    console.log("Cookies " , req.cookies);

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied.' });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token is not valid.' });
        }

        // Save user ID to request object for use in other routes
        req.userId = decoded.id;
        next();
    });
};
