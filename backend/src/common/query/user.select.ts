import { Prisma } from '@prisma/client';
import { selectProfileSimplified } from './profile.select';

export const selectUserSimplified = {
  id: true,
  profile: {
    select: selectProfileSimplified,
  },
} satisfies Prisma.UserSelect;

export type UserSimplified = Prisma.UserGetPayload<{
  select: typeof selectUserSimplified;
}>;

export const selectUser = {
  ...selectUserSimplified,
  password: true,
  email: true,
  role: true,
  isVerified: true,
  profile: {
    select: {
      ...selectUserSimplified.profile.select,
      bio: true,
      birthDate: true,
      gender: true,
      phone: true,
      fullName: true,
      profilePicture: true,
      username: true,
    },
  },
} satisfies Prisma.UserSelect;

export type User = Prisma.UserGetPayload<{
  select: typeof selectUser;
}>;
