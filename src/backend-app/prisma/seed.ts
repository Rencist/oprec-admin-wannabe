import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { hash } from 'bcrypt';
import * as csv from 'csvtojson';

const SALT_PASSWORD = 12;

async function main() {
  await csv()
    .fromFile(__dirname + '/data/data.csv')
    // .then(async (data) => {
    //   for (const data of data) {
    //     data.id = parseInt(data.id);
    //     try {
    //       await prisma.data.upsert({
    //         where: { id: data.id },
    //         update: data,
    //         create: data,
    //       });
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   }
    // });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    process.exit(0);
  });
