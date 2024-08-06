
module.exports = (sequelize, DataTypes, Model) => {
    class Contact extends Model { }

    Contact.init({
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        permenent_address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        current_address: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "ContactModel",
        tableName: "contact"
    });

    return Contact;
}