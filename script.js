// Variables de estado y selectores
let genero = "mujer";

const genderButtons = document.querySelectorAll(".gender-btn");
const ageSlider = document.querySelector("#ageSlider");
const ageInput = document.querySelector("#ageInput");
const ageDisplay = document.querySelector("#ageDisplay");
const checkBtn = document.querySelector("#checkBtn");

const resultBox = document.querySelector("#resultBox");
const statusIcon = document.querySelector("#statusIcon");
const resultTitle = document.querySelector("#resultTitle");
const resultDetail = document.querySelector("#resultDetail");
const progressBar = document.querySelector("#progressBar");

// 1. Selección de género (Mujer / Hombre)
for (let i = 0; i < genderButtons.length; i++) {
    genderButtons[i].addEventListener("click", function() {
        for (let j = 0; j < genderButtons.length; j++) {
            genderButtons[j].classList.remove("active");
        }
        this.classList.add("active");
        genero = this.dataset.gender;
        verificarJubilacion();
    });
}

// 2. Sincronización entre el slider y el input numérico de edad
ageSlider.addEventListener("input", function() {
    ageInput.value = this.value;
    ageDisplay.textContent = this.value;
    verificarJubilacion();
});

ageInput.addEventListener("input", function() {
    let val = Number(this.value);
    if (val > 100) ageSlider.value = 100;
    else if (val >= 1) ageSlider.value = val;
    ageDisplay.textContent = val || 0;
});

// 3. Botón principal de verificación
checkBtn.addEventListener("click", verificarJubilacion);

// Función principal que resuelve TODO el ejercicio con UN SOLO IF (Extra Bonus)
function verificarJubilacion() {
    const edad = Number(ageInput.value);

    // Validación rápida por si dejan el campo vacío o negativo
    if (edad <= 0 || isNaN(edad)) return;

    const edadRequerida = genero === "mujer" ? 60 : 65;
    const porcentaje = Math.min((edad / edadRequerida) * 100, 100);

    resultBox.classList.remove("hidden", "eligible", "not-eligible");

    // =========================================================================
    // EXTRA BONUS: Un único IF con operadores lógicos (&&, ||) y de relación (>=, ===)
    // =========================================================================
    if ((genero === "mujer" && edad >= 60) || (genero === "hombre" && edad >= 65)) {
        resultBox.classList.add("eligible");
        statusIcon.textContent = "✅";
        resultTitle.textContent = "¡Estás en edad de jubilarte!";
        resultDetail.textContent = `Con ${edad} años ya cumplís el requisito legal en Argentina (${edadRequerida} años para ${genero === "mujer" ? "mujeres" : "hombres"}).`;
        progressBar.style.width = "100%";
        progressBar.style.backgroundColor = "#10b981";
    } else {
        const faltan = edadRequerida - edad;
        resultBox.classList.add("not-eligible");
        statusIcon.textContent = "⏳";
        resultTitle.textContent = "Todavía no estás en edad de jubilarte";
        resultDetail.textContent = `Tenés ${edad} años. Te ${faltan === 1 ? "falta 1 año" : `faltan ${faltan} años`} para alcanzar los ${edadRequerida} años requeridos.`;
        progressBar.style.width = `${porcentaje}%`;
        progressBar.style.backgroundColor = "#f59e0b";
    }
}