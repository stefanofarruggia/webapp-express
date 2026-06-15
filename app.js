const express = require("express")

const app = express()

const port = process.env.PORT

const moviesRouter = require("./routers/moviesRouter")

//Gestione errori
const errorHandler = require("./middlewares/errorHandler")
const notFound = require("./middlewares/notFound")

//Gestione foto
app.use(express.static("public"))

//Gestione parsing
app.use(express.json())

//API per verificare lo stato dell'app
app.get("/", (req, res) => {
    res.send("server online")
})

app.use("/api/movies", moviesRouter)

app.use(errorHandler)
app.use(notFound)

app.listen(port, () => {
    console.log("applicazione partita sulla porta " + port)
})