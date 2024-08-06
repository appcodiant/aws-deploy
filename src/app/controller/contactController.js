const contactService = require("../services/contactService");

class ContactController {

    async addAddress(req,res,next){
        try {
            const { body } = req;
            let input = {};
            input.permenent_address = body.permanant_address;
            input.current_address = body.current_address;
            input.userId = body.userId;
            const user = await contactService.addAddress(input);
            if (user.status == 200) {
                return res.status(200).json(user);
            } else {
                return res.status(400).json(user);
            }
        } catch (error) {
            return res.status(500).json({ status: 500, message: 'Internal server error', result: error.message });
        }
    }

    async listOfAddress(req,res,next){
        try {
            const { body } = req;
            let input = {};
            input.userId = body.userId;
            const user = await contactService.listOfAddress(input);
            if (user.status == 200) {
                return res.status(200).json(user);
            } else {
                return res.status(400).json(user);
            }
        } catch (error) {
            return res.status(500).json({ status: 500, message: 'Internal server error', result: error.message });
        }
    }
}
module.exports = new ContactController();