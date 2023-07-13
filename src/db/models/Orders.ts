import DataTypes, { DataTypes as Sequelize } from "sequelize";

const ordersModel = {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
    },
    companyName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    customerAddress: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    orderedItem: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    canceled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
};

const OrderOptions = {
    timestamps: false,
    freezeTableName: true,
};

export const getModel = (seq) => {
    return seq.define("Orders", ordersModel, OrderOptions);
};
