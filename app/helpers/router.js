
/**
 * Helper method to use in the routes definitions.
 * It calls a controller method passing the request
 * params and body to it; then returns it result as
 * json in the response.json() method.
 *
 * @param  {Function} controllerMethod
 * @return {Function}
 */
const call = controllerMethod => ((req, res) => {
    controllerMethod(res, req.params, req.body)
})

module.exports = {call}
