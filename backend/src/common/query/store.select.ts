import { Prisma } from '@prisma/client';
import { selectProfile } from '@/common/query/profile.select';
import { selectUserSimplified } from '@/common/query/user.select';

export type SelectStorePayload = Prisma.StoreGetPayload<{
  select: typeof selectStore;
}>;

export const selectStoreSimplified = {
  id: true,
  name: true,
  slogan: true,
  logoAttachment: true,
  bannerAttachment: true,
  createdAt: true,
  updatedAt: true,
  description: true,
  domain: true,
  user: { select: selectUserSimplified },
  _count: { select: { products: true } },
} satisfies Prisma.StoreSelect;

export type StoreSimplified = Prisma.StoreGetPayload<{
  select: typeof selectStoreSimplified;
}>;

export const selectStore = {
  ...selectStoreSimplified,
  user: {
    select: {
      ...selectUserSimplified,
      profile: {
        select: selectProfile,
      },
    },
  },
} satisfies Prisma.StoreSelect;

export type Store = Prisma.StoreGetPayload<{ select: typeof selectStore }>;
