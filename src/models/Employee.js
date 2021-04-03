const { Model, DataTypes } = require('sequelize');

class Employee extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        cellphone: DataTypes.STRING,
        formation: DataTypes.STRING,
      },
      {
        underscored: true,
        sequelize,
      }
    );
  }
}

module.exports = Employee;
