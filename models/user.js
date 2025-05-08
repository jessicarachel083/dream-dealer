'use strict';
const {
  Model
} = require('sequelize');

var bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile, {
        foreignKey: "UserId"
      })
      User.hasMany(models.Cart, {
        foreignKey: "UserId"
      })
    }

    get joinSince() {
      return new Date(this.createdAt).getFullYear()
    }
    
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Username harus ada!"
        },
        notNull: {
          msg: "Username harus ada!"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Email harus ada!"
        },
        notNull: {
          msg: "Email harus ada!"
        },
        isEmail: {
          msg: "Harus format email!"
        },
        unique: {
          args: true,
          msg: "Email sudah terdaftar!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Masukkan password!"
        },
        notNull: {
          msg: "Masukkan password!"
        },
        len: {
          args: [8],
          msg: "Password harus lebih dari 8 karakter!"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Role harus dipilih!"
        },
        notNull: {
          msg: "Role harus dipilih!"
        },
        isIn: {
          args: [["buyer", "seller"]],
          msg: "Pilih salah satu role!"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(instance => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(instance.password, salt)
    
    instance.password = hash
  })

  return User;
};