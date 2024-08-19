let currentPageUrl = "https://swapi.dev/api/planets/"

window.onload = async() => {
    try {

     await loadPlanets(currentPageUrl);

    } catch (error) {
        console.log(error);
        alert('error ao carregar cards');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
};

async function loadPlanets(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; //limpar os resultados anteriores

    try {

        
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((planets) => {
            const card = document.createElement("div")
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/planets/${planets.url.replace(/\D/g, "")}.jpg')` //é necessario contatenar pois deve ser algo dinamico para a troca de imagens
            card.className = "cards"

            const planetsNameBG = document.createElement ("div")
            planetsNameBG.className = "planets-name-bg"

            const planetsName = document.createElement ("span")
            planets.className ="planets-name"
            planets.innerText = `${planets.name}`

            planetsNameBG.appendChild(planetsName)
            card.appendChild(planetsNameBG)
            mainContent.appendChild(card)

            card.onclick = () => {
                const modal = document.getElementById('modal')
                modal.style.visibility = "visible"

                const modalContent = document.getElementById('modal-content')
                modalContent.innerHTML =''

                const planetsImage = document.createElement('div')
                planetsImage.style.backgroundImage =
                `url('https://starwars-visualguide.com/assets/img/planets/${planets.url.replace(/\D/g, "")}.jpg')`
                planetsImage.className = 'planets-image'

                const name = document.createElement('span')
                name.className = 'planets-details'
                name.innerText = `Nome: ${planets.name}`

                const orbitalPeriod = document.createElement('span')
                orbitalPeriod.className = 'planets-details'
                orbitalPeriod.innerText = `Período orbital: ${convertOrbitalPeriod(planets.orbital_period)}`

                const climate = document.createElement('span')
                climate.className = 'planets-details'
                climate.innerText = `Clima: ${convertclimate(planets.climate)}`

                const population = document.createElement('span')
                population.className = 'planets-details'
                population.innerText = `População: ${convertPopulation(planets.population)}`


                modalContent.appendChild(planetsImage)
                
                modalContent.appendChild(name)
                
                modalContent.appendChild(orbitalPeriod)
                
                modalContent.appendChild(climate)
                
                modalContent.appendChild(population)
                
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
        alert('Erro ao carregar os planetas');
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try{
       const response = await fetch(currentPageUrl)
       const responseJson = await response.json()
       
       await loadPlanets(responseJson.next)
       
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
       
       await loadPlanets(responseJson.previous)
       
    }catch(error){
     console.log(error)
     alert('error ao carregar página anterior')   
    }
}

function hidemodal() {
    const modal = document.getElementById('modal')
    modal.style.visibility = "hidden"
}

function convertclimate(climate){
    const climas = {
       frozen:  'Congelado',
       temperate : 'Temperado',
        tropical : 'Tropical',
        arid : 'Arido',
        murky : 'Húmido',
        unknown : 'desconhecido',
    };

    return climas [climate.toLowerCase()] || climate;
}

function convertOrbitalPeriod(orbital_period){
    if (orbital_period==='unknown'){
        return 'Desconhecido'
      
}
    return `${orbital_period} Dias`

}

function convertPopulation(population){
    if (population==='unknown'){
        return 'desconhecida'
    }

    return population
}

