// SaveToPDF.js
import React, { useRef } from 'react';
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const SaveToPDF = () => {
  const contentRef = useRef();

  const handleSavePDF = () => {
    const content = contentRef.current.innerHTML;
    const pdfContent = htmlToPdfmake(content);
    const documentDefinition = { content: pdfContent };

    pdfMake.createPdf(documentDefinition).download('document.pdf');
  };

  return (
    <div>
      <div ref={contentRef}>
        <h1>Hello, this is content to save as PDF!</h1>
        <p>Save this content as a PDF document.</p>
      </div>
      <button onClick={handleSavePDF}>Save to PDF</button>
    </div>
  );
};

export default SaveToPDF;
