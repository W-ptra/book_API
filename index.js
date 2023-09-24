const middleware = require("./config/middleware");
const api = require("./routes/api")
const express = require("express");
const app = express();

express.json();

app.use(express.json());
app.use("/",middleware.logger);

app.get("/",(req,res)=>{
    res.status(200).send("<h1>ROOT PAGE</h1>");
});

app.get("/key", api.get_key);

app.get("/book", api.get_book );

app.post("/book", middleware.authentication, middleware.queryValidation, api.post_book);

app.patch("/book", middleware.authentication, middleware.queryValidation, api.patch_book);

app.delete("/book", middleware.authentication, middleware.queryValidation, api.delete_book);

app.listen(3000,()=>{
    console.log("listening on port 3000");
});