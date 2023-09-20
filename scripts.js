// Obtener elemento HTML (botón)
const buttonElement = document.querySelector("button");

// Crear selector de código de región
const phoneInputField = document.querySelector("#contact-number");
const phoneInput = window.intlTelInput(phoneInputField, {
  // TO-DO: Initial country based on user location
  initialCountry: phoneCountryDisplayCheck(),
  preferredCountries: ["py", "ar", "co", "uy"],
  separateDialCode: false,
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

// Función que verifica si hay algún número guardado
phoneDisplayCheck();

function phoneCountryDisplayCheck() {
  if (localStorage.getItem("NumberCountry")) {
    const phoneCountryStored = localStorage.getItem("NumberCountry");
    return phoneCountryStored;
  }
}

function phoneDisplayCheck() {
  if (localStorage.getItem("contactNumber")) {
    const phoneNumberStored = localStorage.getItem("contactNumber");
    console.log("phoneDisplayCheck", phoneNumberStored);

    phoneInputField.value = phoneNumberStored;
  }
}

// Definir la función que arma el enlace
function onButtonClick() {
  // Tomar número con código de zona
  const phoneNumber = phoneInput.getNumber();
  console.log(phoneNumber);

  // Tomar mensaje
  const message = document.getElementById("message").value;

  // Reemplazar saltos de línea por código para salto de línea en la URL
  const res = message.split("\n").join("%0a");
  // console.log(res);

  // Armar enlace
  const link = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${res}`;

  // Abrir enlace en la misma ventana del navegador
  window.location.href = link;

  // Guardar el número en local storage
  localStorage.setItem("contactNumber", phoneNumber);

  // Guardar la información del país
  const phoneCountry = phoneInput.s.iso2;
  localStorage.setItem("NumberCountry", phoneCountry);
}

// Agregar Event Listener al botón
buttonElement.addEventListener("click", onButtonClick);

buttonElement.addEventListener("keypress", function (event) {
  console.log(event.key);
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Trigger the button element with a click
    onButtonClick();
  }
});
