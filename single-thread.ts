class FindPrime {
    constructor() {
        const input = document.getElementsByTagName('input')[0],
            loading = document.getElementsByClassName('loading')[0] as HTMLDivElement,
            details = document.getElementsByTagName('details')[0],
            summary = document.getElementsByTagName('summary')[0]
        let isPrime: boolean,
            primesArray: number[]

        document.getElementById('singleThread')!!.addEventListener('click', () => {
            primesArray = []
            details.style.visibility = 'hidden'
            loading.style.visibility = 'visible'

            setTimeout(() => {
                const now = new Date().getTime()
                for (let element = 2; element <= +input.value; element++) {
                    isPrime = true
                    for (let i = 2, s = Math.sqrt(element); i <= s; i++)
                        if (element % i === 0) {
                            isPrime = false
                            break
                        }

                    if (isPrime)
                        primesArray.push(element)
                }

                details.childNodes[2].textContent = ('' + primesArray).replace(/,/g, ', ')
                summary.innerText = `Single-Thread: found ${primesArray.length} prime numbers - took ${new Date().getTime() - now} ms`
                loading.style.visibility = 'hidden'
                details.style.visibility = 'visible'
            })
        })
    }
}

new FindPrime()


