window.addEventListener('load', addEventListeners)
console.log('script filen nådd')

// const id = req.params.id
// console.log(id)

async function addEventListeners() {

    console.log('event filen nådd')

    // const getAllBtn = document.getElementById('getAllBtn');
    const getSpecificBtn = document.getElementById('getSpecificBtn');
    const postBtn = document.getElementById('postBtn');
    const putBtn = document.getElementById('putBtn');

    await getAllFlowers()
    // getAllBtn.addEventListener('click', getAllFlowers);
    getSpecificBtn.addEventListener('click', getSpecific);
    postBtn.addEventListener('click', postNewFlower);
    putBtn.addEventListener('click', updateFlower);

}

// async function loadSite() {
//     console.log('load site nådd')
//     const allFlowers = await getAllFlowers();
//     const specificFlower = getSpecific(2);
//     const newFlower = postNewFlower("hundkex");

//     console.log(allFlowers);
//     console.log(specificFlower);
//     console.log(newFlower);
// }

// function reloadPage() {
//     window.location.reload()
// }

async function getAllFlowers() {

    console.log('gett all nådd')

    const flowers = await requestFromServer("/api/flowers", "GET");

    // lägg till en deleteknapp i yttre for loopen 
    const allFlowersDiv = document.getElementById("allFlowersDiv");
    const arrayContainer = document.createElement("div");
    for (const objIndex of flowers) {

        const list = document.createElement("ul");
        // list.setAttribute("class", objIndex);

        const updateBtn = document.createElement("button");
        updateBtn.innerHTML = 'PUT';
        list.appendChild(updateBtn)
        updateBtn.addEventListener('click', () => {
            updateFlower(objIndex)
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = 'X';
        list.appendChild(deleteBtn)
        deleteBtn.addEventListener('click', () => {
            deleteFlower(objIndex.id)
        });

        for (const key in objIndex) {
            const liElement = document.createElement("li");
            liElement.innerHTML = `${objIndex[key]}`;
            list.appendChild(liElement);
        }
        arrayContainer.appendChild(list);
    }
    allFlowersDiv.appendChild(arrayContainer);


    return flowers;
}

async function getSpecific(objIndex) {
    console.log('get specifik nådd')

    // document.getElementById('specificFlowerInput') och valuet?? 

    const flower = await requestFromServer(`/api/flowers/${objIndex}`, "GET")

    // skriver ut
    const specificFlowerDiv = document.getElementById('specificFlowerDiv')
    const paragraph = document.createElement('p');
    paragraph.innerHTML = JSON.stringify(flower);
    specificFlowerDiv.append(paragraph)

    return flower;
}

async function postNewFlower() {
    console.log('post nådd')

    var flowerNameInput = document.getElementById('flowerNameInput')[0].value ;

    const body = {
        flowerName: flowerNameInput,
        description: 'fin',
        color: 'Rosa'
    }    


    // var old  = elem.value;
    // elem.value = old + i.innerHTML;

    const newFlower = await requestFromServer("/api/flowers", "POST", body);

    // skriver ut 
    const postDiv = document.getElementById('postDiv');
    const paragraph = document.createElement('p');
    paragraph.innerHTML = JSON.stringify(newFlower);
    postDiv.append(paragraph); 

    // window.location.reload();

    return newFlower;
}

async function updateFlower(objIndex) {
    console.log('put nådd')

    // const flowerNameInput = document.createElement("input");
    // flowerNameInput.innerHTML = 'flowerName';
    // putDiv.appendChild(flowerNameInput)

    // const colorInput = document.createElement("input");
    // colorInput.innerHTML = 'flowerName';
    // putDiv.appendChild(colorInput)


    await requestFromServer(`/api/flowers/${objIndex}`, "PUT");

    return;

}

async function deleteFlower(objIndex) {
    console.log('delete nådd');
    console.log(objIndex)

    const deleteFlowerByID = await requestFromServer(`/api/flowers/${objIndex}`, "DELETE");

    window.location.reload();

    return deleteFlowerByID;
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