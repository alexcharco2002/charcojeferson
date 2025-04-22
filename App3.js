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


//Ejercicio 11
//funcion para comprobar si el numero tiene la propiedad
function encontrarPropiedadCuriosa(){
    const alerta = document.getElementById('alerta11');
    const resultado = document.getElementById('resultadoCurioso');

    alerta.style.display = 'none';

    // Limpiar el campo de resultado
    resultado.innerText = '';

    //obtener  el numero hasta donde quiere vizualizar el usuario
    let numero =  parseFloat(document.getElementById('propiedadCuriosa').value);
   

    let numerosCuriosos = [];

    for (let i = 10; i <= numero; i++) {
        for (let j = i + 1; j < 200; j++) {
            if( i === numero  ){
                let producto1 = i * j;
                let iInvertido = parseInt(i.toString().split('').reverse().join(''));
                let jInvertido = parseInt(j.toString().split('').reverse().join(''));
                let producto2 = iInvertido * jInvertido;

                if (producto1 === producto2) {
                    numerosCuriosos.push(`${i} x ${j} = ${producto1}`);
                }
            }
            
        }
    }

    if (numerosCuriosos.length > 0) {
        resultado.innerText = numerosCuriosos.join('\n');
    } else {
        resultado.innerText = 'No se encontraron números que cumplan con la propiedad.';
    }
}

//Ejercicio 12
// Función para saber si es un número primo
function esPrimo(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;

    if (num % 2 === 0 || num % 3 === 0) return false;

    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

function verificarNumeroConPropiedad(num) {
    let divisores = [1];

    if (num % 5 === 0) {
        divisores.push(5, num);

        for (let i = 2; i < num; i++) {
            if (num % i === 0 && esPrimo(i)) {
                divisores.push(i);
            }
        }

        if (divisores.length > 3) {
            return {
                cumple: true,
                divisores: divisores
            };
        }
    }
    return {
        cumple: false,
        divisores: []
    };
}

function encontrarNumerosConPropiedad() {
    const numeroUsuario = document.getElementById('numeroUsuario').value;
    const resultado = document.getElementById('resultadoNumeros');

    // Limpiar el campo de resultado
    resultado.innerText = '';

    if (numeroUsuario) {
        const num = parseInt(numeroUsuario, 10);

        if (num >= 1200 && num <= 2000) {
            const verificacion = verificarNumeroConPropiedad(num);
            if (verificacion.cumple) {
                resultado.innerText = `${num} cumple con la propiedad.\n Los divisores son: 
                 ${verificacion.divisores.join(', ')}`;
            } else {
                resultado.innerText = `${num} no cumple con la propiedad.`;
            }
        } else {
            resultado.innerText = 'Por favor, ingrese un número entre 1200 y 2000.';
        }
    } else {
        let numerosValidos = [];

        for (let num = 1200; num <= 2000; num++) {
            const verificacion = verificarNumeroConPropiedad(num);
            if (verificacion.cumple) {
                numerosValidos.push(`${num} (Divisores: ${verificacion.divisores.join(', ')})`);
            }
        }

        if (numerosValidos.length > 0) {
            resultado.innerText = `Números que cumplen con la propiedad:\n${numerosValidos.join('\n')}`;
        } else {
            resultado.innerText = 'No se encontraron números que cumplan con la propiedad.';
        }
    }
}


//Ejercicio 14
//Funcion para generar la serie de fibonacci
function fibonacci(n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function generarFibonacci() {
    const alerta = document.getElementById('alerta14');
    const numElementos = document.getElementById('numElementos').value;
    const resultado = document.getElementById('resultadoFibonacci');

    alerta.style.display = 'none';
    resultado.innerText = ''; // Limpiar resultado previo

    if (numElementos && numElementos > 0) {
        const num = parseInt(numElementos, 10);
        let serie = [];
        for (let i = 0; i < num; i++) {
            serie.push(fibonacci(i));
        }
        resultado.innerText = `Serie de Fibonacci (${num} elementos): ${serie.join(', ')}`;
    } else {
        alerta.style.display = 'block';
        alerta.innerText = 'Por favor, ingrese un número natural válido.';
        return;
    }
}

//Ejercicios
// Función para contar las vocales
function contarVocales(cadena) {
    const vocales = ['a', 'e', 'i', 'o', 'u'];
    let contador = 0;

    for (let char of cadena.toLowerCase()) {
        if (vocales.includes(char)) {
            contador++;
        }
    }

    return contador;
}

function procesarCadenas(cadena) {
    const resultadoElement = document.getElementById('resultadoCadenas');
    const totalElement = document.getElementById('totalCadenas');

    let totalCaracteres = parseInt(totalElement.dataset.totalCaracteres || 0);
    let totalVocales = parseInt(totalElement.dataset.totalVocales || 0);
    let cadenaReversa = totalElement.dataset.cadenaReversa || '';
    let palabrasMenorTres = parseInt(totalElement.dataset.palabrasMenorTres || 0);

    if (cadena === '') {
        resultadoElement.innerHTML = `
            Número total de caracteres introducidos: ${totalCaracteres} <br>
            Número total de vocales introducidas: ${totalVocales} <br>
            Número de palabras menores de tres caracteres: ${palabrasMenorTres} <br>
            Cadena total leída al revés: ${cadenaReversa.trim()}
        `;

        // Resetear los datos almacenados
        totalElement.dataset.totalCaracteres = 0;
        totalElement.dataset.totalVocales = 0;
        totalElement.dataset.cadenaReversa = '';
        totalElement.dataset.palabrasMenorTres = 0;
        return;
    }

    totalCaracteres += cadena.length;
    totalVocales += contarVocales(cadena);

    if (cadena.length < 3) {
        palabrasMenorTres++;
    }

    cadenaReversa = cadena + ' ' + cadenaReversa;

    totalElement.dataset.totalCaracteres = totalCaracteres;
    totalElement.dataset.totalVocales = totalVocales;
    totalElement.dataset.cadenaReversa = cadenaReversa;
    totalElement.dataset.palabrasMenorTres = palabrasMenorTres;

    document.getElementById('cadenaTexto').value = ''; // Limpiar el campo de entrada
}

document.getElementById('cadenaTexto').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        procesarCadenas(this.value.trim());
    }
});
