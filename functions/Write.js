'use strict';

const mysql = require('mysql');
const uuid = require('uuid');
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
    const a = uuid.v4().split('-').join('');
    const aInsert = `INSERT INTO tbl_a (name) VALUES ('${a}')`;

    connection.query(aInsert, function(err, _results, _fields) {
      if (err) {
        console.error('error quering: ' + err.stack);
        throw err;
      } else {
        const dt = new Date();
        const formatted = dt.toFormat("YYYY/MM/DD HH24:MI:SS ");
        console.log(formatted + 'INSERT tbl_a');
        sleep(10000);
      }
    });


    /*
    const b = uuid.v4().split('-').join('');
    const bInsert = `INSERT INTO tbl_b (name) VALUES ('${b}')`;
    connection.query(bInsert, function(err, _results, _fields) {
      if (err) {
        console.error('error quering: ' + err.stack);
        throw err;
      } else {
        const dt = new Date();
        const formatted = dt.toFormat("YYYY/MM/DD HH24:MI:SS");
        console.log(formatted + 'INSERT tbl_b');
        sleep(10);
      }
    });
    */
  });

  connection.end(function(err) {
    if (err) {
      console.error('shutdown error: ' + err.stack);
      throw err;
    }
  });
}

function sleep(time) {
  const d1 = new Date();
  while (true) {
    const d2 = new Date();
    if (d2 - d1 > time) {
      return;
    }
  }
};
