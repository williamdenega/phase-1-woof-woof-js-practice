document.addEventListener('DOMContentLoaded',init)


function init(){
    console.log('hi')
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(arry => arry.forEach(dog => displayDog(dog)))
}



function displayDog(dog){

    //creating a span for the dog
    let card = document.createElement('span')
    card.id = `${dog.name}`
    card.innerHTML =`${dog.name}`

    //adding listener for each dog
    card.addEventListener('click', ()=>{

        fetch(`http://localhost:3000/pups/${dog.id}`)
        .then(res => res.json())
        .then(dog => showInfo(dog))
    })
    document.querySelector('#dog-bar').appendChild(card)
}



function showInfo(dog){
    let dogInfo =document.querySelector('#dog-info')
    let btn = ''
    if(dog.isGoodDog == 'true'){
        btn = 'Good Boy!'
    }else{
        btn = 'Bad Boy!'
    }
    dogInfo.innerHTML = `
        <img src=${dog.image}>
        <h2>${dog.name}</h2>
        <button id=${dog.id}>${btn}</button>
    
    `
    document.getElementById(`${dog.id}`).addEventListener('click',()=>{
        let goodBoy = ''
        //changin the btn
        if(btn == 'Good Boy!'){
            btn = "Bad Boy"
            goodBoy = 'false'
        }else{
            btn = "Good Boy!"
            goodBoy = 'true'
        }
        console.log(goodBoy)
        //sending a PATCH request to change it on the server
        fetch(`http://localhost:3000/pups/${dog.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({isGoodDog:goodBoy})
        })
        .then(res => res.json())
        .then(dog => document.getElementById(`${dog.id}`).innerHTML= btn)
    })
}