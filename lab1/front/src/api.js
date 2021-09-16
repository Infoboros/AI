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
                                              initialTemperature,
                                              finalTemperature,
                                              alfaForTemperature,
                                              stepsPerChange,
                                              countFigures
                                          }) {
    const result = await postData("http://127.0.0.1:8000/solution", {
        initial_temperature: initialTemperature,
        final_temperature: finalTemperature,
        alfa_for_temperature: alfaForTemperature,
        steps_per_change: stepsPerChange,
        count_figures: countFigures
    })
    return result
}