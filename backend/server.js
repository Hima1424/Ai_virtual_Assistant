const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat",(req,res)=>{

const msg=req.body.message;

res.json({
reply:"AI Response: "+msg
});

});

app.listen(3000,()=>{

console.log(
"Server running on port 3000"

);

});