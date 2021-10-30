
const dataset = [
    {
        trainingInput: [
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
        ],
        target: [0, 0, 0, 0]
    },
    {
        trainingInput: [
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
        ],
        target: [1, 1, 1, 1]
    },
]

const sigmoidal = value => 1.0 / (1.0 + Math.exp(-value))
const sigmoidalDerevative = value => value * (1.0 - value)

const learning = (ihw, setIhw, how, setHow, params) => {

    const {
        inputSize,
        hiddenSize,
        outputSize,

        speedOfLearning,
        numberOfEpochs
    } = params

    const localIhw = ihw.map(row => [...row])
    const localHow = how.map(row => [...row])

    let inputs = Array(inputSize).fill(0)
    let hidden = Array(hiddenSize).fill(0)
    let output = Array(outputSize).fill(0)

    let errh = Array(hiddenSize).fill(0)
    let erro = Array(outputSize).fill(0)

    const feedForward = () => {
        for (let hid = 0; hid < hiddenSize; hid++) {
            let sum = 0

            for (let inp = 0; inp < inputSize; inp++) {
                sum += inputs[inp] * localIhw[inp][hid]
            }

            sum += localIhw[inputSize][hid]

            hidden[hid] = sigmoidal(sum)
        }

        for (let out = 0; out < outputSize; out++) {
            let sum = 0.0

            for (let hid = 0; hid < outputSize; hid++) {
                sum += hidden[hid] * localHow[hid][out]
            }

            sum += localHow[hiddenSize][out]

            output[out] = sigmoidal(sum)
        }
    }

    const backPropagate = target => {
        for (let out = 0; out < outputSize; out++) {
            erro[out] = (target[out] - output[out]) * sigmoidalDerevative(output[out])
        }

        for (let hid = 0; hid < hiddenSize; hid++) {
            errh[hid] = 0.0

            for (let out = 0; out < outputSize; out++) {
                errh[hid] += erro[out] * localHow[hid][out]
            }

            errh[hid] *= sigmoidalDerevative(hidden[hid])
        }

        for (let out = 0; out < outputSize; out++) {
            for (let hid = 0; hid < hiddenSize; hid++) {
                localHow[hid][out] += (speedOfLearning * erro[out] * hidden[hid])
            }

            localHow[hiddenSize][out] += (speedOfLearning * erro[out])
        }

        for (let hid = 0; hid < hiddenSize; hid++) {
            for (let inp = 0; inp < inputSize; inp++) {
                localIhw[inp][hid] += (speedOfLearning * errh[hid] * inputs[inp])
            }

            localIhw[inputSize][hid] += (speedOfLearning * errh[hid])
        }
    }

    for (let epoch = 0; epoch < numberOfEpochs; epoch++) {
        dataset.map(({trainingInput, target}) => {
            inputs = [...trainingInput]
            feedForward()
            backPropagate(target)
        })
    }

    setIhw(localIhw)
    setHow(localHow)
}

export default learning;