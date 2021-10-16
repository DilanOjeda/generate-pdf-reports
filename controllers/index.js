const PDFDocument = require('pdfkit-construct');
const fs = require('fs');
const { response } = require('express');

const {customers, customer} = require('../models');

const generatePDF = (req, res=response) => {
    // Create a document
    let doc = new PDFDocument({ margin: 50 });
    // const fileName = `Resport-${new Date()}.pdf`;
    const fileName = `Resport.pdf`;
    
    const stream = res.writeHead(200, {
        'Contenct-Type': 'application/pdf',
        'Content-Disposition': `attachment;filename=${fileName}`
    });

    doc.on('data', (data) => {stream.write(data)});
    doc.on('end', () => {stream.end()});

    generateHeader(doc, customer);
    generateTable(doc, customer);
    doc.render();
    doc.end();
}

function generateHeader(doc, customer) {
    doc.setDocumentHeader({
        height: '25%'
    }, () => {
        generateReportInfo(doc, customer)
        generateLoanformation(doc, customer)
    });

}

function generateFooter(doc) {
    doc
        .fontSize(10)
        .text(
            "Payment is due within 15 days. Thank you for your business.",
            50,
            725,
            { align: "center", width: 500 }
        );
}

function generateReportInfo(doc, customer) {
    doc
        .image("public/img/pdf-icon.png", 50, 45, { width: 50 })
        .fillColor("#444444")
        .fontSize(20)
        .text("LendMoney", 110, 57)
        .fontSize(12)
        .text("REPORTE DE PRESTAMO POR CLIETE", 200, 65, { align: "right" })
        .text("jue, 04-09-2021", 200, 80, { align: "right" })
        .text("Dilan Angel Ojeda Flores", 200, 95, { align: "right" })
        .moveDown();
}
function generateLoanformation(doc, customer) {
    const {info} = customer;
    doc.fontSize(18).text(`Detalles`, 50, 100, { align: "center" })
    doc.moveTo(50, 120).lineTo(550, 120).stroke();
    doc
        .fontSize(11).text(`Monto Prestado: 4000.00`, 50, 130)
        .text(`Interes del Prestamo: 3.00 %`, 50, 145)
        .text(`Nº de Cuototas: 33`, 50, 160)
        .text(`Monto x Cuota: 124.84`, 50, 175)

        .text(`Número del Prestamo: 14`, 300, 130)
        .text(`Modalidad del Pago: Diario`, 300, 145)
        .text(`Fecha del Prestamo: jue, 3-Julio-2021`, 300, 160)
        .text(`Estado del Prestamo: Sin Cancelar`, 300, 175)
        .moveDown();
    doc
        .moveTo(50, 190)
        .lineTo(550, 190)
        .stroke()
}

const generateTable = (doc, customer) => {
    const {fees} = customer;
    doc.addTable([
        {key: 'numberFee', label: 'Nº Cuota', align: 'center'},
        {key: 'feePaymentDate', label: 'Fecha Pago', align: 'center'},
        {key: 'feeAmount', label: 'Total Pagar', align: 'center'},
        {key: 'feeStatus', label: 'Estado', align: 'center'},
    ],
    fees, {
        headBackground : '#abc6f0',
        headColor : '#000',
        headFontSize : 11,
        border: null,
        width: "fill_body",
        striped: true,
        stripedColors: ["#f6f6f6", "#d6c4dd"],
        cellsPadding: 8,
        marginLeft: 45,
        marginRight: 45,
        headAlign: 'center',
        cellsFontSize : 11,
    });
}
module.exports = {
    generatePDF,
}