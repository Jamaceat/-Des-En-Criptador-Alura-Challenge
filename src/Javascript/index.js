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

const mappeoInverso = (prevObject) => {
	let initialState = {}

	const newObject = Object.keys(prevObject).reduce((prev, x) => {
		return {...prev, [prevObject[x]]: x}
	}, initialState)

	return newObject
}

const logicaDesencriptar = mappeoInverso(logica)
// Esto ayuda a crear un regex que reemplaza el pattern por el replacer
const regexFactory = (pattern, replacer) => {
	const regexmaker = new RegExp(pattern, "g")

	return (text) => {
		return text.replace(regexmaker, replacer)
	}
}

// ------------------------------------------------------------------------------------------------------------------------Logica encriptar

let initialEncriptador = {}
const encriptador = Object.keys(logica).reduce((prev, x) => {
	return {...prev, [x]: regexFactory(x, logica[x])}
}, initialEncriptador)

const encriptar = (texto) => {
	const arrayText = Array.from(texto)
		.map((x) => (encriptador[x] ? encriptador[x](x) : x))
		.join("")

	return arrayText
}

// ------------------------------------------------------------------------------------------------------------------------Desencriptar

let initialDesencriptador = {}

const desencriptador = Object.keys(logicaDesencriptar).map((x) =>
	regexFactory(x, logicaDesencriptar[x])
)

const desencriptar = (texto) => {
	const message = desencriptador.reduce((prev, x) => x(prev), texto)

	return message
}

// -------------------------------

const buttonEncriptar = document.querySelector("#encriptar")
const buttonDesencriptar = document.querySelector("#desencriptar")
const defaultOutput = document.querySelector(".defaultOutput")
const textOutput = document.querySelector(".textOutput")
const copyOutput = document.querySelector(".copyButton")

buttonEncriptar.addEventListener("click", () => {
	const contenido = textField.textContent

	if (contenido.trim().length !== 0) {
		defaultOutput.style.display = "none"
		textOutput.style.display = "block"
		const Output = encriptar(textField.textContent)
		textOutput.textContent = Output
	}
})

buttonDesencriptar.addEventListener("click", () => {
	const contenido = textField.textContent

	if (contenido.trim().length !== 0) {
		defaultOutput.style.display = "none"
		textOutput.style.display = "block"
		const Output = desencriptar(textField.textContent)
		textOutput.textContent = Output
	}
})

copyOutput.addEventListener("click", () => {
	if (textOutput.textContent || textOutput.textContent === 0) {
		navigator.clipboard.writeText(textOutput.textContent.trim())
	}
})
