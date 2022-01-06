const WORKER_THREADS = 4

class FindPrimeMulti {
    constructor() {
        const input = document.getElementsByTagName('input')[0],
            loading = document.getElementsByClassName('loading')[0] as HTMLDivElement,
            details = document.getElementsByTagName('details')[1],
            summary = document.getElementsByTagName('summary')[1]
        let workers: Worker[] = []

        for (let i = 0; i < WORKER_THREADS; i++)
            workers[i] = new Worker('/js-files/worker.js', { type: 'module' })

        document.getElementById('multiThread')!!.addEventListener('click', () => {
            details.style.visibility = 'hidden'
            loading.style.visibility = 'visible'

            const { value } = input,
                interval = (+value - 2) / WORKER_THREADS,
                now = new Date().getTime()
            let lowerBound = 2,
                upperBound = interval + lowerBound,
                count = WORKER_THREADS,
                stringifiedPrimesArray = ''

            for (let i = 0; i < WORKER_THREADS; i++) {
                workers[i].postMessage({ lowerBound, upperBound })
                lowerBound = Math.floor(upperBound) + 1
                upperBound += interval
                workers[i].onmessage = (ev) => {
                    try {
                        if (ev.data)
                            stringifiedPrimesArray += ' ' + ev.data  // instead of pushing ev.data to an array, stringifying ev.data is done to avoid the "Maximum call stack size exceeded" error

                        if (--count === 0) {
                            const primesArray = stringifiedPrimesArray
                            .trim()              // remove first and last spaces
                            .replace(/,/g, ' ')
                            .split(' ')
                            details.childNodes[2].textContent = primesArray
                                .sort((a, b) => { return +a - +b })
                                .toString()
                                .replace(/,/g, ', ')
                            summary.innerText = `Multi-Thread: found ${primesArray.length} prime numbers - took ${new Date().getTime() - now} ms`
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

new FindPrimeMulti()


