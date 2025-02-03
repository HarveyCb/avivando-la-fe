  
  //funcipon para iniciar sesion
  function validarFormLogin() {
      // Campos de texto
      if ($("#usuario").val() == "") {
          // alert("El campo usuario no puede estar vacío");
          Swal.fire({
              icon: 'error',
              title: '¡ERROR!',
              text: "El campo usuario no puede estar vacío"
          });
          $("#nombre").focus();       // Esta función coloca el foco de escritura del usuario en el campo Nombre directamente.
          return false;
      }
      if ($("#password").val() == "") {
          // alert("El campo contraseña no puede estar vacío.");
          Swal.fire({
              icon: 'error',
              title: '¡ERROR!',
              text: "El campo contraseña no puede estar vacío"
          });
          $("#apellidos").focus();
          return false;
      }
      return true; // Si todo está correcto
  }
  
  $("#frmlogin").on('submit', function (e) {
      e.preventDefault();
      if (validarFormLogin()) {
          var dataForm = $(this).serialize();
          $.ajax({
              type: 'POST',
              url: 'src/cruds/crud_usuario.php',
              data: dataForm,
              dataType: 'json',
              beforeSend: function () {
                  // loaderefect(1);
              },
              success: function (data) {
                  console.log(data);
                  // loaderefect(0);
                  if (data[0]) {
                      redireccionar(data[2].puesto);
                      // if (data[2].puesto == ) {
                      // }
                  } else {
                      Swal.fire({
                          icon: 'error',
                          title: '¡ERROR!',
                          text: data[1]
                      });
                  }
              },
              error: function (xhr) {
                   console.log(xhr);
                  // loaderefect(0);
                  Swal.fire({
                      icon: 'error',
                      title: '¡ERROR!',
                      text: 'Codigo de error: ' + xhr.status + ', Información de error: ' + xhr.responseJSON
                  });
              },
              complete: function () {
                  // loaderefect(0);
              },
          });
      }
  });
  
  function redireccionar(valor) {
      $.ajax({
          type: 'POST',
          url: 'src/cruds/crud_usuario.php',
          data: { 'condi': 'redirect' },
          dataType: 'json',
          beforeSend: function () {
              // loaderefect(1);
          },
          success: function (data) {
              // loaderefect(0);
              console.log('holi');
              console.log(data);
              
              const data2 = data;
              if (data2[1] == "1") {
                  url = data2[0];
                  $(location).attr("href", url);
              }
              else {
                  Swal.fire({
                      icon: 'error',
                      title: '¡ERROR!',
                      text: data2[0]
                  });
              }
          },
          error: function (xhr) {
              // loaderefect(0);
              console.log('holi2');
              console.log(xhr);
              Swal.fire({
                  icon: 'error',
                  title: '¡ERROR!',
                  text: 'Codigo de error: ' + xhr.status + ', Información de error: ' + xhr.responseJSON
              });
          },
          complete: function () {
              // loaderefect(0);
          },
      });
  }