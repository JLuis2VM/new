import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import jsPDF from 'jspdf';
import ugelImage from '../img/ugel.png'; // Adjust the path as needed
import insigniaImage from '../img/insignia.png'; // Adjust the path as needed
import img_jorganadacompleta from '../img/img_jornadacompleta.png';

const ReportProperty = ({ idProperty, internCode }) => {
  const generatePdf = async () => {
    try {
      const response = await axios.post('http://localhost:5000/reportpropertyindividual', { id: idProperty });
      const data = response.data.results[0];

      const doc = new jsPDF();

      // Adding images and title
      doc.addImage(ugelImage, 'PNG', 10, 10, 30, 30); // UGEL image on the left
      doc.addImage(insigniaImage, 'PNG', 170, 10, 30, 30); // Badge image on the right
      doc.addImage(img_jorganadacompleta, 'PNG', 80, 0, 50, 20);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('I.E. SANTIAGO ANTUNEZ DE MAYOLO - YUNGAR', 105, 27, { align: 'center' });
      doc.setFontSize(7);
      doc.text('“Año del Bicentenario, de la consolidación de nuestra Independencia,', 105, 30, { align: 'center' });
      doc.text('“y de la conmemoración de las Heroicas Batallas de Junín y Ayacucho”', 105, 33, { align: 'center' });
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('FICHA TECNICA', 105, 40, { align: 'center' });

      doc.setLineWidth(0.5);
      doc.line(10, 42, 200, 42);

      // Setting font for the details
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');

      // Drawing frames
      const startY = 50;
      const lineHeight = 10;
      const startX = 20;
      const endX = 190;
      const boxHeight = lineHeight + 2;

      // First Row: Name, Brand
      doc.rect(startX, startY, (endX - startX) / 2, boxHeight); // Name
      doc.rect((endX + startX) / 2, startY, (endX - startX) / 2, boxHeight); // Brand
      doc.text(`Nombre: ${data.name}`, startX + 2, startY + lineHeight);
      doc.text(`Marca: ${data.mark}`, (endX + startX) / 2 + 2, startY + lineHeight);

      // Second Row: Series, Model
      doc.rect(startX, startY + boxHeight, (endX - startX) / 2, boxHeight); // Series
      doc.rect((endX + startX) / 2, startY + boxHeight, (endX - startX) / 2, boxHeight); // Model
      doc.text(`Serie: ${data.serie}`, startX + 2, startY + boxHeight + lineHeight);
      doc.text(`Modelo: ${data.property_model}`, (endX + startX) / 2 + 2, startY + boxHeight + lineHeight);

      // Third Row: Black Line
      doc.setLineWidth(2);
      doc.line(startX, startY + 2 * boxHeight + boxHeight / 2, endX, startY + 2 * boxHeight + boxHeight / 2);
      doc.setLineWidth(0.5);

      // Fourth Row: Internal Code, Entry Date
      doc.rect(startX, startY + 3 * boxHeight, (endX - startX) / 2, boxHeight); // Internal Code
      doc.rect((endX + startX) / 2, startY + 3 * boxHeight, (endX - startX) / 2, boxHeight); // Entry Date
      doc.text(`Código Interno: ${data.intern_code}`, startX + 2, startY + 3 * boxHeight + lineHeight);
      doc.text(`Fecha de Ingreso: ${new Date(data.property_entry_date).toLocaleDateString()}`, (endX + startX) / 2 + 2, startY + 3 * boxHeight + lineHeight);

      // Middle of the page: Status
      const middleY = startY + 4.5 * boxHeight;
      doc.rect(startX, middleY, endX - startX, boxHeight); // Status
      doc.text(`Estado: ${data.state_name}`, startX + 2, middleY + lineHeight);

      // Bottom part: Description
      const descriptionY = middleY + boxHeight + 5;
      const descriptionHeight = 60; // Adjust height as needed
      doc.rect(startX, descriptionY, endX - startX, descriptionHeight); // Description
      doc.text(`Descripción:`, startX + 2, descriptionY + lineHeight);
      doc.text(`${data.description}`, startX + 2, descriptionY + 2 * lineHeight, { maxWidth: endX - startX - 4 });
      // Signature Lines
      const bottomY =200; 
      const signatureY = bottomY + 20; // Adjust Y position as needed
      doc.text('Firma Encargado', startX, signatureY);
      doc.line(startX, signatureY + 10, startX + 50, signatureY + 10); // Manager signature line
      doc.text('Firma Director', endX - 60, signatureY);
      doc.line(endX - 60, signatureY + 10, endX - 10, signatureY + 10); // Director signature line

      // Current Date
      const currentDate = new Date().toLocaleDateString();
      // Adjust Y position as needed
      doc.text(`Fecha de Emición de Ficha: ${currentDate}`, startX, bottomY);

      
      doc.save(`Ficha Técnica ${data.intern_code}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <button
      className="text-blue-500 hover:text-blue-700"
      onClick={generatePdf}
    >
      <FontAwesomeIcon icon={faFilePdf} />
    </button>
  );
};

export default ReportProperty;
