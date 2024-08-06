
const encryption = require('../../constants/encryption');
const UserService = require('../services/UserService');

class UserController {

    async createUser(req, res, next) {
        try {
            const { body } = req;
            let input = {};
            input.name = body.name;
            input.email = body.email;
            input.mobile = body.mobile;
            input.password = body.password;
            const user = await UserService.createUser(input);
            if (user.status == 200) {
                return res.status(200).json(user);
            } else {
                return res.status(400).json(user);
            }
        } catch (err) {
            return res.status(500).json({ status: 500, message: 'Internal server error', result: err.message });
        }
    }

    async listOfUsers(req, res, next) {
        try {
            const { body } = req;
            console.log(body);
            let input = {};
            input.limit = body.limit;
            input.page = body.page;
            const users = await UserService.getUserList(input);
            if (users.status == 200) {
                return res.status(200).json(users);
            } else {
                return res.status(400).json(users);
            }
        } catch (error) {
            return res.status(500).json({ status: 500, message: 'Internal server error', result: error.message });
        }
    }

    async userDetails(req, res, next) {
        try {
            const { body } = req;
            const id = body.id;
            const users = await UserService.userDetails(id);
            if (users.status == 200) {
                return res.status(200).json(users);
            } else {
                return res.status(400).json(users);
            }
        } catch (error) {
            return res.status(500).json({ status: 500, message: 'Internal server error', result: error.message });
        }
    }

    async updateUser(req, res, next) {
        try {
            const { body } = req;
            let input = {};
            input.name = body.name;
            input.id = body.id;
            input.email = body.email;
            input.mobile = body.mobile;
            input.password = body.password;
            const user = await UserService.updateUser(input);
            if (user.status == 200) {
                return res.status(200).json(user);
            } else {
                return res.status(400).json(user);
            }
        } catch (err) {
            return res.status(500).json({ status: 500, message: 'Internal server error', result: err.message });
        }
    }

    async login(req, res, next) {
        try {
            const { body } = req;
            let input = {};
            input.mobile = body.username;
            input.password = body.password;
            const user = await UserService.login(input);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ status: 500, message: 'Internal server error', result: error.message });
        }
    }

    async encryptDecrypt(req, res, next) {
        try {
            const { body } = req;
            let input = {};
            input.data = body.data;
            input.type = body.type;
            let response = "";
            if (input.type === "encrypt") {
                response = encryption.encryptData(input.data);
            } else {
                response = encryption.decryptData(input.data);
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({ status: 500, message: 'Internal server error', result: error.message });
        }
    }
}

module.exports = new UserController();