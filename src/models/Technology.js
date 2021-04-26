const { Model, DataTypes } = require('sequelize');

class Technology extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
      },
      {
        underscored: true,
        sequelize,
      }
    );
  }
}

module.exports = Technology;
