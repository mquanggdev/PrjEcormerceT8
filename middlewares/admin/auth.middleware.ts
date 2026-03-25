import { NextFunction, Request, Response } from "express";
import { pathAdmin } from "../../configs/variable.config";
import jwt from "jsonwebtoken";
import AccountAdmin from "../../models/account-admin.model";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.tokenAdmin;

    if(!token) {
      res.redirect(`/${pathAdmin}/account/login`);
      return;
    }

    // Giải mã token
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as jwt.JwtPayload;
    
    if(decoded.id === process.env.SUPER_ADMIN_ID && decoded.email === process.env.SUPER_ADMIN_EMAIL) {
      res.locals.accountAdmin = {
        fullName: "SuperAdmin",
        email: process.env.SUPER_ADMIN_EMAIL,
        avatar: "/admin/assets/images/users/avatar-1.jpg",
        isSuperAdmin: true
      };
    } else {
    const existAccount = await AccountAdmin.findOne({
      _id: decoded.id,
      email: decoded.email,
      deleted: false,
      status: "active"
    })

    if(!existAccount) {
      res.redirect(`/${pathAdmin}/account/login`);
      return;
    }

    res.locals.accountAdmin = {
      fullName: existAccount.fullName,
      email: existAccount.email,
      avatar: existAccount.avatar,
      isSuperAdmin: false
    };
    }

    next();
  } catch (error) {
    console.log(error);
    res.redirect(`/${pathAdmin}/account/login`);
  }
}
