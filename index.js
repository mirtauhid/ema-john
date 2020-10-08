const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const uri = `mongodb+srv://emaJohnUser:aqsw1234@cluster0.ey4wq.mongodb.net/ema=john-store?retryWrites=true&w=majority`;


const app = express()

app.use(bodyParser.json());
app.use(cors());


app.get("/test", function (request, response, next) {

    response.set("Content-Type", "text/html; charset=UTF-8");
})

const port = 8000;

app.get('/', function (req, res, next) {
    res.send("Hello world");
});

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log(err);
    const productsCollection = client.db("ema-john-store").collection("products");
    const ordersCollection = client.db("ema-john-store").collection("orders");
    console.log("db connected");


    app.post('/addProduct', (req, res) => {
        const products = req.body;
        productsCollection.insertOne(products)
            .then(result => {
                console.log(result.insertedCount);
                res.send(result.insertedCount)
            })
    })

    app.get('/products', (req, res) => {
        productsCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    app.get('/product/:key', (req, res) => {
        productsCollection.find({ key: req.params.key })
            .toArray((err, documents) => {
                res.send(documents[0]);
            })
    })

    app.post('/productsByKeys', (req, res) => {
        const productKeys = req.body;
        productsCollection.find({ key: { $in: productKeys } })
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    app.post('/addOrder', (req, res) => {
        const order = req.body;
        ordersCollection.insertOne(order)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })

});


app.listen(port)