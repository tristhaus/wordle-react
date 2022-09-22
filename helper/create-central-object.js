const fs = require('fs');

try {
    // generate object and write it to file

    const data = fs.readFileSync('five.dict', 'utf8');

    const root = {}

    const words = data.split('\n').filter(value => value !== '')
    words.forEach(word => {
        let node = root

        const chars = word.split('')
        chars.forEach(char => {
            if (node[char] === undefined) {
                node[char] = {}
            }

            node = node[char]
        })
    })

    const result = JSON.stringify(root)
    // console.log(result);
    fs.writeFileSync('five.json', result, 'utf8')

    // benchmarking

    const funcObject = candidate => {
        let node = root

        const chars = candidate.split('')
        chars.forEach(char => {
            if (node[char] === undefined) {
                return false
            }

            node = node[char]
        })

        return true
    }

    const funcArray = candidate => {
        return words.includes(candidate)
    }

    const testCase1 = 'oinks'
    const testCase2 = 'xxyyz'

    console.time('object')
    for (let i = 0; i < 1000; i++) {
        funcObject(testCase1)
        funcObject(testCase2)
    }
    console.timeEnd('object')

    console.time('array')
    for (let i = 0; i < 1000; i++) {
        funcArray(testCase1)
        funcArray(testCase2)
    }
    console.timeEnd('array')

} catch (err) {
    console.error(err);
}
