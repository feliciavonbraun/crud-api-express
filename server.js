// const { static } = require('express');
const express = require('express');
const app = express();
const port = 3000;
const fs = require("fs");

const data = fs.readFileSync("flowers.json");
let flowers = JSON.parse(data);

// Serves all files in the public folder
app.use(express.static('./public'))

// Parse incoming body from jsom to js-object
app.use(express.json());

// Define out endpoints
// hämta alla 
app.get('/api/', (req, res) => {
    res.json(flowers);
})

// hämta specifik 
app.get('/api/:id/', (req, res) => {

    const id = req.params.id
    const foundFlower = flowers.find((flower) => {
        return flower.id == id
    })

    if (!foundFlower) {
        res.json({ "Error": "Sorry this ID does not exist" })
    }

    console.log(foundFlower)
    res.status(200).json(foundFlower)
})

// Adds new object and sets ID
app.post('/api/', (req, res) => {

    const flowerToSave = req.body

    let idToSave = 0
    flowers.forEach((flower) => {
        if (flower.id > idToSave) {
            idToSave = flower.id
        }
    })
    idToSave++

    flowers.push({
        id: idToSave,
        ...flowerToSave
    });

    const write = fs.writeFile("flowers.json", JSON.stringify(flowers, null, 2), () =>
        res.status(201).json(req.body)
    );
})

// Updatets
app.put('/api/flowers/:id', (req, res) => {

    // req.params.id
    const { id } = req.params;
    const foundFlowerIndex = flowers.findIndex((flower) => flower.id == id)

    const replacedFlower = {
        id: foundFlowerIndex,
        ...req.body
    }

    flowers.splice(foundFlowerIndex, 1, replacedFlower);

    const write = fs.writeFile("flowers.json", JSON.stringify(flowers, null, 2), () =>
        console.log("put in database")
    );

    res.status(200).json(req.body);
})

// Deletes chosen ID-object from array 
app.delete('/api/flowers/:id', (req, res) => {
    const { id } = req.params;
    flowers = flowers.filter((flower) => flower.id != id)

    const write = fs.writeFile("flowers.json", JSON.stringify(flowers, null, 2), () =>
        console.log("delete in database")
    );

    res.status(200).json(`hi you, User with the ID ${id} deleted from database.`)
})


// Starts the server 
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})