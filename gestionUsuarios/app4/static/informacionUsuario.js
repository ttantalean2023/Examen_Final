function cargarInformacionTarea(idTarea)
{
    console.log("Se cargara la informacion de la tarea %s",idTarea)
    fetch(`/conseguirInfoTarea?idTarea=${idTarea}`)
    .then(response => response.json())
    .then(data => {
        console.log(data.comentariosTotales)
        nombreTareaDetalle = document.getElementById('nombreTareaDetalle')
        fechaInicioDetalle = document.getElementById('fechaInicioDetalle')
        fechaFinDetalle = document.getElementById('fechaFinDetalle')
        estadoTareaDetalle = document.getElementById('estadoTareaDetalle')
        descripcionTareaDetalle = document.getElementById('descripcionTareaDetalle')
        indTarea = document.getElementById('indTarea')
        comentariosTareaTotales = document.getElementById('comentariosTareaTotales')

        nombreTareaDetalle.value = ''
        fechaInicioDetalle.value = ''
        fechaFinDetalle.value = ''
        estadoTareaDetalle.value = ''
        descripcionTareaDetalle.value = ''
        indTarea.innerHTML = ''
        comentariosTareaTotales.innerHTML = ''
        
        nombreTareaDetalle.value = data.nombreTarea
        fechaInicioDetalle.value = data.fechaInicio
        fechaFinDetalle.value = data.fechaFin
        estadoTareaDetalle.value = data.estadoTarea
        descripcionTareaDetalle.value = data.descripcionTarea
        indTarea.innerHTML = data.idTarea

        for(let j = 0; j < data.comentariosTotales.length; j++)
        {
            seccionComentario = `
            <div class="row mb-3">
                <div class="col-3">
                    ${data.comentariosTotales[j][0]}
                </div>
                <div class="col-9">
                    ${data.comentariosTotales[j][1]}
                </div>
            </div>
            `
            comentariosTareaTotales.innerHTML = comentariosTareaTotales.innerHTML + seccionComentario
        }

    })
}

function enviarComentario()
{
    url = '/publicarComentario'
    datos = {
        'comentario':document.getElementById('comentarioUsuario').value,
        'idTarea':document.getElementById('indTarea').innerHTML
    }
    fetch(url,
    {
        method:"POST",
        headers:
        {
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRFToken": getCookie("csrftoken"),
        },
        body:JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        cargarInformacionTarea(document.getElementById('indTarea').innerHTML)
        document.getElementById('comentarioUsuario').value = ''
    })
}


function getCookie(name)
{
    let cookieValue = null;
    if (document.cookie && document.cookie !== "")
    {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++)
        {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + "="))
            {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function cargarInformacionUsuario(idUsuario)
{
    /*
    PREGUNTA 3
    Desarrollar la función de javascript que permita consultar la ruta
    obtenerInformacionUsuario?idUsuario=${idUsuario}
    Revisar la implementacion realizada en clase para el detalle de las
    tareas.
    */
}
function cargarInformacionUsuario(idUsuario)
{
    // Realizar una solicitud GET al servidor para obtener la información del usuario
    fetch(`/obtenerDatosUsuario?idUsuario=${idUsuario}`)
    .then(response => response.json())
    .then(data => {
        // Actualizar los campos en la ventana modal con la información obtenida del servidor
        document.getElementById('nombreUsuario').value = data.nombreUsuario;
        document.getElementById('apellidoUsuario').value = data.apellidoUsuario;
        document.getElementById('profesionUsuario').value = data.profesionUsuario;
        document.getElementById('nroCelular').value = data.nroCelular;
        document.getElementById('emailUsuario').value = data.emailUsuario;
        document.getElementById('perfilUsuario').value = data.perfilUsuario;

        // Hacer que los campos de email y username sean de solo lectura
        document.getElementById('emailUsuario').readOnly = true;
        document.getElementById('usernameUsuario').readOnly = true;

        // Colocar el id del usuario como value del input idUsuario
        document.getElementById('idUsuario').value = idUsuario;

        // Mostrar la ventana modal para editar el usuario
        var modal = new bootstrap.Modal(document.getElementById('editarUsuario'));
        modal.show();
    })
    .catch(error => {
        // Manejar cualquier error que ocurra durante la solicitud
        console.error('Error:', error);
        // Mostrar un mensaje de error al usuario
        alert('Ocurrió un error al cargar la información del usuario');
    });
}
