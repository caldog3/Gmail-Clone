/*jshint esversion: 6 */
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post('/auth/google', (req, res) => {
    console.log("Recieved tokens");
    res.self = res;
    let responseBody = res.socket.parser.incoming.body;
    // TODO Utilize the "code" attribute to finish the post
    // authentication. Need to do more research on this.
    console.log(responseBody);
});

app.listen(8081, () => console.log('Server listening on port 8081!'));