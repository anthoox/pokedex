import { constantes } from './constantes.js';
const {
    interruptor,
    pantalla1,
    pantalla2,
    pantalla3,
    luces,
    pokeball,
    saludo,
    buscador,
    buscar,
    cntNombre,
    cntNombre2,
    tipos,
    datos,
    nombre,
    numero,
    peso,
    altura,
    descripcion,
    stats,
    habilidades,
    estadisticas,
    arriba,
    abajo
} = constantes;

let numeroPokemon;

// URL de PokeAPi
let URL = 'https://pokeapi.co/api/v2/pokemon/';
let URL2 = 'https://pokeapi.co/api/v2/pokemon-species/';

/*
 * Poner en mayusculas la primera letra
 */
export function primeraEnMayusculas(pokemon) {
    return pokemon.charAt(0).toUpperCase() + pokemon.slice(1);
}

/*
 * Carga las habilidades del pokemon dependiendo de cuantas tenga
 */

export function cargarHabilidades(data) {
    if (data.length > 1) {
        document.querySelector('#habilidades').innerHTML = `
            <div class="cnt_habilidad">
                <label id="comun" for="comun">${data[0]}</label>
                <progress value="100" max="100">
                100
                </progress>
            </div>
            <div class="cnt_habilidad">
                <label id="comun" for="comun">${data[1]}</label>
                <progress value="20" max="100">
                20
                </progress>
            </div>`
    } else {
        document.querySelector('#habilidades').innerHTML = `
            <div class="cnt_habilidad">
                <label id="comun" for="comun">${data[0]}</label>
                <progress value="100" max="100">
                100
                </progress>
            </div>`
    }

}


/*
 * Carga la estadísticas del pokemon
 */
export function cargarEstadisticas(data) {
    const cnt_estadisticas = document.querySelector('.estadisticas_bars');
    cnt_estadisticas.innerHTML =
        `<div class="cnt_progres">
            <label for="ps">PS</label>
            <progress value="${data[0]}" max="150" id="ps" class="estadisticas">${data[0]}</progress>
            <span>${data[0]}</span>
        </div>
        <div class="cnt_progres">
            <label for="atk">Ataque</label>
            <progress value="${data[1]}" max="150" id="atk" class="estadisticas">${data[1]}</progress>
            <span>${data[1]}</span>
        </div>
        <div class="cnt_progres">
            <label for="def">Defensa</label>
            <progress value="${data[2]}" max="150" id="def" class="estadisticas">${data[2]}</progress>
            <span>${data[2]}</span>
        </div>
        <div class="cnt_progres">
            <label for="atkE">Ataque Esp.</label>
            <progress value="${data[3]}" max="150" id="atkE" class="estadisticas">${data[3]}</progress>
            <span>${data[3]}</span>
        </div>
        <div class="cnt_progres">
            <label for="defe">Defensa Esp.</label>
            <progress value="${data[4]}" max="150" id="defE" class="estadisticas">${data[4]}</progress>
            <span>${data[4]}</span>
        </div>
        <div class="cnt_progres">
            <label for="vel">Velocidad</label>
            <progress value="${data[5]}" max="150" id="vel" class="estadisticas">${data[5]}</progress>
            <span>${data[5]}</span>
        </div> `
}

/*
 * Genera la descripción en un elemento HTML a partir de otra sección de la API
 */
export function mostrarDescripcion(data) {

    URL2 = 'https://pokeapi.co/api/v2/pokemon-species/';
    buscador.value = '';

    cntNombre2.innerHTML = primeraEnMayusculas(data.name);
    descripcion.innerHTML = data.genera[5].genus;


}

// /*
//  * Funciones para mostrar los datos del Pokémon
//  */
// export function mostrarPokemon(data) {

//     numeroPokemon = data.id;

//     saludo.classList.add('invisible');
//     tipos.classList.remove('invisible');
//     datos.classList.remove('invisible');



//     pokeball.src = `${data.sprites.other["official-artwork"].front_default}`;
//     pokeball.alt = `${data.name}`;
//     nombre.innerHTML = primeraEnMayusculas(`${data.name}`);
//     numero.innerHTML = `#${data.id}`;
//     altura.innerHTML = (`${data.height}` / 10) + "m";
//     peso.innerHTML = (`${data.weight}` / 10) + "kg";

//     // Mapeado para obtener un array con los tipos
//     let tipo = data.types.map(type => type.type.name);
//     if (data.types.length >= 2) {
//         tipos.innerHTML = `<div class="tipo tipo1 ${tipo[0]}">${tipo[0]}</div><div class="tipo tipo2 ${tipo[1]}">${tipo[1]}</div>`
//     } else {
//         tipos.innerHTML = `<div class="tipo tipo1 ${tipo}">${tipo}</div>`
//     }

//     //Mapeado de habilidades y añadiendo a su contenedor
//     let habilidadesPokemon = data.abilities.map(habilidad => habilidad.ability.name)
//     cargarHabilidades(habilidadesPokemon)


//     // Mapeo de estadisticas del Pokemon
//     let estadisticasPokemon = data.stats.map(stat => stat.base_stat)

//     // cargar las estadisticas
//     cargarEstadisticas(estadisticasPokemon);

// }