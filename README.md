## Synopsis

A CouchDB/PouchDB CRUD service for [FeathersJS](https://github.com/feathersjs/feathers).

## Installation

You can install this package as a npm dependency by running:

```
npm install @kapmug/feathers-nano
```


## Getting started

Here is an example of creating a Feathers service using `feathers-nano` as the database adapter.

```
import feathers from 'feathers'
import rest from 'feathers-rest'
import service from '../lib'
import nano from 'nano'

const app = feathers().configure(rest())

const options = {
  name: 'tests',
  connection: nano({
    url: `http://localhost:5984`,
  }),
  database: 'test',
  paginate: false,
}

app.use('tests', service(options))
app.service('tests').get('18423385ef707d5fb46c61e7d70148a4').then(res => console.log(res)).catch(console.log)
```

## Motivation

Although FeathersJS provides many official database adapters, currently there is no adapter for CouchDB/PouchDB. This package is a preliminary implementation of a non-official CouchDB/PouchDB adapter.
