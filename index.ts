import express  from "express";
import path from "path";
import adminRoute from "./routes/admin/index.route" 
import clientRoute from "./routes/client/index.route" 

const app = express();
const port = 3000;

// Thiết lập thư mục view và view engine pug
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug"); // Thiết lập Pug làm view engine

// Thiết lập thư mục chứa file tĩnh
app.use(express.static(path.join(__dirname, "public")));


app.use("/" , clientRoute) ;
app.use("/admin" , adminRoute)


app.listen(port, () => {
  console.log(`Website đang chạy trên cổng ${port}`);
});
