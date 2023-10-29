import { mostrarDescripcion, cargarEstadisticas, cargarHabilidades, primeraEnMayusculas, traductorTipos } from "./funciones.js";
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

// Variable que almacenará el número del pokémon
let numeroPokemon;

// URL de PokeAPi
let URL = 'https://pokeapi.co/api/v2/pokemon/';
let URL2 = 'https://pokeapi.co/api/v2/pokemon-species/';


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

// Buscar el siguiente pokémon con el botón de ARRIBA
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

// Buscar el anterior pokémon con el botón de
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


// Modifica el display de elementos del DOM tras pulsar el botón de estadísticas
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
 * Funciones para mostrar los datos del Pokémon. Recibe la respuesta del Json y la procesa
 * haciendo mapeo de algunos datos.
 * Muestra y oculta elementos del DOM
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
        tipos.innerHTML = `<div class="tipo tipo1 ${tipo[0]}">${traductorTipos(tipo[0])}</div><div class="tipo tipo2 ${tipo[1]}">${traductorTipos(tipo[1])}</div>`
    } else {
        tipos.innerHTML = `<div class="tipo tipo1 ${tipo}">${traductorTipos(tipo[0])}</div>`
    }

    //Mapeado de habilidades y añadiendo a su contenedor
    let habilidadesPokemon = data.abilities.map(habilidad => habilidad.ability.name)
    cargarHabilidades(habilidadesPokemon)


    // Mapeo de estadisticas del Pokemon
    let estadisticasPokemon = data.stats.map(stat => stat.base_stat)

    // cargar las estadisticas
    cargarEstadisticas(estadisticasPokemon);

}

