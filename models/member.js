'use strict';
module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    name: DataTypes.STRING,
    nrp: DataTypes.STRING
  }, {});
  Member.associate = function(models) {
    // associations can be defined here
  };
  return Member;
};