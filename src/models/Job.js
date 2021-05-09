const { Model, DataTypes } = require('sequelize');

class Job extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        salary: DataTypes.DOUBLE,
        dev_type: DataTypes.STRING,
        technologies: DataTypes.STRING,
      },
      {
        underscored: true,
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Employer, { foreignKey: 'employer_id', as: 'employers' });
    this.belongsTo(models.Employee, { foreignKey: 'employee_id', as: 'employees' });
    this.hasMany(models.Match, { foreignKey: 'job_id', as: 'job' });
  }
}

module.exports = Job;
