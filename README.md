# Fast Mongoose!

Mongoose, but easier to use and faster to set up!

I made this for my own projects, to simplify model/schema creation.

Usage:

`schemas.js`
```javascript
module.exports = {
    User: {
        name: String,
        age: Number,
        pets: [Object]
    }
};
```

`url.js`

```javascript
module.exports = 'mongodb://user:password@server:port'
```

`database.js`
```javascript
const Database = require('fast-mongoose');

const url = require('./url');
const schemas = require('./schemas');

const db = new Database(url, schemas);

db.connect();

module.exports = db;
```

`app.js`
```javascript
// Imagine express stuff is up here
// Handles connections from the root, don't worry about this if you don't know express
app.get('/', (req, res, next) => {
   const username = req.body.username;
   const age = req.body.age;
   const pets = req.body.pets;
   
   // do some validation here
   
   const user = new db.User({username: user, age: age, pets: pets});
   
   user.save(function(err) {
        if (err) {
            //error handling
            return;
        }
        
        // Yay, it's now saved to the DB!
   });
});
```

This module consists of a single file, which has a class called `Database`.

Database's constructor is `(url, schemas)`, where url is a string, an example of which is shown above, and schemas is an object, an example of which is also shown above.

Each schema (or rather, the model which was created from your schema) will be accessible from the database instance based on the key. For instance, if your schema is `Dog: {stuff}` then `db.Dog` holds the Dog model.

You must call `db.connect()` for the database to actually connect. 

Database also has an `isReady()` method, which takes no arguments and returns true if the database is ready for reading/writing, and false if not. This is particularly useful for webserver stuff.

You can access mongoose using the `mongoose` property, e.g. `db.mongoose`.

Finally, Database is an EventEmitter that only emits the events `ready` and `open`... which are the same thing.