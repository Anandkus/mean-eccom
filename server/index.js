const exp = require('express');

const dotenv = require("dotenv");
dotenv.config({path:'./config.env'});

const userRouter = require('./routers/user');
const productRouter = require("./routers/product");
const adminRouter = require("./routers/admin");
const buyerRouter = require("./routers/buyer");
const orderRouter = require("./routers/order");
const cartRouter = require("./routers/cart");
const path = require('path');
const { connectDb } = require("./confiq/conn");
const cors = require("cors");



const app = exp();
const port = process.env.PORT;
//to access all field value by router 
app.use(exp.json());
app.use(cors());
app.use('/images', exp.static('public/images')); // Serve images statically

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/admin", adminRouter);
app.use("/buyer", buyerRouter);
app.use("/order", orderRouter);
app.use("/cart", cartRouter);



app.listen(port, async () => {
    await connectDb()
    console.log(`server is run ${port}`)
})
