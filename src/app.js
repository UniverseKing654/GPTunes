const Koa = require("koa")
const {koaBody} = require("koa-body")
const KoaLogger = require("koa-logger")
const cors = require("@koa/cors")
const router = require("./routes.js")

const app = new Koa()

app.use(cors())

app.use(koaBody())
app.use(KoaLogger())
app.use(router.routes())    


app.use((ctx,next) => {
    ctx.body = "Hola, mundo!"
})

module.exports = app