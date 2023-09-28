module.exports = function(date) {
    const option = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    }

    return new Date(date).toLocaleDateString("en-ID", option)
}