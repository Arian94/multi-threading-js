self.onmessage = (msg: any) => {
    const { buffer, upperBound, lowerBound } = msg.data,
        partialView = new Uint32Array(buffer, 4 * (Math.floor(lowerBound) - 2), Math.floor(upperBound - lowerBound) + 1)
    let isPrime: boolean

    for (let element = lowerBound, counter = 0; element <= upperBound; element++, counter++) {
        isPrime = true
        for (let i = 2, s = Math.sqrt(element); i <= s; i++)
            if (element % i === 0) {
                isPrime = false
                break
            }

        if (isPrime)
            partialView[counter] = element
    }

    postMessage({})
}

