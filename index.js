const canvas = document.querySelector('canvas')
const img = document.querySelector('img')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

function getPixelAverage(data, i, j, offset) {
    let result = {r: 0, g: 0, b: 0}
    let count = 0;

    for (let m = i - offset; m <= i + offset; m++) {
        for (let n = j - offset; n <= j + offset; n++) {
            if (m >= 0 && m < canvas.height && n >= 0 && n < canvas.width) {
                const index = (m * canvas.width + n) * 4
                count++

                result.r += data[index]
                result.g += data[index + 1]
                result.b += data[index + 2]
            }
        }
    }

    result.r /= count
    result.g /= count
    result.b /= count

    return result
}

img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    const temp = [...imageData.data]

    for (let i = 0; i < canvas.height; i++) {
        for (let j = 0; j < canvas.width; j++) {
            const index = (i * canvas.width + j) * 4

            const avg = getPixelAverage(imageData.data, i, j, 8)

            temp[index] = avg.r
            temp[index + 1] = avg.g
            temp[index + 2] = avg.b
        }
    }

    imageData.data.set(temp)

    ctx.putImageData(imageData, 0, 0)
}
