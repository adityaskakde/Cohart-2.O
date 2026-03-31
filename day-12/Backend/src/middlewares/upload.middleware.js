const multer = require('multer')

const storgage = multer.memoryStorage()

const upload = multer({
    storage:storgage,
    limits:{
        fileSize:  1024 * 1024 * 10 // 10MB
    },
})
module.exports = upload