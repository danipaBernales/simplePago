const tablaPago = document.getElementById('tablaPago');
const tablaAbono = document.getElementById('tablaAbono');
const inputMontoTotal = document.getElementById('montoTotal');
const inputAbono = document.getElementById('abono');
const inputHonorarios = document.getElementById('honorarios');
const inputCostas = document.getElementById('costas');
const inputCuotas = document.getElementById('cuotas');
const btnCalcular = document.getElementById('calcular');
const btnLimpiar = document.getElementById('limpiar');

function formatearMoneda(monto) {
    return '$' + monto.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

btnCalcular.addEventListener('click', calcular);

btnLimpiar.addEventListener('click', function() {
    inputMontoTotal.value = '';
    inputAbono.value = '';
    inputHonorarios.value = '';
    inputCostas.value = '';
    inputCuotas.value = '';
    tablaAbono.querySelector('tbody').innerHTML = '';
    tablaPago.querySelector('tbody').innerHTML = '';
});

function calcular() {
    let montoTotal = parseFloat(inputMontoTotal.value) || 0;
    let abono = parseFloat(inputAbono.value) || 0;
    let honorarios = parseFloat(inputHonorarios.value) || 0;
    let costas = parseFloat(inputCostas.value) || 0;
    let cuotas = parseInt(inputCuotas.value) || 1;

    if (montoTotal === 0) {
        alert('Por favor, ingresa un monto total válido.');
        return;
    }

    calcularPagos(montoTotal, abono, honorarios, costas, cuotas);
}

function calcularPagos(montoTotal, abono, honorarios, costas, cuotas) {
    let porcentajeAbono = abono / montoTotal;
    let honorariosAbono = honorarios * porcentajeAbono;
    let costasAbono = costas * porcentajeAbono;

    let montoRestante = montoTotal - abono;
    let montoTotalConCostasYHonorarios = montoRestante + honorarios + costas;
    let montoCuota = montoTotalConCostasYHonorarios / cuotas;
    let honorariosPorCuota = (honorarios - honorariosAbono) / cuotas;
    let costasPorCuota = (costas - costasAbono) / cuotas;

    // Mostrar detalle del abono
    let abonoTbody = `
        <tr>
            <td>${formatearMoneda(abono + honorariosAbono + costasAbono)}</td>
            <td>${formatearMoneda(honorariosAbono)}</td>
            <td>${formatearMoneda(costasAbono)}</td>
        </tr>
    `;

    tablaAbono.querySelector('tbody').innerHTML = abonoTbody;

    // Mostrar resumen de las cuotas
    let pagoTbody = `
        <tr>
            <td>${formatearMoneda(montoCuota)}</td>
            <td>${formatearMoneda(honorariosPorCuota)}</td>
            <td>${formatearMoneda(costasPorCuota)}</td>
        </tr>
    `;

    tablaPago.querySelector('tbody').innerHTML = pagoTbody;
}

document.addEventListener('DOMContentLoaded', function() {
    cargarTablas();
});

function cargarTablas() {
    tablaAbono.querySelector('tbody').innerHTML = '';
    tablaPago.querySelector('tbody').innerHTML = '';
}
