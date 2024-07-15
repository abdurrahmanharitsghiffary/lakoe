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
} satisfies Prisma.UserSelect;

export type User = Prisma.UserGetPayload<{
  select: typeof selectUser;
}>;
