const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('Demo', 'postgres', 'Keshav@123', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

sequelize.authenticate().then(() => {
  console.log(`Database connected to discover`)
}).catch((err) => {
  console.log(err)
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('./UserModel.js')(sequelize, DataTypes, Model);
db.contact = require('./contact.js')(sequelize, DataTypes, Model);
db.sequelize.sync({ force: false });

// relation

db.user.hasMany(db.contact, { foreignKey: 'userId', as: 'contact' });
db.contact.belongsTo(db.user, { foreignKey: 'userId', as: 'user' });

module.exports = db