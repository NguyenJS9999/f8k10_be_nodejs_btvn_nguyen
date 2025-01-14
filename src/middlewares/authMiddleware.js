// Middleware này sẽ kiểm tra Access Token trong các route yêu cầu xác thực.

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({});
const { SECRET_KEY } = process.env;

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

    if (!token) {
        return res
            .status(401)
            .json({ message: "Không có token, vui lòng đăng nhập!" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res
            .status(403)
            .json({ message: "Token không hợp lệ hoặc đã hết hạn!" });
    }
};
