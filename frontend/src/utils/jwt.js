
export const getJWTToken = (tokenName) => localStorage.getItem(tokenName)
export const setJWTToken = (tokenName, token) => localStorage.setItem(tokenName, token)
export const removeJWTToken = (tokenName) => localStorage.removeItem(tokenName)

export const getDecodedToken = (tokenName) => {
    const token = getJWTToken(tokenName);
    return decodeJWTToken(token);
}

export const decodeJWTToken = (token) => {
    if(!token) throw new Error("no decodable token provided.")
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

export const isTokenAlive = (tokenName) => {
    const decodedToken = getDecodedToken(tokenName)
    return isDecodedTokenAlive(decodedToken)
}

export const isDecodedTokenAlive = (decodedToken) => {
    if(!decodedToken) return false
    const now = Date.now().valueOf() / 1000

    if (typeof decodedToken.exp !== 'undefined' && decodedToken.exp < now) 
        return false
    return true
}


export const tokenExpiresInTimeDelta = (tokenName, timeMilliseconds) => {
    const decodedToken = getDecodedToken(tokenName);
    const now = Date.now().valueOf() / 1000

    if (typeof decodedToken.exp !== 'undefined' && decodedToken.exp < now + timeMilliseconds) 
        return true
    return false
}



