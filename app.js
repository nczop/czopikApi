const express = require('express')
const bodyParser = require('body-parser')
const uuid = require("uuid")
const cors = require("cors")

const app = express()

 let productList = [
    {
        id: uuid.v4(),
        title: "frontenowka1",
        price: "100",
        photo: "http://localhost:5000/black.png"
    },
    {
        id: uuid.v4(),
        title: "frontenowka2",
        price: "200",
        photo: "http://localhost:5000/green.png"
    },
    {
        id: uuid.v4(),
        title: "frontenowka3",
        price: "300",
        photo: "http://localhost:5000/pink.png"
    },
]

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(__dirname+"/public"))

app.get('/shop', (req, res) => res.send(productList))

app.post('/shop', (req, res) => {
    productList.push(req.body)
    res.send(productList)    
})

app.get('/shop/:id' , (req, res) => {
    console.log(req.params.id)
    const idPlecaczka = req.params.id;
    // let i=0; 
    // let wybranyPlecak = null; 
    // while (req.query.idPlecaczka !== productList[i].id) {
    //     wybranyPlecak = productList[i]
    //     i++;
    // }
    let plecaczek = productList.filter(element => element.id === idPlecaczka)
    res.send(plecaczek[0])   
})

app.delete('/shop/:id', (req, res) => {
    const id = req.params.id;

    let newProductList = productList.filter(item => item.id !== id)
    productList = newProductList;
    res.send(newProductList)
});


app.listen(5000, () => console.log ('Chomik api dziala'))