import {Sequelize} from "sequelize";

export const createDb = (): Sequelize => {
    return new Sequelize("sqlite::memory:");
};
