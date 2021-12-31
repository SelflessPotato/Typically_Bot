import {DataTypes, Model} from "sequelize";
import sequelize from "$lib/db/db";

class User extends Model {
    incrementSleepCount() {
        this.update({sleepcount: this.sleepcount + 1});
    }
}

User.init({
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    sleepcount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    sequelize,
    modelName: 'User'
});

export default User