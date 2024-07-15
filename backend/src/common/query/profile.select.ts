import { Prisma } from '@prisma/client';

export const selectProfileSimplified = {
  fullName: true,
  profilePicture: true,
  username: true,
} satisfies Prisma.ProfileSelect;

export type ProfileSimplified = Prisma.ProfileGetPayload<{
  select: typeof selectProfileSimplified;
}>;

export const selectProfile = {
  ...selectProfileSimplified,
  bio: true,
  birthDate: true,
  gender: true,
} satisfies Prisma.ProfileSelect;

export type Profile = Prisma.ProfileGetPayload<{
  select: typeof selectProfile;
}>;
