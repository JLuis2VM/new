const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const connection = require('./db');
const app = express();
const axios = require('axios');

app.use(cors());
app.use(bodyParser.json());
  app.post('/login/:usuario/:contrasena', (req, res) => {
    const { usuario, contrasena } = req.params;
  
    if (!usuario) {
      return res.status(400).json({ error: 'Usuario es requerido' });
    }
  
    if (!contrasena) {
      return res.status(400).json({ error: 'Contraseña es requerida' });
    }
  
    const query = 'SELECT * FROM users_app WHERE users_app_usr = ? AND users_app_psw = ?';
    connection.query(query, [usuario, contrasena], (err, resultado) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Error executing query' });
      }
  
      if (resultado.length > 0) {
        res.json({ message: '1' }); // Si el resultado es encontrado, responde con '1'
      } else {
        res.json({ message: '0' }); // Si el resultado no es encontrado, responde con '0'
      }
    });
});
app.use(bodyParser.json());
app.post('/regestuaidnte', (req, res) => {
  const {
      par_name, par_relat, par_email, par_phone,
      par_iddocu, par_docunum,
      stu_fn, stu_fln, stu_sln, stu_dt, stu_dn,
      stu_demi, stu_birth,
      id_sec, id_deg, stu_dic
  } = req.body;

  const query = `
      CALL pa_student(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(query, [
      par_name, par_relat, par_email, par_phone,
      par_iddocu, par_docunum,
      stu_fn, stu_fln, stu_sln, stu_dt, stu_dn,
      stu_demi, stu_birth,
      id_sec, id_deg, stu_dic
  ], (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'Student registered successfully', results });
  });
});
app.post('/regteacher', (req, res) => {
  const {
      tea_name, tea_fln, tea_sln, id_dt,
      tea_dn, tea_ded,
      tea_bd, tea_spec, tea_pn, tea_email
  } = req.body;

  const query = `
      CALL pa_teacher(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  connection.query(query, [
      tea_name, tea_fln, tea_sln, id_dt,
      tea_dn, tea_ded,
      tea_bd, tea_spec, tea_pn, tea_email
  ], (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'Teacher registered successfully', results });
  });
});
app.post('/regactivo', (req, res) => {
  const {
    act_name, act_mark, act_serie, act_model,
    act_intern_code, act_entry_date,
    act_description
  } = req.body;

  const query = `
      CALL pa_propery(?, ?, ?, ?, ?, ?, ?)`;
  connection.query(query, [
    act_name, act_mark, act_serie, act_model,
    act_intern_code, act_entry_date,
    act_description
  ], (err, results) => {
      try {
        res.status(200).json({ message: 'Property registered successfully', results });
      } catch (error) {
       
      }

  });
});
app.post('/editteacher', (req, res) => {
  const {
    id_teacher, id_people, email, phoneNum,
    emitionDate
  } = req.body;

  const query = `
      CALL pa_editteacher(?, ?, ?, ?, ?)`;
  connection.query(query, [
    id_teacher, id_people, email, phoneNum,
    emitionDate
  ], (err, results) => {
      try {
        res.status(200).json({ message: 'Docente actualizado exitosamente', results });
      } catch (error) {
        return res.status(500).json({ error: err.message });
      }

  });
});
app.get('/grado', (req, res) => {
  const query = ' select * from degree';
  connection.query(query,(err, resultado) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Error executing query' });
    }
    else
    {
      res.json(resultado);
    }
  });
});

app.get('/propertylist', (req, res) => {
  const query = ' select * from view_property';
  connection.query(query,(err, resultado) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Error executing query' });
    }
    else
    {
      res.json(resultado);
    }
  });
});
app.get('/listdocentes', (req, res) => {
  const query = ' select * from view_teacher';
  connection.query(query,(err, resultado) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Error executing query' });
    }
    else
    {
      res.json(resultado);
    }
  });
});
app.get('/docutype', (req, res) => {
  const query = ' select * from document_type';
  connection.query(query,(err, resultado) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Error executing query' });
    }
    else
    {
      res.json(resultado);
    }
  });
});
app.get('/seccion', (req, res) => {
  const query = ' select * from section';
  connection.query(query,(err, resultado) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Error executing query' });
    }
    else
    {
      res.json(resultado);
    }
  });
});
app.get('/state', (req, res) => {
  const query = ' select * from state';
  connection.query(query,(err, resultado) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Error executing query' });
    }
    else
    {
      res.json(resultado);
    }
  });
});
app.get('/specialty', (req, res) => {
  const query = ' select * from specialty';
  connection.query(query,(err, resultado) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Error executing query' });
    }
    else
    {
      res.json(resultado);
    }
  });
});
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post('/editprop', (req, res) => {
  const {
    id_property, property_name, property_mark, property_model,
    property_intern_code,property_serial,id_state,property_description
  } = req.body;

  const query = `
      CALL pa_editprop(?, ?, ?, ?, ?, ?, ?, ? )`;
  connection.query(query, [
    id_property, property_name, property_mark, property_model,
    property_intern_code,property_serial,id_state,property_description
  ], (err, results) => {
      try {
        res.status(200).json({ message: 'Activo actualizado exitosamente', results });
      } catch (error) {
        return res.status(500).json({ error: err.message });
      }
      /*if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'Property registered successfully', results });*/
  });
});

app.get('/tableteacher', (req, res) => {
  const query = ' select * from view_table_teacher';
  connection.query(query,(err, resultado) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Error executing query' });
    }
    else
    {
      res.json(resultado);
    }
  });
});
app.get('/tableproperty', (req, res) => {
  const query = ' select * from view_table_property';
  connection.query(query,(err, resultado) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Error executing query' });
    }
    else
    {
      res.json(resultado);
    }
  });
});

app.post('/addlending', (req, res) => {
  const {
    teacher_id, property_id
  } = req.body;

  const query = `
      CALL pa_addlending(?, ?)`;
  connection.query(query, [
    teacher_id, property_id
  ], (err, results) => {
      try {
        res.status(200).json({ message: 'Prestamo agregado exitosamente', results });
      } catch (error) {
        return res.status(500).json({ error: err.message });
      }
  });
});


app.get('/tablependientlending', (req, res) => {
  const query = ' select * from view_list_lending';
  connection.query(query,(err, resultado) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Error executing query' });
    }
    else
    {
      res.json(resultado);
    }
  });
});

app.post('/uplending', (req, res) => {
  const {
    id_people, id_property
  } = req.body;

  const query = `
      CALL pa_up_lending(?, ?)`;
  connection.query(query, [
    id_people, id_property
  ], (err, results) => {
      try {
        res.status(200).json({ message: 'Prestamo agregado exitosamente', results });
      } catch (error) {
        return res.status(500).json({ error: err.message });
      }
      /*if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'Property registered successfully', results });*/
  });
});

app.get('/tablestudentlist', (req, res) => {
  const query = ' select * from view_students_list';
  connection.query(query,(err, resultado) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Error executing query' });
    }
    else
    {
      res.json(resultado);
    }
  });
});

app.post('/namestudent', (req, res) => {
  const {
    id_people
  } = req.body;

  const query = `
      select people_first_name,people_firts_last_name,people_second_last_name from people where id_people= ? ;`;
  connection.query(query, [
    id_people
  ], (err, results) => {
      try {
        res.status(200).json({results});
      } catch (error) {
        return res.status(500).json({ error: err.message });
      }
  });
});

app.post('/studentdiscapacity', (req, res) => {
  const {
    id_student
  } = req.body;

  const query = `
      select student_discapacity from student where id_student=?;`;
  connection.query(query, [
    id_student
  ], (err, results) => {
      try {
        res.status(200).json({results});
      } catch (error) {
        return res.status(500).json({ error: err.message });
      }
  });
});

app.post('/editstudent', (req, res) => {
  const {
    id_parents,parents_fullname,parents_phone_number,parents_email,relationship,parent_document_number,
    id_people,studentName,paternalLastName,maternalLastName,people_document_number,people_document_issue_date,birthdate,
    id_student,id_section,id_degree,disability
  } = req.body;

  const query = `
      call pa_editstudent(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`;
  connection.query(query, [
    id_parents,parents_fullname,parents_phone_number,parents_email,relationship,parent_document_number,
    id_people,studentName,paternalLastName,maternalLastName,people_document_number,people_document_issue_date,birthdate,
    id_student,id_section,id_degree,disability
  ], (err, results) => {
      try {
        res.status(200).json({results});
      } catch (error) {
        return res.status(500).json({ error: err.message });
      }
  });
});

app.get('/reportlending', (req, res) => {
  const query = ' select * from view_report_lending;';
  connection.query(query,(err, resultado) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Error executing query' });
    }
    else
    {
      res.json(resultado);
    }
  });
});

app.post('/obtenerdescrip', (req, res) => {
  const {
    id_property
  } = req.body;

  const query = `
      select property_description from property where id_property= ? ;`;
  connection.query(query, [
    id_property
  ], (err, results) => {
      try {
        res.status(200).json({results});
      } catch (error) {
        return res.status(500).json({ error: err.message });
      }
  });
});


//Grafics code
app.get('/tablaprestamosmaestro', (req, res) => {
  const query = '   select * from view_grafica1';
  connection.query(query,(err, resultado) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Error executing query' });
    }
    else
    {
      res.json(resultado);
    }
  });
});

//Reportes routes
app.post('/reportlendingfordate', (req, res) => {
  const {
    deliver_date_start,deliver_date_finish
  } = req.body;

  const query = `
      select * from view_lending_from_date  where deliver_date>=? and deliver_date<=? and return_date is not null;`;
  connection.query(query, [
    deliver_date_start,deliver_date_finish
  ], (err, results) => {
      try {
        res.status(200).json({results});
      } catch (error) {
        return res.status(500).json({ error: err.message });
      }
  });
});

app.post('/reportpropertyindividual', (req, res) => {
  const {
    id
  } = req.body;

  const query = `
      select * from view_report_propery where id= ? ;`;
  connection.query(query, [
    id
  ], (err, results) => {
      try {
        res.status(200).json({results});
      } catch (error) {
        return res.status(500).json({ error: err.message });
      }
  });
});



