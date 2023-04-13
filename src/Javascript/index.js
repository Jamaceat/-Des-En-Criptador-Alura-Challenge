const text = "Ingrese el texto aqui"
const placeHolder = document.querySelector(".placeHolder p")
const textField = document.querySelector(".field")

textField.addEventListener("input", (evt) => {
	if (textField.textContent.trim() !== "") {
		placeHolder.textContent = ""
	} else {
		placeHolder.textContent = text
	}
})
