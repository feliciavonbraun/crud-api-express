window.addEventListener('load', addEventListeners)

async function addEventListeners() {
    const getSpecificBtn = document.getElementById('getSpecificBtn');
    const postBtn = document.getElementById('postBtn');
    const putBtn = document.getElementById('putBtn');

    await getAllFlowers()
    getSpecificBtn.addEventListener('click', getSpecific);
    postBtn.addEventListener('click', postNewFlower);
    putBtn.addEventListener('click', updateFlower);

}

async function getAllFlowers() {
    const flowers = await requestFromServer("/api/flowers", "GET");

    const allFlowersDiv = document.getElementById("allFlowersDiv");

    const arrayContainer = document.createElement("div");
    arrayContainer.classList.add('arrayContainer');

    for (const objIndex of flowers) {

        const list = document.createElement("ul");
        // list.setAttribute("class", objIndex);
        list.classList.add("flowerUL");

        // const updateBtn = document.createElement("button");
        // updateBtn.innerHTML = 'PUT';
        // list.appendChild(updateBtn)
        // updateBtn.addEventListener('click', () => {
        //     updateFlower(objIndex.id)
        // });

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = 'X';
        list.appendChild(deleteBtn)
        deleteBtn.classList.add('deleteBtn')
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
    allFlowersDiv.innerHTML = '';
    allFlowersDiv.appendChild(arrayContainer);

    return flowers;
}

async function getSpecific(event) {
    console.log('get specifik nådd')

    const specificFlowerInput = document.getElementById('specificFlowerInput').value;

    const specificFlower = await requestFromServer(`/api/flowers/${specificFlowerInput}`, "GET")

    const specificFlowerDiv = document.getElementById('specificFlowerDiv')
    for (const key in specificFlower) {
        const paragraph = document.createElement("p");
        paragraph.classList.add('specificParagraf')
        paragraph.innerHTML = `${specificFlower[key]}`;
        specificFlowerDiv.appendChild(paragraph);
    }
}

async function postNewFlower(event) {
    let flowerNameInput = document.getElementById('flowerNameInput');
    let descriptionInput = document.getElementById('descriptionInput');
    let colorInput = document.getElementById('colorInput'); 
    
    const body = {
        flowerName: flowerNameInput.value,
        description: descriptionInput.value,
        color: colorInput.value
    }
    
    await requestFromServer("/api/flowers", "POST", body);
    flowerNameInput.value = ''
    descriptionInput.value = ''
    colorInput.value = ''

    getAllFlowers()
}

async function updateFlower(event) {
    const chooseID = document.getElementById('chooseID').value
    const updateFlowerName = document.getElementById('updateFlowerName')
    const updateDescription = document.getElementById('updateDescription')
    const updateColor = document.getElementById('updateColor')
    
    const body = {
        flowerName: updateFlowerName.value,
        description: updateDescription.value,
        color: updateColor.value
    }  
    
    const updatedFLower = await requestFromServer(`/api/flowers/${chooseID}`, "PUT", body);

    // Prints error message
    const putDiv = document.getElementById('putDiv')
    for (const key in updatedFLower) {
        const paragraph = document.createElement("p");
        paragraph.classList.add('specificParagraf')
        paragraph.innerHTML = `${updatedFLower[key]}`;
        putDiv.appendChild(paragraph);
    }
    
    // Empty input fields after submit
    updateFlowerName.value = ''
    updateDescription.value = ''
    updateColor.value = ''
    
    const putBtn = document.getElementById('putBtn');
    putBtn.addEventListener('click', updateFlower);

    getAllFlowers()
}

async function deleteFlower(objIndex) {
    console.log('delete nådd');
    console.log(objIndex)

    await requestFromServer(`/api/flowers/${objIndex}`, "DELETE");

    getAllFlowers()
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