
const handleRequestError = error => {
    let errMess = ''
    if (error.response) {// ex: baseUrl + commentssss
    errMess = `Problem with the response: ${error.response.status} ${error.response.statusText}`
    console.log(error.response)
    }
    else if (error.request) {// wrong baseUrl
    errMess = `Problem with the request`
    console.log(error.request)
    }
    else { // network /connection
        errMess = error.message 
        console.log(error.message)
    }
    return errMess    
}

export default handleRequestError