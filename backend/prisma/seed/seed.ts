/**
 * ! Executing this script will delete all data in your database and seed it with 10 user.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from '@snaplet/seed';
import { faker } from '@faker-js/faker';

const main = async () => {
  const seed = await createSeedClient();

  // Truncate all tables in the database
  await seed.$resetDatabase();

  await seed.user([
    {
      role: 'USER',
      password: '$2b$10$Ho9zTgkn5aYHabLZv3gfT.D/JNqon7hWBtrY/DqQD91caobRRNuyC',
      providerId: null,
      providerType: null,
    },
    {
      role: 'USER',
      password: '$2b$10$Ho9zTgkn5aYHabLZv3gfT.D/JNqon7hWBtrY/DqQD91caobRRNuyC',
      providerId: null,
      providerType: null,
    },
    {
      role: 'USER',
      password: '$2b$10$Ho9zTgkn5aYHabLZv3gfT.D/JNqon7hWBtrY/DqQD91caobRRNuyC',
      providerId: null,
      providerType: null,
    },
    {
      role: 'USER',
      password: '$2b$10$Ho9zTgkn5aYHabLZv3gfT.D/JNqon7hWBtrY/DqQD91caobRRNuyC',
      providerId: null,
      providerType: null,
    },
    {
      role: 'USER',
      password: '$2b$10$Ho9zTgkn5aYHabLZv3gfT.D/JNqon7hWBtrY/DqQD91caobRRNuyC',
      providerId: null,
      providerType: null,
    },
    {
      role: 'USER',
      password: '$2b$10$Ho9zTgkn5aYHabLZv3gfT.D/JNqon7hWBtrY/DqQD91caobRRNuyC',
      providerId: null,
      providerType: null,
    },
    {
      role: 'USER',
      password: '$2b$10$Ho9zTgkn5aYHabLZv3gfT.D/JNqon7hWBtrY/DqQD91caobRRNuyC',
      providerId: null,
      providerType: null,
    },
    {
      role: 'USER',
      password: '$2b$10$Ho9zTgkn5aYHabLZv3gfT.D/JNqon7hWBtrY/DqQD91caobRRNuyC',
      providerId: null,
      providerType: null,
    },
    {
      role: 'USER',
      password: '$2b$10$Ho9zTgkn5aYHabLZv3gfT.D/JNqon7hWBtrY/DqQD91caobRRNuyC',
      providerId: null,
      providerType: null,
    },
  ]);

  // Seed the database with 10 user
  await seed.user((x) =>
    x(20, {
      password: '$2b$10$Ho9zTgkn5aYHabLZv3gfT.D/JNqon7hWBtrY/DqQD91caobRRNuyC',
      providerId: null,
      providerType: null,
      addresses: [{ isMainLocation: true }, {}, {}],
      store: [
        {
          addresses: [{ isMainLocation: true }],
          bankAccounts: [{}],
          carts: (x) => x({ max: 5 }),
          products: [
            {
              _CategoryToProduct: [{ categories: {} }],
              skus: (x) =>
                x({ min: 5, max: 10 }, ({ seed }) => ({
                  sku: `MY_SKU_${seed}`,
                  price: 10000,
                  discount: 0,
                  skuAttributes: [
                    {
                      value: faker.helpers.arrayElement([
                        'RED',
                        'GREEN',
                        'BLUE',
                      ]),
                      attribute: { name: 'Color' },
                    },
                    {
                      value: faker.helpers.arrayElement(['XL', 'L', 'MD']),
                      attribute: { name: 'Size' },
                    },
                    {
                      value: faker.helpers.arrayElement(['POLCADOT']),
                      attribute: { name: 'Motive' },
                    },
                  ],
                })),
            },
          ],
          courierServices: (x) => x({ max: 5, min: 3 }),
          orders: (x) => x({ min: 10, max: 15 }),
        },
      ],
    }),
  );

  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

  console.log('Database seeded successfully!');

  process.exit();
};

main();
