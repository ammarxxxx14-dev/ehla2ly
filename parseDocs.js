const fs = require('fs');
const path = require('path');

async function extract() {
  const pdfParseLib = require('pdf-parse');
  const pdfParse = typeof pdfParseLib === 'function' ? pdfParseLib : pdfParseLib.default;
  const mammoth = require('mammoth');

  const pdfPath = path.join(__dirname, 'pdfs', 'Salonak_Brand_Identity.pdf');
  const docxPath = path.join(__dirname, 'pdfs', 'Shilfa_MVP_Scope.docx');

  let outBuffer = '';

  outBuffer += '--- START PDF ---\n';
  try {
    if (fs.existsSync(pdfPath)) {
      const pdfBuffer = fs.readFileSync(pdfPath);
      const pdfData = await pdfParse(pdfBuffer);
      outBuffer += pdfData.text + '\n';
    } else {
      outBuffer += 'PDF not found.\n';
    }
  } catch (e) {
    outBuffer += 'PDF Error: ' + e.message + '\n';
  }
  outBuffer += '--- END PDF ---\n\n';

  outBuffer += '--- START DOCX ---\n';
  try {
    if (fs.existsSync(docxPath)) {
      const docxData = await mammoth.extractRawText({path: docxPath});
      outBuffer += docxData.value + '\n';
    } else {
      outBuffer += 'DOCX not found.\n';
    }
  } catch (e) {
    outBuffer += 'DOCX Error: ' + e.message + '\n';
  }
  outBuffer += '--- END DOCX ---\n';

  fs.writeFileSync('parsedData.txt', outBuffer, 'utf8');
}

extract().catch(e => {
  fs.writeFileSync('parsedData.txt', 'Global Error: ' + e.message, 'utf8');
});
