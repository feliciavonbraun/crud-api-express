window.addEventListener('load', loadSite)

console.log('script filen nådd') 

async function loadSite() {
    console.log('load site nådd')
    const allFlowers = await getAllFlowers();
    const specificFlower = getSpecific(2);
    const newFlower = saveNewFlower("hundkex");

    console.log(allFlowers);
    console.log(specificFlower);
    console.log(newFlower);
}

async function getAllFlowers() {
    const flowers = await requestFromServer("/api/", "GET");


    // const lista = document.write(
    //     flowers
    //     .map(v => Object.values(v))
    //     // .flat()
    //     .join("<br>")
    // )
    // lista.innerHTML = flowers
    // document.body.append(lista)


    // document.write(
    //     flowers.map(a => Object.values(a).join(' '))
    //         .join('<br>')
    // );


    const allFlowersDiv = document.getElementById("allFlowersDiv");
    const arrayContainer = document.createElement("div");
    for (const objIndex of flowers) {
        const list = document.createElement("ul");
        list.setAttribute("class", objIndex);
        for (const key in objIndex) {
            const liElement = document.createElement("li");
            liElement.innerHTML = `${key}:${objIndex[key]}`;
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
    const flower = await requestFromServer("/api/" + id, "GET")

    const specificFlowerDiv = document.getElementById('specificFlowerDiv')
    const paragraph = document.createElement('p');
    paragraph.innerHTML = flower;
    specificFlowerDiv.append(paragraph)
   

    return flower;
}

async function saveNewFlower(title) {
    const body = { title: title }
    const newFlower = await requestFromServer("/api/", "POST", body);
    return newFlower;
}

async function requestFromServer(url, method, body) {

    const response = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })

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