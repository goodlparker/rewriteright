var express = require('express');
const { rewriteText, REVISED_TEXT_TITLES } = require('./../gemini-ai');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    message: ''
  });
});

router.post('/message', (req, res, next) => {
  rewriteText(req.body.message).then((response) => {

    const responseCards = Object.keys(response).map((key) => {
      return {
        key,
        title: REVISED_TEXT_TITLES[key],
        value: response[key]
      };
    });

    const jsnoNotParsed = !!response.original;

    res.render('index', { responseCards, jsnoNotParsed, message: req.body?.message || '' });
  })
  .catch(err => {
    console.error('/message got error ', err);
    res.render('index', { error: true, message: req.body?.message });
  });
})

module.exports = router;
