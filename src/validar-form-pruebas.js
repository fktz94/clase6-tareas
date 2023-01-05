function probarValidarInputs() {
    console.assert(
        validarInput('') === 'Debe ingresar un número',
        'validarInput no funcionó con un string vacío'
    );
    console.assert(
        validarInput(
            'asdasd./sdas +assasd') === 'Solo puedes ingresar números',
        'validarInput no funcionó con un string de letras'
    );
    console.assert(
        validarInput(12) === '',
        'validarInput no funcionó con un número válido'
    );

}
probarValidarInputs();

