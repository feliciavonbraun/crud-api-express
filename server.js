// const { static } = require('express');
const express = require('express');
const app = express();
const port = 3000;

let flowers = [
    {
        id: 0,
        flowerName: "Krokus",
        description: "fin fin fin",
        color: "Lila"
    },{
        id: 1,
        flowerName: "Tussilago",
        description: "fin fin fin",
        color: "Gul"
    },{
        id: 2,
        flowerName: "Blåklocka",
        description: "fin fin fin",
        color: "Blå"
    }
];

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

    if(!foundFlower) {
        res.json({ "Error": "Sorry this id does not exist" })
    }

    console.log(foundFlower)
    res.json(foundFlower)
})

// Adds new object and sets ID
app.post('/api/', (req, res) => {
    
    const flowerToSave = req.body
    
    let idToSave = 0
    flowers.forEach((flower) => {
        if(flower.id > idToSave) {
            idToSave = flower.id
        }
    })
    idToSave++

    console.log(idToSave)    
    flowers.push({
        id: idToSave,
        ...flowerToSave
    });

    res.status(201).json(req.body);
})

// Updatets
app.put('/api/flowers/:id', (req, res) => {
   
    // req.params.id
    const { id } = req.params;
    const foundFlowerIndex = flowers.findIndex((flower) => flower.id == id)

    // (id som ska bytas, hur många ting som ska tas bort, vad som ska ersätta + id)
    flowers.splice(foundFlowerIndex, 1, req.body)
    res.json(req.body)
    console.log(req.body)

    // Hitta rätt objekt med ID i flower-array
    // Ersätta req.body med det hittade objektet
})

// Deletes last object from array 
app.delete('/api/flowers/:id', (req, res) => {
    const { id } = req.params;
    flowers = flowers.filter((flower) => flower.id != id)
    res.send(`hi you, User with the ID ${id} deleted from database.`)
    
    // const deleteLastProduct = flowers.pop(flowers)
    // res.json(deleteLastProduct)
})


// Starts the server 
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})