import { faker } from '@faker-js/faker';

import { prisma } from './../../src/database';

export default async function createCategory() {
  const category = await prisma.category.create({
    data: {
      name: faker.science.chemicalElement().name
    }
  });

  return category;
}
