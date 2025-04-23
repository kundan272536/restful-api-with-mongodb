const express=require("express");
const connectDB=require('./config/connection');
const {logReqRes}=require("./middlewares/index");
const app=express();
const userRouter=require('./routes/user');
connectDB();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(logReqRes("log.txt"));
app.use('/api/user',userRouter);

const PORT=8000;
app.listen(PORT,(req,res)=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})