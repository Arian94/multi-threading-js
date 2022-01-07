class FindPrimeMultiWithBuffer {
    constructor() {
        const input = document.getElementsByTagName('input')[0],
            loading = document.getElementsByClassName('loading')[0] as HTMLDivElement,
            details = document.getElementsByTagName('details')[2],
            summary = document.getElementsByTagName('summary')[2]
        let workers: Worker[] = []

        for (let i = 0; i < NUMBER_OF_THREADS; i++)
            workers[i] = new Worker('/js-files/worker-buffer.js', { type: 'module' })

        document.getElementById('multiThreadWithBuffer')!!.addEventListener('click', () => {
            details.style.visibility = 'hidden'
            loading.style.visibility = 'visible'

            const { value } = input,
                interval = (+value - 2) / NUMBER_OF_THREADS,
                now = new Date().getTime(),
                buffer = new SharedArrayBuffer(4 * (+value - 1)),
                view = new Uint32Array(buffer)

            let lowerBound = 2,
                upperBound = interval + lowerBound,
                count = NUMBER_OF_THREADS

            for (let i = 0; i < NUMBER_OF_THREADS; i++) {
                workers[i].postMessage({ lowerBound, upperBound, buffer })
                lowerBound = Math.floor(upperBound) + 1
                upperBound += interval
                workers[i].onmessage = () => {
                    try {
                        if (--count === 0) {
                            const primesArray = view.filter((v) => { return v !== 0 })
                            details.childNodes[2].textContent = ('' + primesArray).replace(/,/g, ', ')
                            summary.innerText = `Multi-Thread with Buffer: found ${primesArray.length} prime numbers - took ${new Date().getTime() - now} ms`
                            loading.style.visibility = 'hidden'
                            details.style.visibility = 'visible'
                        }
                    } catch (error) {
                        loading.style.visibility = 'hidden'
                        details.style.visibility = 'hidden'
                        document.body.appendChild(document.createElement('span')).textContent = '' + error
                    }
                }
            }
        })
    }
}

new FindPrimeMultiWithBuffer()

