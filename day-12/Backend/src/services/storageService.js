const ImageKit = require("imagekit")

const client = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

async function uploadFile({ buffer, fileName, folder = "" }) {
    try {
        const response = await client.upload({
            file: buffer,
            fileName: fileName,
            folder
        })
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports = { uploadFile }