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
const cntNombre2 = document.querySelector('.cnt_nombre2');
const tipos = document.querySelector('#tipos');
const datos = document.querySelector('#datos');
const nombre = document.querySelector('#nombre');
const numero = document.querySelector('#numero');
const peso = document.querySelector('#valor_peso');
const altura = document.querySelector('#valor_altura');
const descripcion = document.querySelector('#descripcion');

const stats = document.querySelector('#stats');

let numeroPokemon;

const arriba = document.querySelector('#btn_arriba');
const abajo = document.querySelector('#btn_abajo');


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
    // URL = 'https://pokeapi.co/api/v2/pokemon/';


    URL2 += pokemon
    fetch(URL2)
        .then((response) => response.json())
        .then(data => mostrarDescripcion(data))
    buscador.value = '';
    // URL2 = 'https://pokeapi.co/api/v2/pokemon-species/';
})

// ARRIBA
arriba.addEventListener('click', () => {
    numeroPokemon += 1;


    URL += numeroPokemon
    fetch(URL)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))



    URL2 += numeroPokemon
    fetch(URL2)
        .then((response) => response.json())
        .then(data => mostrarDescripcion(data))

})

// ABAJO
abajo.addEventListener('click', () => {
    numeroPokemon -= 1;

    URL += numeroPokemon
    fetch(URL)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))



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

    const comun = document.querySelector('#comun');
    const oculta = document.querySelector('#oculta');

    pokeball.src = `${data.sprites.other["official-artwork"].front_default}`;
    pokeball.alt = `${data.name}`;
    nombre.innerHTML = `${data.name}`;
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
    let habilidades = data.abilities.map(habilidad => habilidad.ability.name)
    comun.innerHTML = habilidades[0]
    oculta.innerHTML = habilidades[1]


    // Mapeo de estadisticas del Pokemon
    let estadisticasPokemon = data.stats.map(stat => stat.base_stat)
    // cargar las estadisticas
    cargarEstadisticas(estadisticasPokemon);

    URL = 'https://pokeapi.co/api/v2/pokemon/';
}

/*
 * Genera la descripción en un elemento HTML a partir de otra sección de la API
 */
function mostrarDescripcion(data) {
    cntNombre2.innerHTML = data.name;
    descripcion.innerHTML = data.genera[5].genus;
    URL2 = 'https://pokeapi.co/api/v2/pokemon-species/';
}


/*
 * Función para mostar los elementos con las estadisticas y las habilidades del pokemon
 * No carga los datos 
 * No funciona con Pokédex apagada
 */
stats.addEventListener('click', () => {
    if (luces[2].classList.contains('luz3')) {
        if (pokeball.alt != 'Imagen de Pokéball') {
            const habilidades = document.querySelector('#habilidades');
            const estadisticas = document.querySelector('#estadisticas');
            if ((habilidades.style.getPropertyValue('display') != 'flex') &&
                (estadisticas.style.getPropertyValue('display') != 'flex')) {
                habilidades.style.setProperty('display', 'flex')
                estadisticas.style.setProperty('display', 'flex')
            } else {
                habilidades.style.setProperty('display', 'none')
                estadisticas.style.setProperty('display', 'none')
            }
        } else {
            // AÑADIR UN ELMENTO QUE MUESTRE EL MENSAJE
            console.log("Busca un pokémon")
        }
    }

})


function cargarEstadisticas(data) {
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
