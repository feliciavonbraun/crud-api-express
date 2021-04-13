window.addEventListener('load', addEventListeners)
console.log('script filen nådd') 


function addEventListeners() {

    console.log('event filen nådd')

    const getAllBtn = document.getElementById('getAllBtn');
    const getSpecificBtn = document.getElementById('getSpecificBtn');
    const postBtn = document.getElementById('postBtn');
    const putBtn = document.getElementById('putBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    
    getAllBtn.addEventListener('click', getAllFlowers);
    getSpecificBtn.addEventListener('click', getSpecific);
    postBtn.addEventListener('click', saveNewFlower);
    putBtn.addEventListener('click', updateFlower);
    deleteBtn.addEventListener('click', deleteFlower);
}


// async function loadSite() {
//     console.log('load site nådd')
//     const allFlowers = await getAllFlowers();
//     const specificFlower = getSpecific(2);
//     const newFlower = saveNewFlower("hundkex");

//     console.log(allFlowers);
//     console.log(specificFlower);
//     console.log(newFlower);
// }

async function getAllFlowers() {

    console.log('gett all nådd')

    const flowers = await requestFromServer("/api/", "GET");

    const allFlowersDiv = document.getElementById("allFlowersDiv");
    const arrayContainer = document.createElement("div");
    for (const objIndex of flowers) {
        const list = document.createElement("ul");
        list.setAttribute("class", objIndex);
        for (const key in objIndex) {
            const liElement = document.createElement("li");
            liElement.innerHTML = `${objIndex[key]}`;
            list.appendChild(liElement);
        }
        arrayContainer.appendChild(list);
    }
    allFlowersDiv.appendChild(arrayContainer);


    // const pTag = document.createElement('p');
    // pTag.innerHTML = JSON.stringify(flowers, null, 1); 
    // document.body.append(pTag)

    return flowers;

}

async function getSpecific(id) {

    console.log('get specifik nådd')

    // const id = 2,
    const flower = await requestFromServer("/api/" + id, "GET")

    // skriver ut
    const specificFlowerDiv = document.getElementById('specificFlowerDiv')
    const paragraph = document.createElement('p');
    paragraph.innerHTML = JSON.stringify(flower);
    specificFlowerDiv.append(paragraph)
   

    return flower;
}

async function saveNewFlower() {

    console.log('post nådd')

    const body = { 
        flowerName: 'Tulpan',
        description: 'fin',
        color: 'Rosa'  
    }
    const newFlower = await requestFromServer("/api/", "POST", body);

    // skriver ut 
    const postDiv = document.getElementById('postDiv');
    const paragraph = document.createElement('p');
    paragraph.innerHTML = JSON.stringify(newFlower);
    postDiv.append(paragraph);

    return newFlower;
}

async function updateFlower(id) {
    console.log('put nådd')

}

async function deleteFlower(id) {
    console.log('delete nådd')

    const deleteFlower = await requestFromServer("/api/" + id, "DELETE"); 

    // skriver ut
    const deleteDiv = document.getElementById('deleteDiv');
    const paragraph = document.createElement('p');
    paragraph.innerHTML = JSON.stringify(newFlower);
    deleteDiv.append(paragraph);

    return deleteFlower; 
}

async function requestFromServer(url, method, body) {

    const response = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json()

    return result;
}




// const button = document.querySelector('button')
// button.addEventListener('click', fetchNrOfVisitors);

// async function fetchNrOfVisitors() {
//     const response = await fetch('/counter')
//     const counter = await response.json(); 

//     const paragraph = document.createElement('p');
//     paragraph.innerHTML = counter;
//     document.body.append(paragraph)
// }