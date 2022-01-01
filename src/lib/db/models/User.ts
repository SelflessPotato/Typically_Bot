import sequelize from '$lib/db/db';
import { DataTypes, Model } from 'sequelize';

class User extends Model {
  public declare id: string;
  public declare sleepcount: number;

  incrementSleepCount() {
    this.update({ sleepcount: this.sleepcount + 1 });
  }
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    sleepcount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export default User;
