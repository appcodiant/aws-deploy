const db = require("../models");


const ContactModel = db.contact;
const UserModel = db.user;

class ContactService {

    async addAddress(body) {
        try {
            const user = await UserModel.findByPk(body.userId);
            if (!user || user == null) {
                return {
                    status: 400,
                    message: "Failed to add Address",
                    result: null
                }
            }
            const address = await ContactModel.create(body);
            if (address) {
                return {
                    status: 200,
                    message: "Address added Successfully",
                    result: address.dataValues
                }
            } else {
                return {
                    status: 400,
                    message: "Failed to add Address",
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

    async listOfAddress(body) {
        try {
            const list = await ContactModel.findAll({
                order: [['id', 'DESC']],
                include: [{ model: db.user,as:'user',attributes:['name','email','mobile']}],
            });
            if (list && list.length > 0) {
                return {
                    status: 200,
                    message: "List of address",
                    result: list
                }
            } else {
                return {
                    status: 400,
                    message: "Address not available",
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
}

module.exports = new ContactService();