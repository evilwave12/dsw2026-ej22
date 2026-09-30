document.addEventListener('DOMContentLoaded', () => {
  const cancelBtn = document.querySelector('.btn-cancel');

  cancelBtn.addEventListener('click', () => {
     alert("Cancelar Operación");
  });

  const saveBtn = document.querySelector('.btn-save');

  saveBtn.addEventListener('click', () => {
     alert("Guardar Especialidad");
  });
});