import { DataSource } from 'typeorm';

export const getDbConnection = async (dbName: string): Promise<DataSource> => {
    return new DataSource({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "my-secret-pw",
        database: "mydb",
    })
};