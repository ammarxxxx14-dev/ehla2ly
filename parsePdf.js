const fs = require('fs');
const PDFParser = require("pdf2json");

let pdfParser = new PDFParser(this, 1);

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFileSync("brandText.txt", pdfParser.getRawTextContent());
    console.log("PDF extraction successful!");
});

pdfParser.loadPDF("pdfs/Salonak_Brand_Identity.pdf");
