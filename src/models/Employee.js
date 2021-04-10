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

  static associate(models) {
    this.hasMany(models.Job, { foreignKey: 'employee_id', as: 'employees' })
  }
}

module.exports = Employee;
