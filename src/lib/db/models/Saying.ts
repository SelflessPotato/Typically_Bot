import sequelize from '$lib/db/db';
import { DataTypes, Model } from 'sequelize';

class Saying extends Model {
  public declare id: string;
  public declare message: string;
}

Saying.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Saying',
  }
);

export default Saying;
