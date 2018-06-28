const EventEmitter = require('events');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

class Database extends EventEmitter {
   constructor (url, schemas) {
      super();

      if (!url.startsWith('mongodb://')) {
         url = 'mongodb://' + url;
      }

      this.mongoose = mongoose;
      this.url = url;

      this.isReady = () => (mongoose.connection.readyState === 1);

      for (const schemaName of Object.keys(schemas)) {
         const schema = new mongoose.Schema(schemas[schemaName]);
         this[schemaName] = mongoose.model(schemaName, schema);
      }
   }

   connect () {
      this.mongoose.connection.on('open', () => {
         this.emit('ready');
         this.emit('open');
      });

      mongoose.connection.on('error', e => this.emit('error', e));

      return this.mongoose.connect(this.url);
   }

   static createUrl({ host, port, database, username, password }) {
      return `${username}:${password}@${host}:${port}${database ? `${database}`: ''}`;
   }
}

module.exports = Database;