import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ugelImage from '../img/ugel.png';
import insigniaImage from '../img/insignia.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

const PageReportLendingForDate = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const generatePdf = async () => {
    try {
      const response = await axios.post('http://localhost:5000/reportlendingfordate', {
        deliver_date_start: startDate,
        deliver_date_finish: endDate,
      });
      const data = response.data.results;

      const doc = new jsPDF();

      doc.addImage(ugelImage, 'PNG', 10, 10, 30, 30);
      doc.addImage(insigniaImage, 'PNG', 170, 10, 30, 30);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('I.E. SANTIAGO ANTUNEZ DE MAYOLO - YUNGAR', 105, 20, { align: 'center' });
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text('Reporte de Prestamos', 105, 30, { align: 'center' });
      doc.text(`Desde: ${startDate} Hasta: ${endDate}`, 105, 40, { align: 'center' });

      doc.setLineWidth(0.5);
      doc.line(10, 45, 200, 45);

      const columns = [
        { header: 'Nombre', dataKey: 'property_name' },
        { header: 'Serie', dataKey: 'property_serie' },
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
        startY: 50,
        theme: 'striped',
        columnStyles: {
          0: { cellWidth: 'auto' },
          1: { cellWidth: 'auto' },
          2: { cellWidth: 'auto' },
          3: { cellWidth: 'auto' },
          4: { cellWidth: 'auto' },
        },
        styles: { fontStyle: 'normal', fontSize: 12 },
      });

      doc.setFontSize(10);
      doc.text('CIST SYSTEM', 105, 285, { align: 'center' });

      doc.save('loan_list_by_date.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="p-5">
      <div className="bg-white rounded border border-gray-300 p-5">
        <form
          onSubmit={e => {
            e.preventDefault();
            generatePdf();
          }}
          className="flex items-center space-x-4"
        >
          <div className="mb-4">
            <label className="block mb-2">Fecha Inicio:</label>
            <input
              type="date"
              className="border py-2 px-4"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Fecha Final:</label>
            <input
              type="date"
              className="border py-2 px-4"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded inline-flex items-center"
          >
            <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
            Generar Reporte
          </button>
        </form>
      </div>
    </div>
  );
};

export default PageReportLendingForDate;
