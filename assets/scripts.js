const optionalSelect = document.getElementById("roleRegister")

const role = new Proxy({ value : ""}, {
    set(target, prop, value) {
        target[prop] = value 

        return true
    }
})

if(optionalSelect) {
    const form = document.getElementById("authForm")
    const submitBtn = document.getElementById("authBtn")

    const label = document.createElement("label")
    label.setAttribute("for", "course")
    label.innerHTML = "What do you teach"

    const input = document.createElement("input")
    input.setAttribute("name", "course")
    input.setAttribute("type", "text")

    optionalSelect.addEventListener("change", (e) => {
        e.preventDefault()

        if(e.target.value === "tutor") {
            form.insertBefore(label, submitBtn)
            form.insertBefore(input, submitBtn)
        } else {
            form.removeChild(label)
            form.removeChild(input)
        } 
    })
}