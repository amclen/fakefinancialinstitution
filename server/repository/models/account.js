module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account', {
      accountId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      balance: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      }
    });
  
    Account.associate = (models) => {
      Account.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    };
  
    return Account;
  };
  