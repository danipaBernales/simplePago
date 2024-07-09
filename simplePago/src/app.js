const tablaPago = document.getElementById('tablaPago');
const inputMontoTotal = document.getElementById('montoTotal');
const inputAbono = document.getElementById('abono');
const inputHonorarios = document.getElementById('honorarios');
const inputCostas = document.getElementById('costas');
const inputCuotas = document.getElementById('cuotas');
const btnCalcular = document.getElementById('calcular');

function formatearMoneda(monto) {
    return '$' + monto.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

btnCalcular.addEventListener('click', function() {
    let montoTotal = parseFloat(inputMontoTotal.value);
    let abono = parseFloat(inputAbono.value);
    let honorarios = parseFloat(inputHonorarios.value);
    let costas = parseFloat(inputCostas.value);
    let cuotas = parseInt(inputCuotas.value);

    if (isNaN(montoTotal) || isNaN(abono) || isNaN(honorarios) || isNaN(costas) || isNaN(cuotas)) {
        alert('Por favor, ingresa números válidos.');
        return;
    }

    calcularPagos(montoTotal, abono, honorarios, costas, cuotas);
});

function calcularPagos(montoTotal, abono, honorarios, costas, cuotas) {
    let montoRestante = montoTotal - abono;
    let montoTotalConCostasYHonorarios = montoRestante + honorarios + costas;
    let montoCuota = Math.round(montoTotalConCostasYHonorarios / cuotas);
    let honorariosPorCuota = Math.round(honorarios / cuotas);
    let costasPorCuota = Math.round(costas / cuotas);

    let tbody = `
        <tr>
            <td>${formatearMoneda(montoCuota)}</td>
            <td>${formatearMoneda(honorariosPorCuota)}</td>
            <td>${formatearMoneda(costasPorCuota)}</td>
        </tr>
    `;

    tablaPago.querySelector('tbody').innerHTML = tbody;
}

document.addEventListener('DOMContentLoaded', function() {
    cargarTabla();
});

function cargarTabla() {
    tablaPago.querySelector('tbody').innerHTML = '';
}
