import express, { Request, Response, NextFunction } from "express";
import productsroutes from "./routes/productRouter";
import { error } from "console";
import categoriesroute from "./routes/categoriesroute";
// import orderroutes from "./routes/orderroutes";
import userroute from "./routes/usersroute";
const app = express();

app.use(express.json());
// const lock = "ram";
// app.get(
//   "/",
//   (req: Request, res: Response, next: NextFunction) => {
//     const lock = req.query.name;

//     if (lock === "ram") {
//       next();
//     } else {
//       res.send("Access Denied");
//     }
//   },
//   (req: Request, res: Response) => {
//     res.send("Hello World!");
//   }
// );
// app.use((error: any, req: Request, res: Response, next: NextFunction) => {
//   console.error(error);
//   res.status(500).send("Internal Server Error");
// });
app.use("/products", productsroutes);
app.use("/categories", categoriesroute);
app.use("/users", userroute);
// app.use("/orders", orderroutes);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log("Error Received", error);
  if (error.status === 404 || error.status === 400 || error.status === 403) {
    res.status(error.status).json({ error });
    return;
  }
  res.status(500).json({ error: "Internal Server Error" });
});
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
