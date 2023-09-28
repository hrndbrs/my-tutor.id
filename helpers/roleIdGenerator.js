module.exports = (role, id) => {
    const letter = role[0].toUpperCase()
    return `${letter}-${new Date().getFullYear().toString().slice(-2)}${id}`
}