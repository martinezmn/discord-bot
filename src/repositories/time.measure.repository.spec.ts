// import { beforeAll, describe, expect, it } from 'vitest';
// import { User } from '../entities/user';
// import { prismaClient } from '../services/prisma.client';
// import { UserRepository } from './user.repository';

// describe('TimeMeasureRepository tests', () => {
//   beforeAll(async () => {
//     await prismaClient.user.deleteMany();
//   });

//   it('should be able to save a user in the database', async () => {
//     const userRepository = new UserRepository();

//     const user = await userRepository.create(
//       new User({
//         id: '123456789',
//         name: 'User Test 01',
//       })
//     );

//     expect(user).toBeInstanceOf(User);
//     expect(user.name).toEqual('User Test 01');
//   });

//   it('should be able to return a user from the database', async () => {
//     const userRepository = new UserRepository();

//     const user = await userRepository.findOneById('123456789');

//     expect(user).toBeInstanceOf(User);
//     expect(user?.name).toEqual('User Test 01');
//   });
// });
