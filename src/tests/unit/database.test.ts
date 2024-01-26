// tests/unit/index.test.ts
import { DataSourceOptions, createConnection, getConnection } from 'typeorm';
import * as config from "../ormconfig.test.json";
import { User } from "./entities/User";
import { Product } from "./entities/Product";


describe('Database Connection', () => {
	// Assuming you have a test database configuration in ormconfig.test.json
	const isTesting = process.env.NODE_ENV === 'test';
	
	// Skip the tests if not in a testing environment
	if (!isTesting) {
		it.skip('should connect to the database', () => {});
		it.skip('should close the database connection', () => {});
		return;
	}
	
	it('should connect to the database', async () => {
		await expect(createConnection(config.database as DataSourceOptions)).resolves.not.toThrow();
	});
	
	it('should close the database connection', async () => {
		//await createConnection(); // Establish connection
		await expect(getConnection().close()).resolves.not.toThrow();
	});
});
