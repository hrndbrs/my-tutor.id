module.exports = (str) => {
    const result = []
    let temp = str[0].toUpperCase()

    for(let i = 1; i <= str.length ; i++ ) {
        let char = str[i]

        if(char === undefined || char.toUpperCase() === char) {
            result.push(temp)
            temp = ""
            char = char?.toLowerCase()
        }

        temp += char
    }

    return result.join(" ")
}