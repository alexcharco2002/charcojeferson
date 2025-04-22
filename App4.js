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

//Ejercicio 16 - interfaz de voz
const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');
const btnRead = document.getElementById('btnRead');
const textArea = document.getElementById('textArea');

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.continuous = true;
recognition.lang = 'es-ES';
recognition.interimResults = false;

btnStart.addEventListener('click', () => {
    recognition.start();
    btnStart.disabled = true;
    btnStop.disabled = false;
    textArea.value = "Escuchando...";
});

btnStop.addEventListener('click', () => {
    recognition.stop();
    btnStart.disabled = false;
    btnStop.disabled = true;
    textArea.value = "Detenido.";
});

recognition.onresult = (event) => {
    const texto = event.results[event.results.length - 1][0].transcript;
    textArea.value = texto;
}

recognition.onerror = (event) => {
    textArea.value = 'Error: ' + event.error;
    btnStart.disabled = false;
    btnStop.disabled = true;
}

btnRead.addEventListener('click', () => {
    const texto = textArea.value;
    if (texto) {
        leerTexto(texto);
    }else{
        textArea.value = 'Intoduzca un texto para leer';
    }
});

function leerTexto(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.volume = 1;
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.lang = 'es-ES';
    window.speechSynthesis.speak(speech);
}




//Ejercicio 17
//Funcion para contar letras
function contarLetras() {
    const inputElement = document.getElementById('oracionInput');
    const resultadoElement = document.getElementById('resultadoLetras');

    // Obtener la oración ingresada por el usuario
    let oracion = inputElement.value.trim().toUpperCase();
    let letrasContador = {};

    // Contar la frecuencia de cada letra en la oración
    for (let letra of oracion) {
        if (letra !== ' ') {
            if (letrasContador[letra]) {
                letrasContador[letra]++;
            } else {
                letrasContador[letra] = 1;
            }
        }
    }

    // Crear un array de letras ordenadas alfabéticamente
    let letrasOrdenadas = Object.keys(letrasContador).sort();

    // Construir el resultado
    let resultado = 'Letras  Cantidad de veces Repetidas \n'; 
    letrasOrdenadas.forEach(letra => {
        resultado += `${letra}            ${letrasContador[letra]}\n`;
    });

    // Mostrar el resultado
    resultadoElement.textContent = resultado;
}

let intentos = 0;
let numeroAntes = null;
const maxIntentos = 2;

function girarRuleta() {
    const wheel = document.querySelector('.wheel');
    const numeroUsuario = parseInt(document.getElementById("numeroUsuario").value);
    const numerodeintentos = document.getElementById('numDeIntentos');

    // Verificar si el usuario ha ingresado un número
    if (isNaN(numeroUsuario)) {
        alert("Por favor, ingrese un número antes de girar la ruleta.");
        return;
    }

    // Restaurar intentos si el usuario ingresa un nuevo número
    if (numeroAntes !== numeroUsuario) {
        intentos = 0;
        numeroAntes = numeroUsuario;
    }

    // Verificar si el usuario ha excedido el número máximo de intentos
    if (intentos >= maxIntentos) {
        alert("Has alcanzado el número máximo de intentos. Escoje un número diferente y vuelvelo a intentar.");
        return;
    }

    intentos++; // Incrementar el contador de intentos
    numerodeintentos.textContent = 'Número de intentos: ' + (maxIntentos - intentos);

    let value = Math.ceil(Math.random() * 3600);

    wheel.style.transition = "transform 3s ease-out";
    wheel.style.transform = "rotate(" + value + "deg)";

    setTimeout(() => {
        // Calcular el número seleccionado basado en la rotación
        const deg = value % 360;
        const selectedNumber = calcularNumeroSeleccionado(deg);

        // Verificar el número
        verificarNumero(selectedNumber, numeroUsuario);
    }, 3000); // Esperar a que termine la animación de la ruleta
}

function calcularNumeroSeleccionado(deg) {
    const segments = [
        { start: 0, end: 45, number: 10 },
        { start: 45, end: 90, number: 20 },
        { start: 90, end: 135, number: 30 },
        { start: 135, end: 180, number: 40 },
        { start: 180, end: 225, number: 50 },
        { start: 225, end: 270, number: 60 },
        { start: 270, end: 315, number: 70 },
        { start: 315, end: 360, number: 80 }
    ];

    for (const segment of segments) {
        if (deg >= segment.start && deg < segment.end) {
            return segment.number;
        }
    }
}

function verificarNumero(numeroAleatorio, numeroUsuario) {
    let resultado = "Esperando...";

    if (numeroUsuario === numeroAleatorio) {
        resultado = "¡Ganaste! El número coincide.";
    } else {
        resultado = "Perdiste. El número no coincide.";
    }

    // Mostrar el resultado del juego
    document.getElementById("resultadoJuego").textContent = resultado;

    // Verificar si se han agotado los intentos
    if (intentos >= maxIntentos) {
        alert("Has alcanzado el número máximo de intentos.");
    }
}


//
function mostrarTextoAMorse() {
    document.getElementById('opcionTextoAMorse').classList.remove('d-none');
    document.getElementById('opcionMorseATexto').classList.add('d-none');
    document.getElementById('botonConvertir').classList.remove('d-none');
    document.getElementById('botonConvertir').onclick = convertirAMorse;
}

function mostrarMorseATexto() {
    document.getElementById('opcionMorseATexto').classList.remove('d-none');
    document.getElementById('opcionTextoAMorse').classList.add('d-none');
    document.getElementById('botonConvertir').classList.remove('d-none');
    document.getElementById('botonConvertir').onclick = convertirATexto;
}

function convertirAMorse() {
    const texto = document.getElementById('textoInput').value.toUpperCase();
    const morse = textoAMorse(texto);
    document.getElementById('resultadoMorse').value = morse;
}

function convertirATexto() {
    const morse = document.getElementById('morseInput').value;
    const texto = morseATexto(morse);
    document.getElementById('resultadoTexto').textContent = texto;
}

function textoAMorse(texto) {
    const morseCode = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
        'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
        'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
        '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.'
    };

    let morse = '';
    for (let i = 0; i < texto.length; i++) {
        const character = texto[i];
        if (character === ' ') {
            morse += ' ';
        } else if (morseCode.hasOwnProperty(character)) {
            morse += morseCode[character] + ' ';
        }
    }
    return morse.trim();
}

function morseATexto(morse) {
    const morseCode = {
        '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F', '--.': 'G', '....': 'H',
        '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P',
        '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
        '-.--': 'Y', '--..': 'Z', '-----': '0', '.----': '1', '..---': '2', '...--': '3', '....-': '4',
        '.....': '5', '-....': '6', '--...': '7', '---..': '8', '----.': '9'
    };

    let texto = '';
    const palabras = morse.split('   '); // Separar por triple espacio para palabras
    palabras.forEach((palabra) => {
        const caracteres = palabra.split(' ');
        caracteres.forEach((caracter) => {
            if (morseCode.hasOwnProperty(caracter)) {
                texto += morseCode[caracter];
            }
        });
        texto += ' '; // Espacio entre palabras
    });

    return texto.trim();
}

    //Ejercicio 20
    const productos = [];
    let chartInstance = null;

    function agregarProducto() {
        const producto = document.getElementById('productoInput').value;
        const ventas = document.getElementById('ventasInput').value.split(',').map(Number);
        
        if (ventas.length !== 5) {
            alert("Por favor, ingrese exactamente 5 valores de ventas.");
            return;
        }
        if (ventas.some(venta => venta < 0 || !Number.isInteger(venta))) {
            alert("Por favor, ingrese valores de ventas no negativos y enteros.");
            return;
        }
        productos.push({ nombre: producto, ventas: ventas });
        document.getElementById('productoInput').value = '';
        document.getElementById('ventasInput').value = '';
    }

    function calcularProductos() {
        if (productos.length === 0) {
            alert("Por favor, agregue al menos un producto.");
            return;
        }
        
        imprimirTabla();
        
        mostrarGrafico();
        contarProductosNoVendidosMiercoles();

    }

    function imprimirTabla() {
        const resultados = document.getElementById('resultados');
        resultados.innerHTML = `
            <h5>Total de Ventas Semanales</h5>
            <table class="table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Total Vendido</th>
                    </tr>
                </thead>
                <tbody>
        `;
        productos.forEach((prod, index) => {
            const totalVentas = prod.ventas.reduce((acc, venta) => acc + venta, 0);
            resultados.innerHTML += `
                <tr>
                    <td>${index + 1}. ${prod.nombre}</td>.......................................  <td>${totalVentas}</td> <br>
                </tr>
            `;
        });
        
        resultados.innerHTML += '</tbody></table> ';
    }

    function contarProductosNoVendidosMiercoles() {
        const noVendidosMiercoles = productos.filter(prod => prod.ventas[2] === 0).length;
        const resultados = document.getElementById('resultados');
        resultados.innerHTML += `<p>Productos no vendidos los miércoles: ${noVendidosMiercoles}</p>`;
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function mostrarGrafico() {
        const ctx = document.getElementById('graficoVentas').getContext('2d');
        
        const datasets = productos.map(prod => {
            const color = getRandomColor();
            return {
                label: prod.nombre,
                data: prod.ventas,
                backgroundColor: color + '80', // Adding transparency
                borderColor: color,
                borderWidth: 1
            };
        });
    
        if (chartInstance) {
            chartInstance.destroy();
        }
    
        chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
                datasets: datasets
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

}


