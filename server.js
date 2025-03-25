// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;
const IP = '148.213.41.1'; // Cambia esta IP si es diferente

// Ruta para servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para servir script.js desde el servidor
app.get('/script.js', (req, res) => {
  const script = `
    let tareas = [];

    function agregarTarea() {
      const tareaInput = document.getElementById('tarea');
      const tareaTexto = tareaInput.value.trim();

      if (tareaTexto === '') {
        alert('La caja de texto está vacía. Por favor, agrega una tarea.');
        return;
      }

      if (tareas.includes(tareaTexto)) {
        alert('Esta tarea ya existe en la lista.');
        return;
      }

      tareas.push(tareaTexto);
      mostrarTareas();
      tareaInput.value = '';
    }

    function mostrarTareas() {
      const listaTareas = document.getElementById('listaTareas');
      listaTareas.innerHTML = '';

      tareas.forEach((tarea, index) => {
        const li = document.createElement('li');
        li.innerHTML = \`
          <input type="checkbox" onchange="marcarRealizada(this, \${index})" />
          <span class="tarea-texto">\${tarea}</span>
          <button class="remove-btn" onclick="eliminarTarea(\${index})">Eliminar</button>
        \`;
        listaTareas.appendChild(li);
      });
    }

    function marcarRealizada(checkbox, index) {
      const tareaTexto = checkbox.nextElementSibling;
      if (checkbox.checked) {
        tareaTexto.classList.add('tarea-realizada');
      } else {
        tareaTexto.classList.remove('tarea-realizada');
      }
    }

    function eliminarTarea(index) {
      tareas.splice(index, 1);
      mostrarTareas();
    }
  `;
  res.type('application/javascript').send(script);
});

// Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar servidor
app.listen(PORT, IP, () => {
  console.log(`Servidor corriendo en http://${IP}:${PORT}`);
});
