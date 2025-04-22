
// Obtener todos los botones de cierre
var closeButtons = document.querySelectorAll(".close-btn");

// Añadir evento de clic a cada botón de cierre
closeButtons.forEach(button => {
    button.addEventListener("click", function() {
        var modal = this.closest(".modal");
        $(modal).modal('hide');
    });
});

// Cerrar el modal cuando el usuario haga clic fuera del contenido del modal
window.addEventListener("click", function(event) {
    if (event.target.classList.contains("modal")) {
        $(event.target).modal('hide');
    }
});

//Ejercicio 1
// Función para calcular el ángulo de incidencia del sol
function calcularAngulo() {
    const alerta1 = document.getElementById('alerta1');
    const alerta2 = document.getElementById('alerta2');
    const camporesultado = document.getElementById('resultadoTexto');

    // Limpiar el campo de resultado
    camporesultado.innerText = '';


    alerta1.style.display = 'none';
    alerta2.style.display = 'none';
    // Obtener los valores de los inputs
    const h = parseFloat(document.getElementById('altura').value);
    const s = parseFloat(document.getElementById('sombra').value);
    
    if (isNaN(h) || isNaN(s)) {
        alerta2.style.display = 'block';
        alerta2.innerText = 'Por favor, ingrese valores válidos para la altura y la sombra.';
        return;
    } else if (h <= 0) {
        alerta1.style.display = 'block';
        alerta1.innerText = 'Por favor, ingrese valores positivos mayores que 0.';
        return;
    }else if( s <= 0){
        alerta2.style.display = 'block';
        alerta2.innerText = 'Por favor, ingrese valores positivos mayores que 0.';
        return;
    }

    // Calcular el ángulo en radianes
    const anguloRadianes = Math.atan(h / s);

    // Convertir a grados
    const anguloGrados = anguloRadianes * (180 / Math.PI);

    // Convertir grados decimales a grados, minutos y segundos
    const grados = Math.floor(anguloGrados);
    const minutosDecimales = (anguloGrados - grados) * 60;
    const minutos = Math.floor(minutosDecimales);
    const segundos = Math.floor((minutosDecimales - minutos) * 60);

    // Preparar el resultado
    const resultado = `El ángulo de incidencia con el sol es:
                       Grados: ${grados}°    Minutos: ${minutos}'  Segundos: ${segundos}"`;

    // Mostrar el resultado en el modal
    camporesultado.innerText =  resultado;
    $('#resultadoModal').modal('show');
}

//Ejemplo 2
// Función para calcular el área de un triángulo utilizando la fórmula de Herón
function calcularArea() {
    const alerta1 = document.getElementById('alertaArea1');
    const alerta2 = document.getElementById('alertaArea2');
    const alerta3 = document.getElementById('alertaArea3');
    const resultado = document.getElementById('resultadoArea') ;

    // Limpiar el campo de resultado
    resultado.innerText = '';

    alerta1.style.display = 'none';
    alerta2.style.display = 'none';
    alerta3.style.display = 'none';

    // Obtener los valores de los inputs
    const a = parseFloat(document.getElementById('ladoA').value);
    const b = parseFloat(document.getElementById('ladoB').value);
    const c = parseFloat(document.getElementById('ladoC').value);
    


    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        alerta3.style.display = 'block';
        alerta3.innerText = 'Por favor, ingrese valores válidos para los lados del triángulo.';
        return;
    } else if (a < 0 ) {
        alerta1.style.display = 'block';
        alerta1.innerText = 'Por favor, ingrese valores positivos.';
        return;
    }else if (b < 0){
        alerta2.style.display = 'block';
        alerta2.innerText = 'Por favor, ingrese valores positivos.';
        return;
    }else if( c < 0){
        alerta3.style.display = 'block';
        alerta3.innerText = 'Por favor, ingrese valores positivos.';
        return;
    }

    
    // Validar si el triángulo puede existir
     if (b >= a + c) {
        alerta2.style.display = 'block';
        alerta2.innerText = 'El lado b debe ser menor que la suma de los lados a y c.';
        return;
    } 
    if (a + b <= c || a + c <= b || b + c <= a) {
        alerta3.style.display = 'block';
        alerta3.innerText = 'Los valores ingresados no forman un triángulo válido.';
        return;
    }
    // Calcular el semiperímetro
    const s = (a + b + c) / 2;

    // Calcular el área usando la fórmula de Herón
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

    // Mostrar el resultado en el modal
    resultado.innerText = `El Área del triángulo es: ${area.toFixed(2)}`;
}

//Ejercicio 3
//funcion para calcular el  Antecesor, sucesor, raíz cuadrada y cantidad de cifras de un numero
function calcularEjer3() {
    const alertaEjer3 = document.getElementById('alertaEjer3');
    alertaEjer3.style.display = 'none';

    // Obtener el valor del input
    const numero = parseFloat(document.getElementById('numero').value);

    if (isNaN(numero)) {
        alertaEjer3.style.display = 'block';
        alertaEjer3.innerText = 'Por favor, ingrese un valor.';
        return;
    }

    // Calcular el antecesor
    const antecesor = numero - 1;

    // Calcular el sucesor
    const sucesor = numero + 1;

   // Calcular la parte entera de la raíz cuadrada
    let raizCuadradaEntera;
    if (numero > -1) {
        raizCuadradaEntera = Math.floor(Math.sqrt(numero));
    } else {
        raizCuadradaEntera = 'Un número negativo no tiene raíz cuadrada';
    }

    // Calcular la cantidad de cifras
    const cantidadCifras = contarCifrasSinPuntoDecimal(numero);

    // Preparar el resultado
    const resultado = `
        <strong> Antecesor: </strong> ${antecesor}<br>
        <strong> Sucesor: </strong>  ${sucesor}<br>
        <strong> Parte entera de la raíz cuadrada: </strong>  ${raizCuadradaEntera}<br>
        <strong> Cantidad de cifras: </strong>  ${cantidadCifras}
    `;

    // Mostrar el resultado en el modal
    document.getElementById('resultadoEjer3').innerHTML = resultado;
}
// Función para calcular la cantidad de cifras sin contar el punto decimal ni la coma
function contarCifrasSinPuntoDecimal(numero) {
    // Convertir el número a cadena y reemplazar cualquier punto decimal o coma
    let numeroSinPuntoDecimal = numero.toString().replace('.', '').replace(',', '').replace('-','').replace('+','');
    
    // Calcular la cantidad de cifras
    const cantidadCifras = numeroSinPuntoDecimal.length;
    
    return cantidadCifras;
}

//Ejercicio 4
//Funcion para calcular el salario neto de un trabajador 
function calcularEjer4() {
    let pagaBruta = 0;
    let impuestos =0;
    let pagaNeta = 0;
    
    const alertaEjer4_1 = document.getElementById('alertaEjer4_1');
    const alertaEjer4_2 = document.getElementById('alertaEjer4_2');
    const alertaEjer4_3 = document.getElementById('alertaEjer4_3');
                       
    alertaEjer4_1.style.display = 'none';
    alertaEjer4_2.style.display = 'none';
    alertaEjer4_3.style.display = 'none';


    // Obtener los valores de los inputs
    const horasTrabajadas = parseFloat(document.getElementById('horasTrabajadas').value);
    const tarifaHoraria = parseFloat(document.getElementById('tarifaHoraria').value);
    const tasaImpuestos = parseFloat(document.getElementById('tasaImpuestos').value);

    if (isNaN(horasTrabajadas) || isNaN(tarifaHoraria) || isNaN(tasaImpuestos)) {
        alertaEjer4_3.style.display = 'block';
        alertaEjer4_3.innerText = 'Por favor, ingrese valores válidos para todos los campos.';
        return;
    }  else if (horasTrabajadas <= 0 || !Number.isInteger(horasTrabajadas)) {
        alertaEjer4_1.style.display = 'block';
        alertaEjer4_1.innerText = 'Por favor, ingrese un número entero mayor a 0.';
        return;
    }else if(tarifaHoraria <= 0){
        alertaEjer4_2.style.display = 'block';
        alertaEjer4_2.innerText = 'Por favor, ingrese un valor mayor a 0';
        return;
    }else if(tasaImpuestos <= 0 || tasaImpuestos > 100){
        alertaEjer4_3.style.display = 'block';
        alertaEjer4_3.innerText = 'Por favor, ingrese un valor entre [1 - 100]';
        return;

    }
    
    // Calcular la paga bruta
     pagaBruta = horasTrabajadas * tarifaHoraria;

    // Calcular los impuestos
     impuestos = pagaBruta * (tasaImpuestos / 100);

    // Calcular la paga neta
     pagaNeta = pagaBruta - impuestos;

    // Preparar el resultado
    const resultado = `
        Paga Bruta: $${pagaBruta.toFixed(2)}<br>
        Impuestos: $${impuestos.toFixed(2)}<br>
        Paga Neta: $${pagaNeta.toFixed(2)}
    `;

    // Mostrar el resultado en el modal
    document.getElementById('resultadoEjer4').innerHTML = resultado;
}

//Ejercicio 5
function calcularEjer5() {
    const alertaEjer5_1 = document.getElementById('alertaEjer5_1');
    const alertaEjer5_2 = document.getElementById('alertaEjer5_2');
    const alertaEjer5_3 = document.getElementById('alertaEjer5_3');
    
    alertaEjer5_1.style.display = 'none';
    alertaEjer5_2.style.display = 'none';
    alertaEjer5_3.style.display = 'none';

    // Obtener los valores de los inputs
    const capitalInicial = parseFloat(document.getElementById('capitalInicial').value);
    const tasaInteres = parseFloat(document.getElementById('tasaInteres').value);
    const tiempo = parseFloat(document.getElementById('tiempo').value);

    if (isNaN(capitalInicial) || isNaN(tasaInteres) || isNaN(tiempo)) {
        alertaEjer5_3.style.display = 'block';
        alertaEjer5_3.innerText = 'Por favor, ingrese valores válidos para todos los campos.';
        return;
        
    } else if (capitalInicial <= 0 ) {
        alertaEjer5_1.style.display = 'block';
        alertaEjer5_1.innerText = 'Por favor, ingrese un valor positivo.';
        return;
    }else if(tasaInteres <= 0 || tasaInteres > 100 ){
        alertaEjer5_2.style.display = 'block';
        alertaEjer5_2.innerText = 'Por favor, ingrese un valor entre [1-100].';
        return;
    }

    // Calcular el capital final usando la fórmula de interés simple
    const capitalFinal = capitalInicial * (1 + (tasaInteres / 100) * tiempo);

    // Preparar el resultado
    const resultado = `El Capital Final es: $${capitalFinal.toFixed(2)}`;

    // Mostrar el resultado en el modal
    document.getElementById('resultadoEjer5').innerText = resultado;
}


