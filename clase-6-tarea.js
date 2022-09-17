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




function clase6() {
    const miembrosDelGrupoFamiliar = Number(prompt('¿cuantas personas hay en su grupo familiar?'));
    const $divInputs = document.querySelector('#inputs');

    for (let i = 1; i <= miembrosDelGrupoFamiliar; i++) {

        const divIntegrantes = document.createElement('div');
        divIntegrantes.className = `div-integrantes-${i}`;
        $divInputs.appendChild(divIntegrantes);

        const labelNombre = document.createElement('label');
        labelNombre.textContent = [i] + ') Nombre del familiar:';
        labelNombre.className = 'label-nombre';
        divIntegrantes.appendChild(labelNombre);

        const inputNombre = document.createElement('input');
        inputNombre.type = 'text';
        inputNombre.className = 'input-nombre';
        divIntegrantes.appendChild(inputNombre);

        const labelEdad = document.createElement('label');
        labelEdad.textContent = 'Edad: '
        labelEdad.className = 'label-edad';
        divIntegrantes.appendChild(labelEdad);

        const inputEdad = document.createElement('input');
        inputEdad.type = 'number';
        inputEdad.className = 'input-edad';
        inputEdad.id = `input-edad-${i}`
        divIntegrantes.appendChild(inputEdad);
    }

    const $botonCalcular = document.querySelector('#boton-calcular');
    $botonCalcular.onclick = function () {

        let arrayEdades = [];
        let contadorEdades = 0;

        for (let i = 1; i <= miembrosDelGrupoFamiliar; i++) {
            let $inputEdad = Number(document.querySelector(`#input-edad-${i}`).value);
            arrayEdades.push($inputEdad);

            contadorEdades += Number(document.querySelector(`#input-edad-${i}`).value);
        }
        const mayor = Math.max(...arrayEdades);
        const textMayor = document.createTextNode(`La edad mayor es ${mayor}`)
        document.querySelector('#edad-mayor').appendChild(textMayor);

        const menor = Math.min(...arrayEdades);
        const textMenor = document.createTextNode(`La edad menor es ${menor}`)
        document.querySelector('#edad-menor').appendChild(textMenor);

        let promedio = contadorEdades / miembrosDelGrupoFamiliar;
        promedio = promedio.toFixed()
        const textPromedio = document.createTextNode(`La edad promedio del grupo familiar es ${promedio}`);
        document.querySelector('#promedio-edad').appendChild(textPromedio);
    }


    function resetearTodo() {
        document.getElementById('#inputs').textContent = null;
    }
    document.getElementById('form').addEventListener('reset', resetearTodo);



    function crearBotones() {
        const $botonAgregar = document.getElementById('boton-agregar');
        $botonAgregar.onclick = function () {
            for (let i = 1; i <= miembrosDelGrupoFamiliar; i++) {
                const $divIntegrantes = document.querySelector(`.div-integrantes-${i}`);
                const labelSalario = document.createElement('label');
                labelSalario.textContent = 'Salario anual';
                labelSalario.id = `label-salario-${i}`;
                const inputSalario = document.createElement('input');
                inputSalario.type = 'number';
                inputSalario.id = `input-salario-${i}`;
                $divIntegrantes.appendChild(labelSalario);
                $divIntegrantes.appendChild(inputSalario);
            }
            arraySalario();
        }
        const $botonCalcularSalario = document.querySelector('#boton-calcular-salario')
        $botonCalcularSalario.onclick = function(){
            calcularMayorSalario();
            calcularMenorSalario();
        }
    }
    crearBotones();

    function arraySalario() {
        const arraySalarios = [];
        for (let i = 1; i <= miembrosDelGrupoFamiliar; i++) {
            let salario = document.getElementById(`input-salario-${i}`).value;
            arraySalarios.push(salario);
        }
        function calcularMayorSalario() {
            let mayorSalario = arraySalarios[0];
            for (let i = 0; i < arraySalarios.length; i++) {
                if (arraySalario[i] > mayorSalario) {
                    mayorSalario = arraySalario[i];
                }
            }
            return mayorSalario;
        }
        function calcularMenorSalario() {
            let menorSalario = arraySalarios[0];
            for (let i = 0; i < arraySalarios.length; i++) {
                if (arraySalarios[i] < menorSalario) {
                    menorSalario = arraySalarios[i];
                }
            }
            return menorSalario;
        }
        calcularMayorSalario();
        calcularMenorSalario();
    }



    function eliminarSalario() {
        const $botonQuitar = document.getElementById('boton-quitar');
        $botonQuitar.onclick = function () {
            for (let i = 1; i <= miembrosDelGrupoFamiliar; i++) {
                const $inputSalario = document.getElementById(`input-salario-${i}`);
                const $labelSalario = document.getElementById(`label-salario-${i}`);
                $inputSalario.remove();
                $labelSalario.remove();
            }
        }
    }
    eliminarSalario();

}
clase6();
