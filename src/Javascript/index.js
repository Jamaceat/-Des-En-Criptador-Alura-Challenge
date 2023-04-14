const text = "Ingrese el texto aqui"
const placeHolder = document.querySelector(".placeHolder p")
const textField = document.querySelector(".field")

textField.addEventListener("input", (evt) => {
	if (textField.textContent.trim() !== "") {
		placeHolder.textContent = "‎"
	} else {
		placeHolder.textContent = text
	}
})

// ------------------------------------------------------------------------------------------------------------------------utils
const logica = {a: "ai", e: "enter", i: "imes", o: "ober", u: "ufat"}

// Esto ayuda a crear un regex que reemplaza el pattern por el replacer
const regexFactory = (pattern, replacer) => {
	const regexmaker = new RegExp(pattern, "g")

	return (text) => {
		return text.replace(regexmaker, replacer)
	}
}

// ------------------------------------------------------------------------------------------------------------------------Logica encriptar

let inicialEncriptador = {}
const encriptador = Object.keys(logica).reduce((prev, x) => {
	return {...prev, [x]: regexFactory(x, logica[x])}
}, inicialEncriptador)

const encriptar = (texto) => {
	const arrayText = Array.from(texto)
		.map((x) => (encriptador[x] ? encriptador[x](x) : x))
		.join("")

	return arrayText
}

// ------------------------------------------------------------------------------------------------------------------------
