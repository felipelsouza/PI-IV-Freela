'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('jobs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      employer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model:'employers', key:'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {model:'employees', key:'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      salary: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      dev_type: {
        type: Sequelize.DataTypes.ENUM({
          values: ['frontend', 'backend','fullstack']
        }),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('jobs');
  }
};
