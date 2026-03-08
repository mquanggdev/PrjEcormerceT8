import express  from "express";
import path from "path";
import adminRoutes from "./routes/admin/index.route" 
import clientRoutes from "./routes/client/index.route"
import { pathAdmin } from "./configs/variable.config"; 

const app = express();
const port = 3000;

// Thiết lập thư mục view và view engine pug
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug"); // Thiết lập Pug làm view engine

// Thiết lập thư mục chứa file tĩnh
app.use(express.static(path.join(__dirname, "public")));

// Tạo biến toàn cục trong file PUG
app.locals.pathAdmin = pathAdmin ;

app.use("/" , clientRoutes) ;
app.use(`/${pathAdmin}` , adminRoutes)


app.listen(port, () => {
  console.log(`Website đang chạy trên cổng ${port}`);
});
