const interruptor = document.querySelector('#checkbox');
const pantalla1 = document.querySelector('.pantalla');
const pantalla2 = document.querySelector('.cnt_tipos_datos');
const pantalla3 = document.querySelector('.buscador');
const luces = document.querySelectorAll('.luces');
const pokeball = document.querySelector('.img_pokemon');
const saludo = document.querySelector('#saludo');
const buscador = document.querySelector('#buscador');


const buscar = document.querySelector('#centro');
const cntNombre = document.querySelector('.cnt_nombre');
const tipos = document.querySelector('#tipos');
const datos = document.querySelector('#datos');
const nombre = document.querySelector('#nombre');
const numero = document.querySelector('#numero');
const peso = document.querySelector('#valor_peso');
const altura = document.querySelector('#valor_altura');
const descripcion = document.querySelector('#descripcion');

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
            saludo.classList.remove('invisible');
            buscador.placeholder = 'Buscar';
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


    saludo.classList.add('invisible');
    tipos.classList.add('invisible');
    datos.classList.add('invisible');
    buscador.placeholder = '';

    // CUANDO SE APAGUE LA POKEDEX REINICIAR IMAGEN, NUMEROS Y TEXTOS

});


// URL de PokeAPi
let URL = 'https://pokeapi.co/api/v2/pokemon/';
let URL2 = 'https://pokeapi.co/api/v2/pokemon-species/';


// BUSCAR (Tiene que comprobarse antes que el check este marcado)
buscar.addEventListener('click', () => {
    saludo.classList.add('invisible');
    tipos.classList.remove('invisible');
    datos.classList.remove('invisible');
    const pokemon = buscador.value;

    URL += pokemon
    fetch(URL)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
    URL = 'https://pokeapi.co/api/v2/pokemon/';


    URL2 += pokemon
    fetch(URL2)
        .then((response) => response.json())
        .then(data => mostrarDescripcion(data))
    buscador.value = '';
    URL2 = 'https://pokeapi.co/api/v2/pokemon-species/';

})



// Funciones para mostrar los datos del Pokémon
function mostrarPokemon(data) {

    pokeball.src = `${data.sprites.other["official-artwork"].front_default}`;
    pokeball.alt = `${data.name}`;
    nombre.innerHTML = `${data.name}`;
    numero.innerHTML = `#${data.id}`;
    altura.innerHTML = (`${data.height}` / 10) + "m";
    peso.innerHTML = (`${data.weight}` / 10) + "kg";

    // Mapeado para obtener un array con los tipos
    var tipo = data.types.map(type => type.type.name);
    if (data.types.length >= 2) {
        tipos.innerHTML = `<div class="tipo tipo1">${tipo[0]}</div><div class="tipo tipo2">${tipo[1]}</div>`
    } else {
        tipos.innerHTML = `<div class="tipo tipo1">${tipo}</div>`
    }

}

function mostrarDescripcion(data) {
    descripcion.innerHTML = data.genera[5].genus
}


