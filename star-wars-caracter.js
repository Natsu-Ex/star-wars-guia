let currentPageUrl = "https://swapi.dev/api/people/"

window.onload = async() => {
    try {

     await loadCharacters(currentPageUrl);

    } catch (error) {
        console.log(error);
        alert('error ao carregar cards');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
};

async function loadCharacters(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; //limpar os resultados anteriores

    try {

        
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((character) => {
            const card = document.createElement("div")
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')` //é necessario contatenar pois deve ser algo dinamico para a troca de imagens
            card.className = "cards"

            const characterNameBG = document.createElement ("div")
            characterNameBG.className = "character-name-bg"

            const characterName = document.createElement ("span")
            characterName.className ="character-name"
            characterName.innerText = `${character.name}`

            characterNameBG.appendChild(characterName)
            card.appendChild(characterNameBG)
            mainContent.appendChild(card)

            card.onclick = () => {
                const modal = document.getElementById('modal')
                modal.style.visibility = "visible"

                const modalContent = document.getElementById('modal-content')
                modalContent.innerHTML =''

                const characterImage = document.createElement('div')
                characterImage.style.backgroundImage =
                `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
                characterImage.className = 'character-image'

                const name = document.createElement('span')
                name.className = 'character-details'
                name.innerText = `Nome: ${character.name}`

                const height = document.createElement('span')
                height.className = 'character-details'
                height.innerText = `Altura: ${convertHeight(character.height)}`

                const peso = document.createElement('span')
                peso.className = 'character-details'
                peso.innerText = `Peso: ${convertMass(character.mass)}`

                const eyeColor = document.createElement('span')
                eyeColor.className = 'character-details'
                eyeColor.innerText = `Cor dos olhos: ${convertEyesColor(character.eye_color)}`

                const aniversario = document.createElement('span')
                aniversario.className = 'character-details'
                aniversario.innerText = `Nascimento: ${convertbirthYear(character.birth_year)}`

                modalContent.appendChild(characterImage)
                
                modalContent.appendChild(name)
                
                modalContent.appendChild(height)
                
                modalContent.appendChild(peso)
                
                modalContent.appendChild(eyeColor)
                
                modalContent.appendChild(aniversario)
            }

        }); 
        
        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        backButton.style.visibility = responseJson.previous? "visible" : "hidden"

        currentPageUrl = url

    } catch (error) {
        console.log(error);
        alert('Erro ao carregar os personagens');
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try{
       const response = await fetch(currentPageUrl)
       const responseJson = await response.json()
       
       await loadCharacters(responseJson.next)
       
    }catch(error){
     console.log(error)
     alert('error ao carregar próxima página')   
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try{
       const response = await fetch(currentPageUrl)
       const responseJson = await response.json()
       
       await loadCharacters(responseJson.previous)
       
    }catch(error){
     console.log(error)
     alert('error ao carregar página anterior')   
    }
}

function hidemodal() {
    const modal = document.getElementById('modal')
    modal.style.visibility = "hidden"
}

function convertEyesColor(eyeColor){
    const cores = {
        blue :  'Azul',
        brown : 'Castanho',
        green : 'Verde',
        yellow : 'Amarelo',
        black : 'Preto',
        pink : 'Rosa',
        red : 'Vermelho',
        orange : 'Laranja',
        hanzel : 'Avela',
        unknown : 'desconhecida',
    };

    return cores [eyeColor.toLowerCase()] || eyeColor;
}

function convertHeight(height){
    if (height==='unknown'){
        return 'Desconhecida'
    }else{
       return(height / 100).toFixed(2);

    }
    
}

function convertMass(mass){
    if (mass==='unknown'){
        return 'desconhecido'
    }

    return `${mass} kg`
}

function convertbirthYear(birth_year){
    if (birth_year=== 'unknown'){
        return 'desconhecido'
    }

    return birth_year
}