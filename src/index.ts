// src/index.js
import express, {Express, query, Request, Response} from "express";
import dotenv from "dotenv";
import * as mongoose from "mongoose";
import {Product} from "./models/product"

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = express.Router();

mongoose.connect('mongodb://admin:admin@localhost:27017/stragan?authSource=admin', {})
    .then(response => {
        console.log("connected to mongo/stragan")
    })


app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Express + TypeScript Server");
});

app.post("/product",  async (req: Request, res: Response) => {
    console.log(req.body)
    let product = new Product({  title: req.body.title,
            description: req.body.description,
            price: req.body.price},
        {}
    )
    let savedProduct = await product.save();
    res.status(200).send(savedProduct);
});

app.get("/product/:title",  async (req: Request, res: Response) => {
    console.log(req.params.title)
    const products = await Product.find({title: req.params.title} )
    console.log(products)
    res.status(200).send(products)

});


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

module.exports = router;