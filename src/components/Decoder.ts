export class BinaryDecoder {
    binaryToText = (binary: string): string => {
        const binaryArray = binary.split(' ')
        let text = ''
        for (let i = 0; i < binaryArray.length; i++) {
            const charCode = parseInt(binaryArray[i], 2)
            text += String.fromCharCode(charCode)
        }
        return text
    }
    
    // const inputText = e.target.value
    // setBinaryInput(inputText)
    // setDecodedText(this.binaryToText(inputText))
}
