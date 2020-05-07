'use strict';

const mysql = require('mysql');
require('date-utils');

exports.handler = () => {
  const connection = mysql.createConnection({
    host: process.env['endpoint'],
    user: process.env['username'],
    password: process.env['password'],
    database: process.env['db']
  });

  console.log("Starting query ...");

  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      throw err;
    }

    console.log('connected as id ' + connection.threadId);
  });

  [...Array(5)].forEach(() => {
    const aSelect = `SELECT * FROM tbl_a ORDER BY id DESC LIMIT 5`;
    connection.query(aSelect, function(err, results, _fields) {
      if (err) {
        console.error('error quering: ' + err.stack);
        throw err;
      } else {
        const dt = new Date();
        const formatted = dt.toFormat("YYYY/MM/DD HH24:MI:SS ");
        console.log(formatted + 'SELECT tbl_a');
        console.log(results);
        sleep(10000);
      }
    });
  });

  connection.end(function(err) {
    if (err) {
      console.error('shutdown error: ' + err.stack);
      throw err;
    }
  });
};

function sleep(time) {
  const d1 = new Date();
  while (true) {
    const d2 = new Date();
    if (d2 - d1 > time) {
      return;
    }
  }
};
