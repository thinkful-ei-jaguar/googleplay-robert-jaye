const express = require('express');
const morgan = require('morgan');

const playstore = require('./playstore.js');


const app = express();


app.use(morgan('common'));



app.get('/apps', (req, res) => {
    const { sort ="",genres=""} = req.query;
    if (!['Rating', 'App',""].includes(sort)) {
        return res
          .status(400)
          .send('Sort must be one of Rating or App');
      }
      if (!["",'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
        return res
          .status(400)
          .send('genre must be a genre');
      }
      const co=playstore;
      let results = playstore;
      if (sort && sort !=="") {
       results=co
          .sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        });
      }
      if (genres && genres !=="") {
        results=co.filter(a=> a 
            .Genres
            .toLowerCase() 
            .includes(genres.toLowerCase())
            );
      }


    res.json(results)
});
 

app.listen(8000, () => {
console.log('Server started on PORT 8000');
});