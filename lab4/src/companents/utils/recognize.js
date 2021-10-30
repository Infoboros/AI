const sigmoidal = value => 1.0 / (1.0 + Math.exp(-value))

const recognize = (input, ihw, how, params) => {

    const {

        inputSize,
        hiddenSize,
        outputSize,

    } = params

    const inputs = [...input]
    const hidden = Array(hiddenSize).fill(0)
    const output = Array(outputSize).fill(0)

    for (let hid = 0; hid < hiddenSize; hid++) {
        let sum = 0

        for (let inp = 0; inp < inputSize; inp++) {
            sum += inputs[inp] * ihw[inp][hid]
        }

        sum += ihw[inputSize][hid]

        hidden[hid] = sigmoidal(sum)
    }

    for (let out = 0; out < outputSize; out++) {
        let sum = 0.0

        for (let hid = 0; hid < hiddenSize; hid++) {
            sum += hidden[hid] * how[hid][out]
        }

        sum += how[hiddenSize][out]

        output[out] = sigmoidal(sum)
    }

    return output
}

export default recognize;