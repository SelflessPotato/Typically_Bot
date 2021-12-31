import {DataTypes, Model} from "sequelize";
import sequelize from "$lib/db/db";

class Guild extends Model {
    updateLastSleep() {
        this.update({lastsleep: new Date()})
    }
}

Guild.init({
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    lastsleep: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Guild'
});

export default Guild