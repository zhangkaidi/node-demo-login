﻿var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    fs.readFile('PersonData.json', 'utf8', function (err, data) {
        if (err) {
            return console.error(err);
        } else {
            var newPersonData = {
                id: req.query.id,
            }
            var jsonarray = eval('(' + data + ')');
            for (var i = 0; i < jsonarray.length; i++) {
                if (jsonarray[i].id == newPersonData.id) {
                    jsonarray.splice(i,1);
                    jsonarray = JSON.stringify(jsonarray);
                    res.json({ result: true });
                    fs.writeFile('PersonData.json', jsonarray, function (err) {
                        if (err) throw err;
                        console.log('The "data to append" was appended to file!');
                    });
                    return;
                }
            }
        }
    });
});

module.exports = router;