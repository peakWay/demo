
function delay(data, duration = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, duration)
    })
}

export default delay;