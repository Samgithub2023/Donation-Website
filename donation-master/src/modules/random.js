export function randomNumber(digits) {
    const max = +('9'.repeat(digits))
    let number = Math.floor(Math.random() * max).toString()
    number = '0'.repeat(digits - number.length) + number
    return number
}

export const generatePassword = () => randomNumber(8)