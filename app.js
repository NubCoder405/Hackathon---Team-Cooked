const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (like CSS, JS, etc.)
app.use(express.static('public'));

// Endpoint to fetch reviews
app.get('/reviews', (req, res) => {
    fs.readFile('reviews.json', (err, data) => {
        if (err) {
            return res.status(500).send('Unable to read reviews.');
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint to submit a review
app.post('/reviews', (req, res) => {
    const newReview = req.body;

    fs.readFile('reviews.json', (err, data) => {
        if (err) {
            return res.status(500).send('Unable to read reviews.');
        }
        const reviews = JSON.parse(data);
        reviews.push(newReview);
        fs.writeFile('reviews.json', JSON.stringify(reviews, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Unable to save review.');
            }
            res.status(200).send('Review saved successfully.');
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
