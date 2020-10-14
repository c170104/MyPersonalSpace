function errorHandler(error) {
    console.log(`Error message: ${error.message}`);
    if (error.error)
        console.log(`Error Type: ${error.error}`);
}

module.exports = {
    errorHandler
}