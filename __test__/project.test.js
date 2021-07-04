/**
 * @jest-environment node
 */
import mongoose from'mongoose';
import project from '../server/services/project.js'
import faker from 'faker';

describe('get by project by name', () => {

	beforeAll(async () => {

		await mongoose.connect(process.env.MONGO_URL,
			{

				useNewUrlParser: true,

				useUnifiedTopology: true,

				useCreateIndex: true,

			}
		);
	}, 50000);

	afterAll(async () => {
		await mongoose.disconnect();
	}, 50000);

	const project_object = {
		name: faker.name.firstName(),
		abstract: faker.lorem.words(),
		authors: [faker.name.firstName(), faker.name.lastName()],
		tags: [faker.lorem.word(), faker.lorem.word()],
		createdBy: mongoose.Types.ObjectId(),
	}

	it('should create a project and get that project by name', async () => {
		const req = await project.create(project_object);
		const res = await project.getProjectsByName(req[1].name);


		expect(req[0]).toBe(true);
		expect(res[0].name).toContain(req[1].name);
		
	});

})