import {DataTypes, Model} from "sequelize";
import sequelize from "$lib/db/db";

class Saying extends Model {}

Saying.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Saying'
});

export default Saying