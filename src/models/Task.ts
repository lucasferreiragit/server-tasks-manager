import { Model, DataTypes, Optional } from "sequelize";

export interface TaskAttributes {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "1" | "2" | "3" | "4" | "5";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskCreationAttributes
  extends Optional<TaskAttributes, "id" | "completed"> {}

export default (sequelize: any) => {
  class Task
    extends Model<TaskAttributes, TaskCreationAttributes>
    implements TaskAttributes
  {
    public id!: string;
    public title!: string;
    public description!: string;
    public completed!: boolean;
    public priority!: "1" | "2" | "3" | "4" | "5";
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }

  Task.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      priority: {
        type: DataTypes.ENUM("0", "1", "2", "3", "4"),
        defaultValue: "0",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "task",
      timestamps: true,
    }
  );

  return Task;
};
