self.onmessage = (msg: any) => {
    const { upperBound, lowerBound } = msg.data
    let isPrime: boolean,
        primesArray: number[] = []

    for (let element = lowerBound; element <= upperBound; element++) {
        isPrime = true
        for (let i = 2, s = Math.sqrt(element); i <= s; i++)
            if (element % i === 0) {
                isPrime = false
                break
            }

        if (isPrime)
            primesArray.push(element)
    }

    if (primesArray.length)
        postMessage(primesArray)
    else
        postMessage('')
}


