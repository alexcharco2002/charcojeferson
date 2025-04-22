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

//Ejercicio 6
//Funcion para clasificar la nota de un estudiante 
function clasificarNota() {
    const alerta = document.getElementById('alerta1');
    const resultado = document.getElementById('resultadoNota');
    
    alerta.style.display = 'none';

     // Limpiar el campo de resultado
     resultado.innerText = '';

    // Obtener el valor de la nota
    const nota = parseFloat(document.getElementById('nota').value);

    if (isNaN(nota) || nota < 0 || nota > 100) {
        alerta.style.display = 'block';
        alerta.innerText = 'Por favor, ingrese una nota válida entre 0 y 100.';
        return;
    }

    let categoria;

if (nota >= 95 && nota <= 100) {
    categoria = '<strong>Excelente</strong>';
} else if (nota >= 90 && nota < 95) {
    categoria = '<strong>Muy Bien</strong>';
} else if (nota >= 80 && nota < 90) {
    categoria = '<strong>Bien</strong>';
} else if (nota >= 60 && nota < 80) {
    categoria = '<strong>Regular</strong>';
} else {
    categoria = '<strong>Insuficiente</strong>';
}

// Mostrar el resultado en el modal
document.getElementById('resultadoNota').innerHTML = `La categoría de la nota es: ${categoria}`;
}

//Ejercicio 7
//Funcion para clasificar los numeros 
function clasificarNumero() {
    const alerta = document.getElementById('alerta2');
    const resultado = document.getElementById('resultadoNum');
    alerta.style.display = 'none';

    // Limpiar el campo de resultado
    resultado.innerText = '';

    // Obtener el valor del número
    const numero = document.getElementById('numero').value;

    // Verificar si el número es un entero
    if (isNaN(numero) || !Number.isInteger(parseFloat(numero))) {
        alerta.style.display = 'block';
        alerta.innerText = 'Por favor, ingrese un número entero válido.';
        return;
    }

    const numeroEntero = parseInt(numero, 10);

    const positivoNegativo = (numeroEntero >= 0) ? `${numeroEntero} es un número positivo` : `${numeroEntero} es negativo`;
    const parImpar = (numeroEntero % 2 === 0) ? `${numeroEntero} es un número par` : `${numeroEntero} es impar`;
    const multiplo5 = (numeroEntero % 5 === 0) ? `${numeroEntero} es múltiplo de 5` : `${numeroEntero} no es múltiplo de 5`;
    const multiplo10 = (numeroEntero % 10 === 0) ? `${numeroEntero} es múltiplo de 10` : `${numeroEntero} no es múltiplo de 10`;
    const mayorMenor100 = (numeroEntero > 100) ? `${numeroEntero} es mayor que 100` : `${numeroEntero} es menor que 100`;

    // Preparar el resultado
    const resultadoTexto = `${positivoNegativo}\n${parImpar}\n${multiplo5}\n${multiplo10}\n${mayorMenor100}`;

    // Mostrar el resultado en el modal
    resultado.innerText = resultadoTexto;
}

//Ejercicio 8
//Funcion para Sacar las raices cuadradoas de la ecuacion
function calcularEcuacion() {
    const alerta = document.getElementById('alerta8');
    const resultado = document.getElementById('resultadoEcuacion');
    alerta.style.display = 'none';

    // Limpiar el campo de resultado
    resultado.innerText = '';

    // Obtener los valores de los coeficientes
    const a = parseFloat(document.getElementById('coefA').value);
    const b = parseFloat(document.getElementById('coefB').value);
    const c = parseFloat(document.getElementById('coefC').value);

    // Validar que los coeficientes sean números
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        alerta.style.display = 'block';
        alerta.innerText = 'Por favor, ingrese valores válidos para los coeficientes.';
        return;
    }else if (a === 0) {
        alerta.style.display = 'block';
        alerta.innerText = 'El coeficiente "a" no puede ser 0.';
        return;
    }
     // Validar que 'b' y 'c' no sean cero
     if (b === 0) {
        alerta.style.display = 'block';
        alerta.innerText = 'El coeficiente "b" no puede ser 0.';
        return;
    }
    if (c === 0) {
        alerta.style.display = 'block';
        alerta.innerText = 'El coeficiente "c" no puede ser 0.';
        return;
    }
    // Calcular el discriminante
    const discriminante = b * b - 4 * a * c;

    // Verificar la naturaleza de las raíces
    if (discriminante > 0) {
        const raiz1 = (-b + Math.sqrt(discriminante)) / (2 * a);
        const raiz2 = (-b - Math.sqrt(discriminante)) / (2 * a);
        resultado.innerText = `Los valores de las raíces son reales y diferentes: \nRaíz 1: ${raiz1.toFixed(2)}\nRaíz 2: ${raiz2.toFixed(2)}`;
    } else if (discriminante === 0) {
        const raiz = -b / (2 * a);
        resultado.innerText = `Los valores de las raíces son reales e iguales: \nRaíz: ${raiz.toFixed(2)}`;
    } else {
        resultado.innerText = 'Las raíces no tienen solución ya que no son reales.';
    }
}

//Ejercicio 9
//Funcion para el calculo del costo del alquiler de automoviles
function calcularAlquiler() {
    const alerta = document.getElementById('alerta9');
    const resultado = document.getElementById('resultadoAlquiler');
    alerta.style.display = 'none';

    // Limpiar el campo de resultado
    resultado.innerText = '';

    // Obtener los kilómetros recorridos
    const kmRecorridos = parseFloat(document.getElementById('kmRecorridos').value);

    // Validar que los kilómetros sean un número
    if (isNaN(kmRecorridos)) {
        alerta.style.display = 'block';
        alerta.innerText = 'Por favor, ingrese un valor válido para los kilómetros recorridos.';
        return;
    }else if(kmRecorridos <= 0){
        alerta.style.display = 'block';
        alerta.innerText = 'Por favor, ingrese un valor válido mayor a 0 .';
        return;
    }

    const tarifaBase = 300000;
    const tarifaAdicional300 = 15000;
    const tarifaAdicional1000 = 10000;
    const iva = 0.20;

    let montoTotal;
    if (kmRecorridos <= 300) {
        montoTotal = tarifaBase;
    } else if (kmRecorridos <= 1000) {
        montoTotal = tarifaBase + (kmRecorridos - 300) * tarifaAdicional300;
    } else {
        montoTotal = tarifaBase + (1000 - 300) * tarifaAdicional300 + (kmRecorridos - 1000) * tarifaAdicional1000;
    }

    const montoSinIva = montoTotal / (1 + iva);
    const montoIva = montoTotal - montoSinIva;

    resultado.innerText = `Su monto total a pagar: $${montoTotal.toFixed(2)}\nSu monto sin IVA: $${montoSinIva.toFixed(2)}\nEl monto del IVA: $${montoIva.toFixed(2)}`;
}

//Ejercicio 10
//Funcion para calcular la edad de una persona
function calcularEdad() {
    const alerta = document.getElementById('alerta10');
    const resultado = document.getElementById('resultadoEdad');
    alerta.style.display = 'none';

    // Limpiar el campo de resultado
    resultado.innerText = '';

    // Obtener la fecha de nacimiento
    const fechaNacimiento = document.getElementById('diaNacimiento').value;

    // Validar que se haya ingresado una fecha
    if (!fechaNacimiento) {
        alerta.style.display = 'block';
        alerta.innerText = 'Por favor, ingrese una fecha de nacimiento.';
        return;
    }

    // Crear objeto de fecha de nacimiento
    const fechaNacimientoDate = new Date(fechaNacimiento);

    // Calcular la edad
    const hoy = new Date();
    let edadAnos = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
    let edadMeses = hoy.getMonth() - fechaNacimientoDate.getMonth();
    let edadDias = hoy.getDate() - fechaNacimientoDate.getDate();

    // Ajustar los años si el mes de hoy es menor que el mes de nacimiento
    if (edadMeses < 0) {
        edadAnos--;
        edadMeses += 12;
    }

    // Ajustar los días si el día de hoy es menor que el día de nacimiento
    if (edadDias < 0) {
        edadMeses--;
        if (edadMeses < 0) {
            edadAnos--;
            edadMeses += 12;
        }
        // Obtener el último día del mes anterior
        const ultimoDiaMesAnterior = new Date(hoy.getFullYear(), hoy.getMonth(), 0).getDate();
        edadDias += ultimoDiaMesAnterior;
    }

    resultado.innerText = `Su edad es: ${edadAnos} años, ${edadMeses} meses, y ${edadDias} días`;
}




