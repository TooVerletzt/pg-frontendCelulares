var url = "https://pg-restapi-celulares.onrender.com/api/celulares";
let selectedId = null;

function postCelular() {
  const celular = {
    marca: $('#marca').val(),
    modelo: $('#modelo').val(),
    precio: $('#precio').val(),
    stock: $('#stock').val(),
    color: $('#color').val(),
    descripcion: $('#descripcion').val()
  };

  if (Object.values(celular).some(v => !v)) {
    alert("Completa todos los campos 📋");
    return;
  }

  $.ajax({
    url,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(celular),
    success: () => {
      alert("Celular agregado ✅");
      clearForm();
      getCelulares();
    }
  });
}

function getCelulares() {
  $.getJSON(url, function (res) {
    let html = `<table><tr>
      <th>#</th><th>Marca</th><th>Modelo</th><th>Precio</th><th>Stock</th><th>Color</th><th>Descripción</th><th>Acciones</th>
    </tr>`;

    res.celulares.forEach((cel, i) => {
      html += `<tr>
        <td>${i + 1}</td><td>${cel.marca}</td><td>${cel.modelo}</td>
        <td>$${cel.precio}</td><td>${cel.stock}</td><td>${cel.color}</td><td>${cel.descripcion}</td>
        <td>
          <button onclick="deleteCelular(${cel.id})">🗑️</button>
          <button onclick="fillForm(${cel.id}, '${cel.marca}', '${cel.modelo}', ${cel.precio}, ${cel.stock}, '${cel.color}', '${cel.descripcion}')">✏️</button>
        </td>
      </tr>`;
    });

    html += `</table>`;
    $('#resultado').html(html);
  });
}

function deleteCelular(id) {
  if (!confirm("¿Eliminar este celular?")) return;
  $.ajax({
    url: `${url}/${id}`,
    type: 'DELETE',
    success: () => {
      alert("Eliminado 🗑️");
      getCelulares();
    }
  });
}

function updateCelular() {
  if (!selectedId) {
    alert("Selecciona un celular primero ✋");
    return;
  }

  const celular = {
    marca: $('#marca').val(),
    modelo: $('#modelo').val(),
    precio: $('#precio').val(),
    stock: $('#stock').val(),
    color: $('#color').val(),
    descripcion: $('#descripcion').val()
  };

  $.ajax({
    url: `${url}/${selectedId}`,
    type: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify(celular),
    success: () => {
      alert("Actualizado correctamente ✅");
      clearForm();
      getCelulares();
    }
  });
}

function fillForm(id, marca, modelo, precio, stock, color, descripcion) {
  $('#marca').val(marca);
  $('#modelo').val(modelo);
  $('#precio').val(precio);
  $('#stock').val(stock);
  $('#color').val(color);
  $('#descripcion').val(descripcion);
  selectedId = id;
  $('#updateBtn').show();
}

function clearForm() {
  $('input').val('');
  selectedId = null;
  $('#updateBtn').hide();
}
