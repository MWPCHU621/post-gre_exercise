const settings = require("./settings");

const knex = require('knex')({
  client: 'pg',
  connection: {
    host:settings.hostname,
    database: settings.database,
    user: settings.user,
    password: settings.password,
    port: settings.port,
  }
});

let myArgs = process.argv.slice(2);



function addPerson(fname, lname, date) {
  knex('famous_people').insert({
    first_name: fname,
    last_name: lname,
    birthdate: date
  }).asCallback((err, row) => {
    if(err)
      return console.err(err);
    console.log('success!');
  });
}

function findPerson(fname, lname, date) {
  knex('famous_people').where({
    first_name: fname,
    last_name: lname,
    birthdate: date
  }).select().asCallback((err, rows) => {
    if(err)
      return console.error(err);
    console.log(rows);
  });
}


//addPerson(myArgs[0], myArgs[1], myArgs[2]);
findPerson(myArgs[0], myArgs[1], myArgs[2]);