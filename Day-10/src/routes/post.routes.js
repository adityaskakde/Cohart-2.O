const express = require('express')
const postRouter = express.Router()
const postController =require("../controllers/post.controller")
const multer = require ("multer")
const upload = multer({storage: multer.memoryStorage()})


/**
 * POAT /api/posts [protected]
 * req.body = {caption, image-file}
 */

postRouter.post("/",upload.single("image") ,postController.createPostController)


/**
 * GET api/posts/[protected]
 */


postRouter.get("/",postController.getPostController)

/**
 * GET api/posts/details/:postid
 * -return an details about specific post with the id.also check whether the post
 *  belongs to user that is reques come from
 */
postRouter.get("/details/:postId",postController.getPostDetailsController)

module.exports = postRouter