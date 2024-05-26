const Router = require("koa-router")
const dotenv = require("dotenv")
const api = require("./routes/api.js")
dotenv.config()

const router = new Router()

router.use("/", api.routes())

module.exports = router;