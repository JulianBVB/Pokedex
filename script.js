let x = 0;
let y = 20;
allPokemons = [];
let pokedexInformation = ["hp", "attack", "defense", "spec.-att.", "spec.-def.", "speed"];



/**
 * Load the first 20 Pokemons and create for every Pokemon a div container
*/
async function loadPokemons() {

    let url = 'https://pokeapi.co/api/v2/pokemon/?limit=400&offset=0';
    let response = await fetch(url);
    currentPokemons = await response.json();
    pokemons = currentPokemons['results']


    document.getElementById('main').innerHTML = '';
    for (let i = 0; i < y; i++) {

        document.getElementById('main').innerHTML +=
            `
            <div class="pokemon_details">
                <div class="card" style="width: 18rem;">
                    <img src="" id="picturePokemon${[i]}" class="card-img-top">
                    <div class="card-body">
                        <h5 id="card-title${[i]}" class="card-title"></h5>
                        <div class="card-body-display">
                            <p>Höhe</p>
                            <p id="height${[i]}"></p>
                        </div>
                        <div class="card-body-display">
                            <p>Gewicht</p>
                            <p id="weight${[i]}"></p>
                        </div>
                        <a onclick="openPokedex(${[i]})" class="btn btn-danger">Mehr Details</a>
                    </div>
                </div>
            </div>
        `;

        loadPokemonDetails();

        loadAllNames();

        createPokedexInformationTable();


    }


}

/**
 * Load the Details for the first 20 Pokemons
*/
async function loadPokemonDetails() {
    for (let i = x; i < y; i++) {
        let urlDetails = `https://pokeapi.co/api/v2/pokemon/${pokemons[i]['name']}`;
        let response = await fetch(urlDetails);
        currentPokemon = await response.json();


        document.getElementById('picturePokemon' + i).src = currentPokemon['sprites']['other']['dream_world']['front_default'];
        document.getElementById('card-title' + i).innerHTML = currentPokemon.name;
        document.getElementById('height' + i).innerHTML = currentPokemon.height + ' cm';
        document.getElementById('weight' + i).innerHTML = currentPokemon.weight + ' kg';
    }
}


/**
 * load all names of pokemons in a array
*/
function loadAllNames() {
    for (let i = 0; i < pokemons.length; i++) {

        allPokemons.push(pokemons[i]['name']);

    }
}

/**
 * create table for progess bar
*/
function createPokedexInformationTable() {

    var table = "<table>";

    for (let i = 0; i < pokedexInformation.length; i++) {

        table +=
            `
        <tr>
            <td>${pokedexInformation[i]}</td>  
            <td class="progress-bar-width">        <div class="pokedex-card">
            <div class="progress">
                <div id="${pokedexInformation[i]}" class="progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0"
                    aria-valuemax="100"></div>
            </div>
        </div></td>  
        </tr>
        `
    }

    table += "</table>";


    document.getElementById('pokedex-table').innerHTML = table;

}

/**
 * Open the Pokedex for one Pokemon
*/
function openPokedex(n) {
    document.getElementById('pokedex').classList.remove('d-none');
    document.getElementById('loadMore').classList.add('d-none');


    document.getElementById('pokedex-name').innerHTML = currentPokemons['results'][n]['name']


    loadPokedexInformation(n);

}


/**
 * Load and innerHTML the Details for the Popup (Pokedex)
*/

async function loadPokedexInformation(n) {
    let pokedexDetails = `https://pokeapi.co/api/v2/pokemon/${currentPokemons['results'][n]['name']}`;
    let responsePokedex = await fetch(pokedexDetails);
    currentPokedex = await responsePokedex.json();

    document.getElementById('types').innerHTML = ``;

    for (let i = 0; i < currentPokedex['types'].length; i++) {
        document.getElementById('types').innerHTML +=
            `
        <h6 id="types${[i]}"></h6>
        `
        document.getElementById('types' + i).innerHTML = currentPokedex['types'][i]['type']['name'];
    }

    document.getElementById('pokedex-id').innerHTML = ' #' + currentPokedex.id;
    document.getElementById('pokedex-image').src = currentPokedex['sprites']['other']['dream_world']['front_default'];
    document.getElementById('hp').innerHTML = currentPokedex['stats'][0]['base_stat'];
    document.getElementById('attack').innerHTML = currentPokedex['stats'][1]['base_stat'];
    document.getElementById('defense').innerHTML = currentPokedex['stats'][2]['base_stat'];
    document.getElementById('spec.-att.').innerHTML = currentPokedex['stats'][3]['base_stat'];
    document.getElementById('spec.-def.').innerHTML = currentPokedex['stats'][4]['base_stat'];
    document.getElementById('speed').innerHTML = currentPokedex['stats'][5]['base_stat'];


    loadStatsProgressBar();

}


/**
 * load the styles (width) for progress bar
*/

function loadStatsProgressBar() {
    let hpProcent = currentPokedex['stats'][0]['base_stat'];
    let attackProcent = currentPokedex['stats'][1]['base_stat'];
    let defenseProcent = currentPokedex['stats'][2]['base_stat'];
    let specialAttackProcent = currentPokedex['stats'][3]['base_stat'];
    let specialDefenseProcent = currentPokedex['stats'][4]['base_stat'];
    let speedProcent = currentPokedex['stats'][5]['base_stat'];
    let pokedexBgColor = document.getElementById('pokedex-bg');
    let bgColor = "type-" + currentPokedex['types'][0]['type']['name'];

    document.getElementById('hp').style.width = hpProcent + "%";
    document.getElementById('attack').style.width = attackProcent + "%";
    document.getElementById('defense').style.width = defenseProcent + "%";
    document.getElementById('spec.-att.').style.width = specialAttackProcent + "%";
    document.getElementById('spec.-def.').style.width = specialDefenseProcent + "%";
    document.getElementById('speed').style.width = speedProcent + "%";
    pokedexBgColor.classList.add(bgColor);



}


/**
 * Close the Pokedex
*/
function closePokedex() {
    document.getElementById('pokedex').classList.add('d-none');
    document.getElementById('loadMore').classList.remove('d-none');


}


/**
 * Load 20 more Pokemons
*/
function showMore() {

    x += 20;
    y += 20;
    for (let i = x; i < y; i++) {

        document.getElementById('main').innerHTML +=
            `
            <div class="pokemon_details">
                <div class="card" style="width: 18rem;">
                    <img src="" id="picturePokemon${[i]}" class="card-img-top">
                    <div class="card-body">
                        <h5 id="card-title${[i]}" class="card-title"></h5>
                        <div class="card-body-display">
                            <p>Höhe</p>
                            <p id="height${[i]}"></p>
                        </div>
                        <div class="card-body-display">
                            <p>Gewicht</p>
                            <p id="weight${[i]}"></p>
                        </div>
                        <a onclick="openPokedex(${[i]})" class="btn btn-danger">Mehr Details</a>
                    </div>
                </div>
            </div>
        `;
    }


    loadPokemonDetails()

}





/**
 * Check if search Pokemon include and create a container
*/
function searchPokemon() {
    let search = document.getElementById('searchPokemon').value;

    if (allPokemons.includes(search)) {
        z = allPokemons.indexOf(search);

        document.getElementById('main').innerHTML =


            `
        <div class="pokemon_details">
            <div class="card" style="width: 18rem;">
                <img src="" id="picturePokemon${[z]}" class="card-img-top">
                <div class="card-body">
                    <h5 id="card-title${[z]}" class="card-title"></h5>
                    <div class="card-body-display">
                        <p>Höhe</p>
                        <p id="height${[z]}"></p>
                    </div>
                    <div class="card-body-display">
                        <p>Gewicht</p>
                        <p id="weight${[z]}"></p>
                    </div>
                    <a onclick="openPokedex(${[z]})" class="btn btn-danger">Mehr Details</a>
                </div>
            </div>
        </div>
    `;

    } else if (search === "") {
        loadPokemons();
    } else {
        alert('Pokemon nicht gefunden');
    }

    resultSearch(z)

}

/**
 * Search the Information for the searched Pokemon
*/
async function resultSearch(z) {

    let urlResult = `https://pokeapi.co/api/v2/pokemon/${pokemons[z]['name']}`;
    let response = await fetch(urlResult);
    resultPokemon = await response.json();


    document.getElementById('picturePokemon' + z).src = resultPokemon['sprites']['other']['dream_world']['front_default'];
    document.getElementById('card-title' + z).innerHTML = resultPokemon.name;
    document.getElementById('height' + z).innerHTML = resultPokemon.height + ' cm';
    document.getElementById('weight' + z).innerHTML = resultPokemon.weight + ' kg';
}
