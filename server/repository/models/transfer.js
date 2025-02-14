module.exports = (sequelize, DataTypes) => {
    const Transfer = sequelize.define('Transfer', {
      transferId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      amount: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      fromAccountId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      toAccountId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    });
  
    Transfer.associate = (models) => {
      Transfer.belongsTo(models.Account, {
        foreignKey: 'fromAccountId',
        as: 'fromAccount',
      });
  
      Transfer.belongsTo(models.Account, {
        foreignKey: 'toAccountId',
        as: 'toAccount',
      });
    };
  
    return Transfer;
  };
  