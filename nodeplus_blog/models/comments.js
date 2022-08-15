'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comments.belongsTo(models.Posts, { foreignKey: 'postId', sourceKey: 'postId', onDelete: 'CASCADE' })
      // define association here
    }
  }
  Comments.init({
    commentId:{
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    postId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};

// Comment.associate = function (models) {
//   Comments.hasMany(models.Posts, { foreignkey:"postId", onDelete:"cascade" });
// }
