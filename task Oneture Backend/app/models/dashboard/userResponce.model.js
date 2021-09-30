module.exports = (sequelize, DataTypes) => {
    const UserResponce = sequelize.define("registrationform", {
      title: {
        type: DataTypes.STRING
      },
      name: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
      gender: {
        type: DataTypes.STRING
      },
      dob: {
        type: DataTypes.STRING
      },
      age: {
        type: DataTypes.INTEGER
      },
      dob: {
        type: DataTypes.STRING
      },
      mobile: {
        type: DataTypes.STRING
      },
      personal_email: {
        type: DataTypes.STRING
      },
      official_email: {
        type: DataTypes.STRING
      },
      ideaDescription: {
        type: DataTypes.STRING
      },
      componyRevenues: {
        type: DataTypes.STRING
      },
      teamDescription: {
        type: DataTypes.STRING
      },
      productDescription: {
        type: DataTypes.STRING
      },
      customerDescription: {
        type: DataTypes.STRING
      },
      CompetitorsDescription: {
        type: DataTypes.STRING
      },
      advantegesDescription: {
        type: DataTypes.STRING
      },
      selfDecision: {
        type: DataTypes.STRING
      }
    },{
       freezeTableName: true,
       timestamps: false
    });
    return UserResponce;
  };
