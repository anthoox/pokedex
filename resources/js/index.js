import { mostrarDescripcion, cargarEstadisticas, cargarHabilidades, primeraEnMayusculas } from "./funciones.js";
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
// const interruptor = document.querySelector('#checkbox');
// const pantalla1 = document.querySelector('.pantalla');
// const pantalla2 = document.querySelector('.cnt_tipos_datos');
// const pantalla3 = document.querySelector('.buscador');
// const luces = document.querySelectorAll('.luces');
// const pokeball = document.querySelector('.img_pokemon');
// const saludo = document.querySelector('#saludo');
// const buscador = document.querySelector('#buscador');


// const buscar = document.querySelector('#centro');
// const cntNombre = document.querySelector('.cnt_nombre');
// const cntNombre2 = document.querySelector('.cnt_nombre2');
// const tipos = document.querySelector('#tipos');
// const datos = document.querySelector('#datos');
// const nombre = document.querySelector('#nombre');
// const numero = document.querySelector('#numero');
// const peso = document.querySelector('#valor_peso');
// const altura = document.querySelector('#valor_altura');
// const descripcion = document.querySelector('#descripcion');

// const stats = document.querySelector('#stats');
// const habilidades = document.querySelector('#habilidades');
// const estadisticas = document.querySelector('#estadisticas');



// const arriba = document.querySelector('#btn_arriba');
// const abajo = document.querySelector('#btn_abajo');


let numeroPokemon;
// ENCENDIDO DE LA POKÉDEX
interruptor.addEventListener('click', () => {
    pantalla1.classList.toggle('pantallaON');
    pantalla2.classList.toggle('pantallaON');
    pantalla3.classList.toggle('buscadorON');

    if (interruptor.checked) {
        setTimeout(() => {
            luces[0].classList.add('luz1');
        }, 250)
        setTimeout(() => {
            luces[1].classList.add('luz2');
        }, 450)
        setTimeout(() => {
            luces[1].classList.remove('luz2');
        }, 750)
        setTimeout(() => {
            luces[1].classList.add('luz2');
        }, 900)
        setTimeout(() => {
            luces[2].classList.add('luz3');
            if (pokeball.alt == 'Imagen de Pokéball') {
                saludo.classList.remove('invisible');
                buscador.removeAttribute('disabled');
                buscador.placeholder = 'Buscar';
            } else {
                saludo.classList.add('invisible');
                buscador.removeAttribute('disabled');
                buscador.placeholder = 'Buscar';
                tipos.classList.remove('invisible');
                datos.classList.remove('invisible');
            }


        }, 1000)

    } else {
        luces[0].classList.remove('luz1');
        luces[1].classList.remove('luz2');
        luces[2].classList.remove('luz3');
    }

    setTimeout(() => {
        if (luces[2].classList.contains('luz3')) {
            pokeball.classList.add('opacidad');
            cntNombre.classList.add('opacidad');
        }
    }, 1001)

    pokeball.classList.remove('opacidad');
    cntNombre.classList.remove('opacidad');


    if ((pokeball.alt != 'Imagen de Pokéball') && (habilidades.style.getPropertyValue('display') == 'flex')) {
        habilidades.style.setProperty('display', 'none')
        estadisticas.style.setProperty('display', 'none')
    }

    saludo.classList.add('invisible');
    tipos.classList.add('invisible');
    datos.classList.add('invisible');
    buscador.placeholder = '';

});



// URL de PokeAPi
let URL = 'https://pokeapi.co/api/v2/pokemon/';
let URL2 = 'https://pokeapi.co/api/v2/pokemon-species/';


// BUSCAR
buscar.addEventListener('click', () => {
    if ((buscador.value != '')) {

        const pokemon = buscador.value.toLowerCase();
        URL = 'https://pokeapi.co/api/v2/pokemon/';
        URL += pokemon
        fetch(URL)
            .then((response) => response.json())
            .then(data => mostrarPokemon(data))

        URL2 = 'https://pokeapi.co/api/v2/pokemon-species/';
        URL2 += pokemon
        fetch(URL2)
            .then((response) => response.json())
            .then(data => mostrarDescripcion(data))

        buscador.value = '';

    } else {
        saludo.innerHTML = "Introduce el número o el nombre del Pokémon"
    }
})
// BUSCAR CON ENTER
buscador.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        if (buscador.value != '') {

            const pokemon = buscador.value.toLowerCase();
            URL = 'https://pokeapi.co/api/v2/pokemon/';
            URL += pokemon
            fetch(URL)
                .then((response) => response.json())
                .then(data => mostrarPokemon(data))

            URL2 = 'https://pokeapi.co/api/v2/pokemon-species/';
            URL2 += pokemon
            fetch(URL2)
                .then((response) => response.json())
                .then(data => mostrarDescripcion(data))
            buscador.value = '';

        } else {
            saludo.innerHTML = "Introduce el número o el nombre del Pokémon"
        }
    }
})
// ARRIBA
arriba.addEventListener('click', () => {
    numeroPokemon += 1;

    URL = 'https://pokeapi.co/api/v2/pokemon/';
    URL += numeroPokemon
    fetch(URL)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))


    URL2 = 'https://pokeapi.co/api/v2/pokemon-species/';
    URL2 += numeroPokemon
    fetch(URL2)
        .then((response) => response.json())
        .then(data => mostrarDescripcion(data))

})

// ABAJO
abajo.addEventListener('click', () => {
    numeroPokemon -= 1;

    URL = 'https://pokeapi.co/api/v2/pokemon/';
    URL += numeroPokemon
    fetch(URL)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))


    URL2 = 'https://pokeapi.co/api/v2/pokemon-species/';
    URL2 += numeroPokemon
    fetch(URL2)
        .then((response) => response.json())
        .then(data => mostrarDescripcion(data))


})

/*
 * Funciones para mostrar los datos del Pokémon
 */
function mostrarPokemon(data) {

    numeroPokemon = data.id;

    saludo.classList.add('invisible');
    tipos.classList.remove('invisible');
    datos.classList.remove('invisible');



    pokeball.src = `${data.sprites.other["official-artwork"].front_default}`;
    pokeball.alt = `${data.name}`;
    nombre.innerHTML = primeraEnMayusculas(`${data.name}`);
    numero.innerHTML = `#${data.id}`;
    altura.innerHTML = (`${data.height}` / 10) + "m";
    peso.innerHTML = (`${data.weight}` / 10) + "kg";

    // Mapeado para obtener un array con los tipos
    let tipo = data.types.map(type => type.type.name);
    if (data.types.length >= 2) {
        tipos.innerHTML = `<div class="tipo tipo1 ${tipo[0]}">${tipo[0]}</div><div class="tipo tipo2 ${tipo[1]}">${tipo[1]}</div>`
    } else {
        tipos.innerHTML = `<div class="tipo tipo1 ${tipo}">${tipo}</div>`
    }

    //Mapeado de habilidades y añadiendo a su contenedor
    let habilidadesPokemon = data.abilities.map(habilidad => habilidad.ability.name)
    cargarHabilidades(habilidadesPokemon)


    // Mapeo de estadisticas del Pokemon
    let estadisticasPokemon = data.stats.map(stat => stat.base_stat)

    // cargar las estadisticas
    cargarEstadisticas(estadisticasPokemon);

}


/*
 * Funciones para mostrar los datos del Pokémon
 */
// function mostrarPokemon(data) {

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

/*
 * Genera la descripción en un elemento HTML a partir de otra sección de la API
 */
// function mostrarDescripcion(data) {

//     URL2 = 'https://pokeapi.co/api/v2/pokemon-species/';
//     buscador.value = '';

//     cntNombre2.innerHTML = primeraEnMayusculas(data.name);
//     descripcion.innerHTML = data.genera[5].genus;


// }


/*
 * Mostar los elementos con las estadisticas y las habilidades del pokemon
 * No carga los datos 
 * No funciona con Pokédex apagada
 */
stats.addEventListener('click', () => {
    if (luces[2].classList.contains('luz3')) {
        if (pokeball.alt != 'Imagen de Pokéball') {

            if ((habilidades.style.getPropertyValue('display') != 'flex') &&
                (estadisticas.style.getPropertyValue('display') != 'flex')) {
                habilidades.style.setProperty('display', 'flex')
                estadisticas.style.setProperty('display', 'flex')
            } else {
                habilidades.style.setProperty('display', 'none')
                estadisticas.style.setProperty('display', 'none')
            }
        }
    }
})


/*
 * Carga la estadísticas del pokemon
 */
// function cargarEstadisticas(data) {
//     const cnt_estadisticas = document.querySelector('.estadisticas_bars');
//     cnt_estadisticas.innerHTML =
//         `<div class="cnt_progres">
//             <label for="ps">PS</label>
//             <progress value="${data[0]}" max="150" id="ps" class="estadisticas">${data[0]}</progress>
//             <span>${data[0]}</span>
//         </div>
//         <div class="cnt_progres">
//             <label for="atk">Ataque</label>
//             <progress value="${data[1]}" max="150" id="atk" class="estadisticas">${data[1]}</progress>
//             <span>${data[1]}</span>
//         </div>
//         <div class="cnt_progres">
//             <label for="def">Defensa</label>
//             <progress value="${data[2]}" max="150" id="def" class="estadisticas">${data[2]}</progress>
//             <span>${data[2]}</span>
//         </div>
//         <div class="cnt_progres">
//             <label for="atkE">Ataque Esp.</label>
//             <progress value="${data[3]}" max="150" id="atkE" class="estadisticas">${data[3]}</progress>
//             <span>${data[3]}</span>
//         </div>
//         <div class="cnt_progres">
//             <label for="defe">Defensa Esp.</label>
//             <progress value="${data[4]}" max="150" id="defE" class="estadisticas">${data[4]}</progress>
//             <span>${data[4]}</span>
//         </div>
//         <div class="cnt_progres">
//             <label for="vel">Velocidad</label>
//             <progress value="${data[5]}" max="150" id="vel" class="estadisticas">${data[5]}</progress>
//             <span>${data[5]}</span>
//         </div> `
// }

// /*
//  * Carga las habilidades del pokemon dependiendo de cuantas tenga
//  */
// function cargarHabilidades(data) {
//     if (data.length > 1) {
//         document.querySelector('#habilidades').innerHTML = `
//             <div class="cnt_habilidad">
//                 <label id="comun" for="comun">${data[0]}</label>
//                 <progress value="100" max="100">
//                 100
//                 </progress>
//             </div>
//             <div class="cnt_habilidad">
//                 <label id="comun" for="comun">${data[1]}</label>
//                 <progress value="20" max="100">
//                 20
//                 </progress>
//             </div>`
//     } else {
//         document.querySelector('#habilidades').innerHTML = `
//             <div class="cnt_habilidad">
//                 <label id="comun" for="comun">${data[0]}</label>
//                 <progress value="100" max="100">
//                 100
//                 </progress>
//             </div>`
//     }

// }

// /*
//  * Poner en mayusculas la primera letra
//  */
// function primeraEnMayusculas(pokemon) {
//     return pokemon.charAt(0).toUpperCase() + pokemon.slice(1);
// }  