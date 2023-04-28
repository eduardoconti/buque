import { UserEntity } from '@domain/entities';
import { DateVO, Email, Name, Password, UUID } from '@domain/value-objects';

export const mockUserEntity = new UserEntity({
  id: new UUID('b85381d7-174f-4c0a-a2c8-aa93a399965d'),
  createdAt: new DateVO(new Date()),
  updatedAt: new DateVO(new Date()),
  props: {
    name: new Name('Eduardo Conti'),
    email: new Email('es.eduardoconti@gmail.com'),
    password: new Password(
      '$2b$10$QpOBIm7/vj8Xj07uQElgK.hWowRENs/qhHiDJsCtwIh5zxxobVzG2',
    ),
  },
});
