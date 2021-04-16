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
// Gets all flowers
app.get('/api/flowers', (req, res) => {
    res.json(flowers);
})

// Gets specific flower
app.get('/api/flowers/:id/', (req, res) => {
    const id = req.params.id
    const foundFlower = flowers.find((flower) => {
        return flower.id == id
    })

    if (!foundFlower) {
        res.status(404).json({ "Error": `Sorry ID: ${id} does not exist` })
    }
    res.status(200).json(foundFlower)
})

// Adds new object and sets ID
app.post('/api/flowers', (req, res) => {
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

    fs.writeFile("flowers.json", JSON.stringify(flowers, null, 2), () =>
        res.status(201).json(req.body)
    );
})

// Updatets specific flower 
app.put('/api/flowers/:id', (req, res) => {
    const { id } = req.params;
    const foundFlowerIndex = flowers.findIndex((flower) => flower.id == id);

    if (foundFlowerIndex === -1) {
        return res.status(404).json({ "Error": `Sorry ID: ${id} does not exist` });
    }
    
    const replacedFlower = {
        id: parseInt(id),
        ...req.body
    }
    
    flowers.splice(foundFlowerIndex, 1, replacedFlower);
    fs.writeFile("flowers.json", JSON.stringify(flowers, null, 2), () => {
        res.status(201).json('')
    });
})

// Deletes chosen ID-object from array 
app.delete('/api/flowers/:id', (req, res) => {
    const { id } = req.params;
    const deletedFlower = flowers.findIndex((flower) => flower.id == id)

    if (deletedFlower === -1) {
        return res.status(404).json({ "Error": `Sorry ID: ${id} does not exist` });
    }

    flowers.splice(deletedFlower, 1);
    fs.writeFile("flowers.json", JSON.stringify(flowers, null, 2), () =>
        res.status(200).json(`User with the ID ${id} deleted from database.`)
    );
})

// Starts the server 
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})