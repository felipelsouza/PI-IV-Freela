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
        dev_type: DataTypes.STRING,
      },
      {
        underscored: true,
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Job, { foreignKey: 'employee_id', as: 'employees' });
    this.hasMany(models.Match, { foreignKey: 'employee_id', as: 'employee' });
  }
}

module.exports = Employee;
