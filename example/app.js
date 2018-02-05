const feathers = require('@feathersjs/feathers')
const express = require('@feathersjs/express');
const nano = require('cloudant-nano')
const service = require('../lib')
const inspect = data => console.log(require('util').inspect(data, { depth: null }))

const app = express(feathers())
  .configure(express.rest())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))

const host = process.env.DB_HOST || '127.0.0.1:5984'
const auth = `${process.env.DB_USERNAME || 'admin'}:${process.env.DB_PASSWORD || 'admin'}`
const opts = {
  url: `http://${auth}@${host}`,
}

const options = {
  name: 'tests',
  connection: nano(opts),
  database: 'tests',
  paginate: {
    default: 5,
    max: 200,
  },
}

var params = {
  limit: 5,
  skip: 0,
}

app.use('tests', service(options))
// app.service('tests').create({message: `test message #${Math.floor((Math.random() * 100) + 1)}`}).then(inspect)
// app.service('tests').create([{message:'test one'}, {message:'test two'}, {message:'test three', something: 'else'}]).then(inspect)
// app.service('tests').get('03180d85d4a3caa9dcba190db4003abb').then(res => console.log(res)).catch(console.log)
//app.service('tests').find(params).then(res => inspect(res))
// app.service('tests').view('mydoc', 'listById', params).then(inspect)
//app.service('tests').patch('58ccdfcc06b822fcecb66e780d0018f1', { updated: true, newName: 'Andre Bazaglia', age: 23 }).then(inspect)
//app.service('tests').remove('24d2483356611299c92338c1eb0179f2').then(console.log)
//app.service('tests').update('24d2483356611299c92338c1eb0179f2', {message:'JUST UPDATED AGAIN!!!!'}).then(inspect)


var params = {
  "query": {
    "name": "Andre Bazaglia",
    "age": 22,
    "$skip": 0,
  },
  //bookmark: "g1AAAABweJzLYWBgYMpgSmHgKy5JLCrJTq2MT8lPzkzJBYorGJmkGJlYGBubmpkZGhpZWiZbGhkbWyQbpiYZGFlaJBmC9HHA9BGlIwsAPCMcOQ",
  //limit: 2,
}

app.service('tests').find(params).then(res => inspect(res))
