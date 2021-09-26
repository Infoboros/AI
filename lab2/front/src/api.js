async function postData(url = '', data = {}) {

    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return await response.json();
}

export default async function getSolution({
                                              N,
                                              p,
                                              b,
                                              vectors
                                          }) {
    return await postData("http://127.0.0.1:8000/solution", {
        N: N,
        p: p,
        b: b,
        vectors: vectors
    })
}