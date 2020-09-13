import {Sequelize} from "sequelize";

export const createDb = () => {
    return new Sequelize("sqlite::memory:");
};
