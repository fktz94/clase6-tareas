/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).
*/

function calcularEdades() {
    const miembrosDelGrupoFamiliar = Number(prompt('¿cuantas personas hay en su grupo familiar?'));
    const $divInputs = document.querySelector('#inputs');

    for (let i = 1; i <= miembrosDelGrupoFamiliar; i++) {

        const labelNombre = document.createElement('label');
        labelNombre.textContent = [i] + ') Nombre del familiar:';
        labelNombre.className = 'label-nombre';
        $divInputs.appendChild(labelNombre);
        
        const inputNombre = document.createElement('input');
        inputNombre.type = 'text';
        inputNombre.className = 'input-nombre';
        $divInputs.appendChild(inputNombre);
        
        const labelEdad = document.createElement('label');
        labelEdad.textContent = 'Edad: '
        labelEdad.className = 'label-edad';
        $divInputs.appendChild(labelEdad);
        
        const inputEdad = document.createElement('input');
        inputEdad.type = 'number';
        inputEdad.className = 'input-edad';
        inputEdad.id = `input-edad-${i}`
        $divInputs.appendChild(inputEdad);
        
        const br = document.createElement('br');
        $divInputs.appendChild(br);
    }


}
calcularEdades();


