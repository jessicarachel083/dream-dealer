const express = require("express")
const app = express()
const router = require("./routers")
const session = require("express-session")
const port = 3000

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: "keyboard cat", // fungsinya amanin session kita, tidak untuk dikasihtau ke orang2 lain. harus isi ini
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        sameSite: true
    }
}))

// app.use(session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { 
//         secure: false,
//         sameSite: true
//     }
// }))

// app.use("/", require("./routers/index.js"))

app.use("/", router)

app.listen(port, () => {
    console.log(`Ini port ${port}`);
})