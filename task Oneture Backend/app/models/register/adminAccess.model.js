module.exports = (sequelize, DataTypes) => {
    const adminRegister = sequelize.define("adminaccess", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      Name: {
        type: DataTypes.STRING,
        primaryKey:true
      },
      userName: {
        type: DataTypes.STRING,
        primaryKey:true
      },
      password: {
        type: DataTypes.STRING
      },
      lastLoginAt: {
        type: DataTypes.STRING,
        primaryKey:true
      },
    },{
       freezeTableName: true,
       timestamps: false
    });
    return adminRegister;
  };
