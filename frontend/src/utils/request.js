/* add image fetch */


export const REQUEST_CONSTANTS = {
    MEDIA_HEADERS: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',  
    },
    DEFAULT_REQUEST_SETTINGS: {
        method: 'GET',
        mode: "cors",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',  
        },         
    }
}


export const buildGetUrl = (baseUrl, getParameters) => {
    let getUrl = baseUrl + "?"

    const getParameterNames = Object.keys(getParameters);
    getParameterNames.forEach(getParameterName => {
        const getParameterValue = getParameters[getParameterName]
        const getParameterUrlEncodedString = encodeURIComponent(getParameterName + "=" + getParameterValue)
        getUrl += getParameterUrlEncodedString 
    })

    return getUrl;
}


const checkResponseStatus = async (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        const error = new Error(response.statusText)
        error.raw_response = response;
        error.response = await response.json()  
        console.error(error.raw_response); 
        console.error(error.response); 
        throw error
    }    
}

const parseJSON = (response) => {
    return response.json()
}

// base request
export const request = async (url, settings={}) => {
    if(!url) throw new Error("unable to make request without url parameter.")
    if(settings.body && settings.method === "GET") throw new Error("Get request is unable to process body.")


    const requestSettings = {
        ...REQUEST_CONSTANTS.DEFAULT_REQUEST_SETTINGS,
        ...settings
    }

    console.log(requestSettings)

    console.log(`making request to: ${url}`);
    
    const response = await fetch(url, requestSettings)
                        .then(checkResponseStatus)
                        .then(parseJSON)

    console.log(`received data from: ${url}`);
    console.log(response)

    return response
}

export const get = async (url, settings={}) => { 
    return await request(url, {
        method: "GET",
        ...settings
    })
}

export const post = async (url, postData=null, settings={}) => { 
    return await request(url, {
        method: "POST",
        body: JSON.stringify(postData),
        ...settings
    })
}


export const mergeRequestSettings = (...settings) => {
    return settings.reduce((requestSettings, {headers,...settingsObject}) => {
        return {
            ...requestSettings,
            ...settingsObject,
            headers: {
                ...requestSettings.headers,
                ...headers,
            }
        }
    },{})
}

