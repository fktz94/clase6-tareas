/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).
*/



/*
TAREA:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, salario anual promedio y salario mensual promedio.

Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/

const $botonAgregarFamiliares = document.querySelector('#agregar-familiares');

$botonAgregarFamiliares.onclick = function () {
    let integrantesGrupoFamiliar = Number(document.getElementById('cantidad-familiares').value);

    manejarErrores(0, integrantesGrupoFamiliar);

    if (Number(integrantesGrupoFamiliar)) {
        borrarIntegrantesAnteriores();
        crearFamiliares(integrantesGrupoFamiliar);
    } else {
        borrarIntegrantesAnteriores();
        document.getElementById('edad-mayor').textContent = 'No ingresaste un número válido';
    }
}

function borrarIntegrantesAnteriores() {
    document.getElementById('edad-mayor').textContent = '';
    document.getElementById('edad-menor').textContent = '';
    document.getElementById('edad-promedio').textContent = '';
    document.getElementById('salario-mayor').textContent = '';
    document.getElementById('salario-menor').textContent = '';
    document.getElementById('salario-anual').textContent = '';
    document.getElementById('salario-mensual').textContent = '';

    let divFamiliar = document.querySelectorAll('div#familiares > div');
    for (let i = 0; i < divFamiliar.length; i++) {
        if (divFamiliar[i]) {
            divFamiliar[i].remove();
        }
    }
}


function validarInput(input) {
    if (input === '') {
        return ('Debe ingresar un número');
    } else if (!/^[0-9]+$/.test(input)) {
        return ('Solo puedes ingresar números');
    }
    return '';
}

function validarEnArray(input) {
    for (let i = 0; i < input.length; i++) {
        if (input[i] === '') {
            return ('Debe ingresar un número');
        } else if (!/^[0-9]+$/.test(input[i])) {
            return ('Solo puedes ingresar números');
        }
        return '';
    }
}

function validarTodosLosInput(cantidadFamiliares) {
    let edades = [];
    for (let i = 0; i < cantidadFamiliares; i++) {
        let $edades = document.getElementById(`edad-familiar-${i + 1}`);
        $edades = Number($edades).value;
        if (edades) {
            edades.push($edades);
        }
    }
    let salarios = [];
    for (let i = 0; i < cantidadFamiliares; i++) {
        let $salarios = document.getElementById(`input-salario-${i + 1}`);
        $salarios = Number($salarios).value;
        if ($salarios) {
            salarios.push($salarios);
        }
    }

    const errorEdades = validarEnArray(edades);
    const errorSalarios = validarEnArray(salarios);

    const errores = {
        edades: errorEdades,
        salarios: errorSalarios,
    }

    manejarErrores(errores, cantidadFamiliares);
}

function manejarErrores(errores, cantidadFamiliares) {
    const errorCantidadFamiliares = validarInput(cantidadFamiliares);
    if (errorCantidadFamiliares) {
        document.getElementById('cantidad-familiares').className = 'error';
    } else {
        document.getElementById('cantidad-familiares').className = '';
    }


    const keys = Object.keys(errores)
    console.log(keys);


    keys.forEach(function (key) {
        console.log(errores[key]);

    })








}


function crearFamiliares(integrantes) {
    const $divInputs = document.getElementById('familiares')
    for (let i = 0; i < integrantes; i++) {
        const divFamiliar = document.createElement('div');
        divFamiliar.id = `div-familiar-${i + 1}`;
        const labelFamiliar = document.createElement('label');
        labelFamiliar.textContent = `Edad del familiar #${i + 1}`
        const inputEdadFamiliar = document.createElement('input');
        inputEdadFamiliar.type = 'text';
        inputEdadFamiliar.id = `edad-familiar-${i + 1}`;
        $divInputs.appendChild(divFamiliar);
        divFamiliar.appendChild(labelFamiliar);
        divFamiliar.appendChild(inputEdadFamiliar);
    }
}


const $botonCalcularEdades = document.getElementById('boton-calcular');
$botonCalcularEdades.onclick = function () {
    let integrantesGrupoFamiliar = Number(document.getElementById('cantidad-familiares').value);


    document.getElementById('edad-mayor').textContent = '';
    document.getElementById('edad-menor').textContent = '';
    document.getElementById('edad-promedio').textContent = '';

    validarTodosLosInput(integrantesGrupoFamiliar)

    calcularMayorEdad(integrantesGrupoFamiliar);
    calcularMenorEdad(integrantesGrupoFamiliar);
    calcularPromedioFamiliar(integrantesGrupoFamiliar);
}

function calcularMayorEdad(integrantes) {
    let mayorEdad = 0;
    for (let i = 0; i < integrantes; i++) {
        let $edades = Number(document.getElementById(`edad-familiar-${i + 1}`).value);
        if ($edades > mayorEdad) {
            mayorEdad = $edades;
        }
    }
    if (mayorEdad === 0) {
        document.getElementById('edad-mayor').textContent = 'No ingresaste ninguna edad';
    } else {
        document.getElementById('edad-mayor').textContent = `La edad mayor es ${mayorEdad}`;
    }
}
function calcularMenorEdad(integrantes) {
    let menorEdad = 123456789; // ENCONTRAR ALGUNA MANERA MÁS ORGÁNICA DE SOLUCIONARLO
    for (let i = 0; i < integrantes; i++) {
        let $edades = Number(document.getElementById(`edad-familiar-${i + 1}`).value);
        if ($edades <= 0) {
            continue;
        } else if ($edades < menorEdad) {
            menorEdad = $edades;
        }
    }
    if (menorEdad === 123456789) {
        return null;
    } else {
        document.getElementById('edad-menor').textContent = `La edad menor es ${menorEdad}`;
    }
}

function calcularPromedioFamiliar(integrantes) {
    let promedioEdadesArray = [];
    for (let i = 0; i < integrantes; i++) {
        let $edades = Number(document.getElementById(`edad-familiar-${i + 1}`).value)
        if ($edades <= 0) {
            continue;
        }
        if ($edades)
            promedioEdadesArray.push($edades);
    }
    if (promedioEdadesArray == '') {
        return null;
    } else {
        let promedioEdades = 0;
        for (let i = 0; i < promedioEdadesArray.length; i++) {
            promedioEdades += promedioEdadesArray[i];
        }
        promedioEdades = promedioEdades / promedioEdadesArray.length
        document.getElementById('edad-promedio').textContent = `La edad promedio es ${promedioEdades.toFixed(1)}`
    }
}



const $botonReset = document.getElementById('boton-reset');
$botonReset.onclick = function () {
    document.getElementById('cantidad-familiares').value = '';
    document.getElementById('edad-mayor').textContent = '';
    document.getElementById('edad-menor').textContent = '';
    document.getElementById('edad-promedio').textContent = '';
    document.getElementById('salario-mayor').textContent = '';
    document.getElementById('salario-menor').textContent = '';
    document.getElementById('salario-anual').textContent = '';
    document.getElementById('salario-mensual').textContent = '';
    let divFamiliar = document.querySelectorAll('div#familiares > div');
    for (let i = 0; i < divFamiliar.length; i++) {
        if (divFamiliar[i]) {
            divFamiliar[i].remove();
        }
    }
}


const $botonAgregarSalario = document.getElementById('agregar-salario');
$botonAgregarSalario.onclick = function () {
    let integrantesGrupoFamiliar = Number(document.getElementById('cantidad-familiares').value);
    for (let i = 0; i < integrantesGrupoFamiliar; i++) {
        let divFamiliar = document.getElementById(`div-familiar-${i + 1}`);
        let labelSalario = document.createElement('label');
        labelSalario.textContent = 'Salario anual:';
        labelSalario.id = `label-salario-${i + 1}`;
        let inputSalario = document.createElement('input');
        inputSalario.type = 'text';
        inputSalario.id = `input-salario-${i + 1}`;
        divFamiliar.appendChild(labelSalario);
        divFamiliar.appendChild(inputSalario);
    }
}

const $botonQuitarSalario = document.getElementById('quitar-salario');
$botonQuitarSalario.onclick = function () {
    let integrantesGrupoFamiliar = Number(document.getElementById('cantidad-familiares').value);
    document.getElementById('salario-mayor').textContent = '';
    document.getElementById('salario-menor').textContent = '';
    document.getElementById('salario-anual').textContent = '';
    document.getElementById('salario-mensual').textContent = '';
    for (let i = 0; i < integrantesGrupoFamiliar; i++) {
        let labelSalario = document.getElementById(`label-salario-${i + 1}`);
        labelSalario.remove();
        let inputSalario = document.getElementById(`input-salario-${i + 1}`);
        inputSalario.remove();
    }

}

const $botonCalcularSalario = document.getElementById('calcular-salario');
$botonCalcularSalario.onclick = function () {
    let integrantesGrupoFamiliar = Number(document.getElementById('cantidad-familiares').value);

    document.getElementById('salario-mayor').textContent = '';
    document.getElementById('salario-menor').textContent = '';
    document.getElementById('salario-anual').textContent = '';
    document.getElementById('salario-mensual').textContent = '';

    calcularSalarioMayor(integrantesGrupoFamiliar);
    calcularSalarioMenor(integrantesGrupoFamiliar);
    calcularPromedios(integrantesGrupoFamiliar);
}

function calcularSalarioMayor(integrantes) {
    let salarioMayor = 0;
    for (let i = 0; i < integrantes; i++) {
        let salarios = Number(document.getElementById(`input-salario-${i + 1}`).value);
        if (salarios > salarioMayor) {
            salarioMayor = salarios;
        }
    }
    if (salarioMayor === 0) {
        document.getElementById('salario-mayor').textContent = 'No ingresaste ningún salario';
    } else {
        document.getElementById('salario-mayor').textContent = `El salario mayor es $${salarioMayor}`;
    }

}

function calcularSalarioMenor(integrantes) {
    let arrayDeSalarios = [];
    for (let i = 0; i < integrantes; i++) {
        let salarios = document.getElementById(`input-salario-${i + 1}`);
        salarios = Number(salarios.value)
        validarInput(salarios);
        if (isNaN(salarios)) {
            continue;
        }
        if (salarios > 0) {
            arrayDeSalarios.push(salarios);
        }
    }
    let salarioMenor;
    for (let i = 0; i < arrayDeSalarios.length; i++) {
        if (!salarioMenor) {
            salarioMenor = arrayDeSalarios[i]
        } else {
            if (arrayDeSalarios[i] < salarioMenor)
                salarioMenor = arrayDeSalarios[i]
        }
    }

    if (!salarioMenor) {
        document.getElementById('salario-menor').textContent = '';
    } else {
        document.getElementById('salario-menor').textContent = `El salario menor es $${salarioMenor}`;
    }
}


function calcularPromedios(integrantes) {
    let salarios = [];
    let sumaSalarios = 0;
    function crearArraySalariosAnual() {
        for (let i = 0; i < integrantes; i++) {
            let $salarioIndividual = Number(document.getElementById(`input-salario-${i + 1}`).value);
            validarInput($salarioIndividual);
            if ($salarioIndividual == '') {
                continue;
            }
            if ($salarioIndividual < 0) {
                continue;
            }
            if (isNaN($salarioIndividual)) {
                continue;
            }
            salarios.push($salarioIndividual);
        }
    }
    crearArraySalariosAnual();
    function promedioAnual() {
        for (let i = 0; i < salarios.length; i++) {
            sumaSalarios += salarios[i];
        }
    }
    promedioAnual();
    if (sumaSalarios === 0) {
        null;
    } else {
        let salarioAnual = sumaSalarios / salarios.length;
        document.getElementById('salario-anual').textContent = `El promedio de los salarios anuales es de $${salarioAnual.toFixed(1)}`;

        const MESES_EN_EL_ANIO = 12;
        let salarioMensual = salarioAnual / MESES_EN_EL_ANIO;

        document.getElementById('salario-mensual').textContent = `El promedio de los salarios mensuales es de $${salarioMensual.toFixed(2)}`;
    }
}

