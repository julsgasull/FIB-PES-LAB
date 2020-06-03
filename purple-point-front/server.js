//Install express server
const express = require('express');
const path    = require('path');
const app     = express();

// Serve our static files.
app.use(express.static('./www'));

// Wait for a request to any path and redirect all of the requests to index.html.
app.get('*', function(req, res) {
  res.sendFile('index.html', {root: 'www/'});
}); 
// The Angular router will handle which component should be shown to the user according 
// to the path they requested.

// Listen for requests at the PORT specified by env variables or the default Heroku port, 
// which is 8080.
app.listen(process.env.PORT || 8080);
