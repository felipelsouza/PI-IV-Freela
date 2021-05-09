const { Model, DataTypes } = require('sequelize');

class Match extends Model {
  static init(sequelize) {
    super.init(
      {
        status: DataTypes.STRING(2),
      },
      {
        underscored: true,
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Employer, { foreignKey: 'employer_id', as: 'employer' });
    this.belongsTo(models.Job, { foreignKey: 'job_id', as: 'job' });
    this.belongsTo(models.Employee, { foreignKey: 'employee_id', as: 'employee' });
  }
}

module.exports = Match;
