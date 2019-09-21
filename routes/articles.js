const router = require('express').Router();
let Articles = require('../models/articles.models');

router.route('/').get((req, res) => {
  Articles.find()
    .then(Articles => res.json(Articles))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const author = req.body.author;
  const title = req.body.title;
  const journal = req.body.journal;
  const year = req.body.year;
  const volume = req.body.volume;
  const number = req.body.number;
  const pages = req.body.pages;
  const month = req.body.month;


  const newArticles = new Articles({
    author,
    title,
    journal,
    year,
    volume,
    number,
    pages,
    month,
  });

  newArticles.save()
  .then(() => res.json('Article has been added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;