// { 
//  message: {},
//  validator: {},
//  error: {},
//  data: {}
// }
function responseBuilder(res, status, response)  {
    res.statusCode = status;
    
    return res.json({
        statusCode: status,
        message: response.message,
        validator: response.validator,
        error: response.error,
        data: response.data,
    });
}

module.exports = {
    responseBuilder,
};