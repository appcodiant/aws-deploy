const  jwtoken  = require("jsonwebtoken");
const db = require("../models");

const UserModel = db.user;
class UserService {

   async getUserList(body) {
      try {
         let offSet = 0;
         let totalPages = 0;
         await UserModel.findAndCountAll().then((data) => {
            totalPages = Math.ceil(data.count / body.limit);
            offSet = body.limit * (body.page - 1);
         });
         const userList = await UserModel.findAll({
            limit: body.limit,
            offset: offSet,
            include: [{ model: db.contact, as: 'contact' }],
            order: [['id', 'DESC']],

            attributes: {
               exclude: ['password'],
            },
         });
         if (userList && userList.length > 0) {
            return {
               status: 200,
               message: "List of users",
               pages: totalPages,
               result: userList
            }
         } else {
            return {
               status: 400,
               message: "No users found",
               result: []
            }
         }
      } catch (error) {
         return {
            status: 401,
            message: "" + error.message,
            result: null
         }
      }
   }

   async userDetails(body) {
      try {
         const user = await UserModel.findOne({
            where: {
               id: body
            },
            attributes: {
               exclude: ['password'],
            }
         });
         if (user) {
            return {
               status: 200,
               message: "User details",
               result: user
            }
         } else {
            return {
               status: 400,
               message: "No user found",
               result: null
            }
         }
      } catch (error) {
         return {
            status: 401,
            message: "" + error.message,
            result: null
         }
      }
   }

   async createUser(userData) {
      try {
         const user = await UserModel.create(userData);
         if (user) {
            return {
               status: 200,
               message: "User Created Successfully",
               result: user.dataValues
            }
         } else {
            return {
               status: 400,
               message: "Failed to add user",
               result: user
            }
         }
      } catch (error) {
         return {
            status: 401,
            message: "" + error.message,
            result: null
         }
      }
   }

   async updateUser(body) {
      console.log(body);
      try {
         const userDetails = await UserModel.findByPk(body.id);
         if (userDetails && userDetails !== null) {
            const updateUser = await UserModel.update(body, { where: { id: body.id } });
            if (updateUser) {
               return {
                  status: 200,
                  message: "User updated succesfully",
                  result: null
               }
            } else {
               return {
                  status: 400,
                  message: "User update failed",
                  result: null
               }
            }

         } else {
            return {
               status: 400,
               message: "User update failed",
               result: null
            }
         }
      } catch (error) {
         return {
            status: 401,
            message: "" + error.message,
            result: null
         }
      }
   }

   async login(body) {
      let user = await UserModel.findOne({
         where: {
            mobile: body.mobile,
            password: body.password
         },
         attributes: {
            exclude: ['password'],
         }
      });
      if (user) {
         console.log('secreate',process.env.JWT_SECRET);
         const token = jwtoken.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: '30d' });
         user.dataValues.token = token;
         return {
            status: 200,
            message: "User details",
            result: user
         }
      } else {
         return {
            status: 400,
            message: "Login failed",
            result: null
         }
      }
   }
}

module.exports = new UserService();