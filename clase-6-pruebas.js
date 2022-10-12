function probarValidarInputs() {
    console.assert(
        validarInputs('') === 'Debe ingresar un número',
        'validarInputs no funcionó con un string vacío'
    );
    console.assert(
        validarInputs(
            'asdasd./sdas assasd') === 'Solo puedes ingresar números',
        'validarInputs no funcionó con un string de letras'
    );
    console.assert(
        validarInputs(12) === 'Perfecto',
        'validarInputs no funcionó con un número válido'
    );

}
probarValidarInputs();

