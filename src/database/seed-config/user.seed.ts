import { UserFunction } from 'src/users/entities/user.entity';

export const UserAdminSeed = {
  name: 'admin',
  email: 'admin@email.com',
  password: '',
  phone: 'valid-phone-number',
  function: UserFunction.ADMIN,
  created_at: new Date(),
  updated_at: new Date(),
};
