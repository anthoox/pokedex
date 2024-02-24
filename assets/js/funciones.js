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

/*
 * Poner en mayusculas la primera letra
 */
export function primeraEnMayusculas(pokemon) {
    return pokemon.charAt(0).toUpperCase() + pokemon.slice(1);
}

/*
 * Carga las habilidades del pokemon dependiendo de cuantas tenga y las añade al DOM
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

    buscador.value = '';

    cntNombre2.innerHTML = primeraEnMayusculas(data.name);
    descripcion.innerHTML = data.genera[5].genus;
}

/*
 * Recibe un valor y encuentra la posición en el array y la busca en otro array
 * devolviendo el tipo en español
 */
export function traductorTipos(tipo) {
    let tiposI = ['normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dark', 'dragon', 'steel', 'fairy'];
    let tiposE = ['Normal', 'Fuego', 'Agua', 'Planta', 'Eléctrico', 'Hielo', 'Luchador', 'Veneno', 'Tierra', 'Volador', 'Psiquico', 'Bicho', 'Roca', 'Fantasma', 'Siniestro', 'Dragón', 'Acero', 'Hada'];

    let indice = tiposI.indexOf(tipo);
    return tiposE[indice];
}
