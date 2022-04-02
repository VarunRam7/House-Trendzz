import fetch from 'isomorphic-fetch'


const BACKEND_URL = 'http://localhost:4000'


const asyncFetch = async (url, method, headers = {}, body) => {
    try {
        const response = await fetch(url, {
            headers,
            method,
            body,
        })
        const resp = await response.json()
        return resp
    } catch (e) {
        console.log(e)
        return { error: e, message: 'Unexpected Error' }
    }
}

export const GET = async (url, auth = true) => {
    const res = await asyncFetch(
        `${BACKEND_URL}${url}`,
        'GET',
        {
            'Content-type': 'application/json',
        },
    )
    if (!res)
        console.log(res)
    else
        return res
}


export const POST = async (url, data, auth = true) => {
    const res = await asyncFetch(
        `${BACKEND_URL}${url}`,
        'POST',
        {
            'Content-type': 'application/json',
        },
        JSON.stringify(data)
    )
    if (!res)
        console.log(res)
    else
        return res
}
