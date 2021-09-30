module.exports = (sequelize, DataTypes) => {
    const userRegister = sequelize.define("users", {

      userID: {
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      fullName: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      emailOtp: {
        type: DataTypes.STRING
      },
      emailStatus: {
        type: DataTypes.STRING
      },
      phoneNo: {
        type: DataTypes.STRING
      },
      addressLine1: {
        type: DataTypes.STRING
      },
      addressLine2: {
        type: DataTypes.STRING
      },
      city: {
        type: DataTypes.STRING
      },
      countryCode: {
        type: DataTypes.INTEGER
      },
      country: {
        type: DataTypes.STRING
      },
      currentLocation: {
        type: DataTypes.STRING
      },
      currentLatLong: {
        type: DataTypes.STRING
      },
      otpPin: {
        type: DataTypes.STRING
      },
      phoneStatus: {
        type: DataTypes.INTEGER
      },
      password: {
        type: DataTypes.STRING
      }
    },{
       freezeTableName: true,
       timestamps: false
    });
    return userRegister;
  };
