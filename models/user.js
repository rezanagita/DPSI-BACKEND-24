module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      username: {
          type: DataTypes.STRING,
          allowNull: false
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false
      },
      role: {
          type: DataTypes.ENUM('admin', 'user'),
          allowNull: false
      },
    //   profilePic: {
    // type: DataTypes.STRING
    // }
  }, {
      timestamps: true // This will automatically add createdAt and updatedAt
  });

  return User;
};