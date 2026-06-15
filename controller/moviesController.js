const connection = require("../data/db")

function index(req, res) {

    const sql = "SELECT * FROM MOVIES;"

    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                error: "il db non risponde (index)"
            })
        }
        res.json(results)
    })
}

function show(req, res) {

    const { id } = req.params

    const sql = "SELECT * FROM movies WHERE id = ?"

    connection.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                error: "il db non risponde (show)"
            })
        }

        const movie = results[0]

        const reviewSQL = "SELECT * FROM reviews WHERE movie_id = ?"

        connection.query(reviewSQL, [id], (err, reviewResults) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    error: "il db non risponde (review)"
                })
            }
            movie.reviews = reviewResults

            res.json(movie)
        })

    })

}


module.exports = { index, show }