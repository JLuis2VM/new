import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ugelImage from '../img/ugel.png'; // Adjust the path as needed
import insigniaImage from '../img/insignia.png'; // Adjust the path as needed

const PageReportsLending = () => {
  const generatePdf = async () => {
    try {
      const response = await axios.get('http://localhost:5000/reportlending');
      const data = response.data;

      const doc = new jsPDF();

      doc.addImage(ugelImage, 'PNG', 10, 10, 30, 30); // UGEL image on the left
      doc.addImage(insigniaImage, 'PNG', 170, 10, 30, 30); // Badge image on the right
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('I.E. SANTIAGO ANTUNEZ DE MAYOLO - YUNGAR', 105, 20, { align: 'center' });
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text('Reporte de Prestamos', 105, 30, { align: 'center' });

      doc.setLineWidth(0.5);
      doc.line(10, 42, 200, 42);

      const columns = [
        { header: 'Nombre', dataKey: 'property_name' },
        { header: 'Numero de serie', dataKey: 'property_serie' },
        { header: 'Codigo Interno', dataKey: 'property_intern_code' },
        { header: 'Docente', dataKey: 'teacher_name' },
        { header: 'Especialidad', dataKey: 'nom_specialty' },
      ];

      const rows = data.map(item => [
        `${item.property_name}`,
        `${item.property_serie}`,
        `${item.property_intern_code}`,
        `${item.teacher_name}`,
        `${item.nom_specialty}`,
      ]);

      doc.autoTable({
        head: [columns.map(col => col.header)],
        body: rows,
        startY: 55,
        theme: 'striped',
        columnStyles: {
          0: { cellWidth: 'auto' }, // Asset Name
          1: { cellWidth: 'auto' }, // Serial Number
          2: { cellWidth: 'auto' }, // Internal Code
          3: { cellWidth: 'auto' }, // Loaned Teacher
          4: { cellWidth: 'auto' }, // Specialty
        },
        styles: { fontStyle: 'normal', fontSize: 12 },
      });

      doc.setFontSize(10);
      doc.text('SISTEMA CIST', 105, 285, { align: 'center' });

      doc.save('Reporte Prestamos.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded inline-flex items-center"
        onClick={generatePdf}
      >
        <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
        Generar Reporte
      </button>
    </div>
  );
};

export default PageReportsLending;
