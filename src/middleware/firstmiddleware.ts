// import { Request, Response, NextFunction } from "express";

// export const firstMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
// const lock = req.query.name;

//     if (lock === "ram") {
//         next();
//     } else {
//         next({
//             message: "you are not Ram",
//             status: 403,
//         });
//     }
// };
