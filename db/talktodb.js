const Sequelize = require('sequelize');

console.log('Opening connection to PostgreSQL')
const sequelize = new Sequelize('postgres://localhost:5432/video-shopper')



//sequelize-models

// const SequelizeModels = require("sequelize-models");

// var seqModels  = new SequelizeModels({
//   // Database connection options
//   connection : {
//     host     : "locallhost:5432",
//     dialect  : "postgres",
//     username : "root",
//     schema   : "video-shopper",
//     password : ""
//   },

//   // Models loading options
//   // models : {
//   //   autoLoad : true,
//   //   // path     : "/models"
//   // },

//   // Sequelize options passed directly to Sequelize constructor
//   sequelizeOptions : {
//     define : {
//       freezeTableName : true,
//       underscored     : true
//     }
//   }
// });


// seqModels.getSchema().then( schema => {
//   // schema.models and schema.db available here
//   console.log(schema)
// })
// .catch( err => {
//   // throwing error out of the promise
//   setTimeout( () => { throw err });
// });


// module.exports = newdb


// const path = require('path')
// var url = 'postgres://localhost:5432/video-shopper';
// var options = {
//   dialect: 'postgres',
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   },
//   define: {
//     timestamps: true,
//     freezeTableName: true
//   }
// };

// console.log(path.join('/Users/mandimeidlinger/Desktop/Duperset', '/db/models'))
// var Loader = require('sequelize-models-loader');
// // var loader = new Loader(path.join(__dirname, './models'),url, options);
// //var loader = new Loader('./models',url, options);
// loader = new Loader(path.join('/Users/mandimeidlinger/Desktop/Duperset', '/db/models'), sequelize);





module.exports = sequelize
