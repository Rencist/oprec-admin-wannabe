import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as csv from 'csvtojson';

async function main() {
  await csv()
    .fromFile(__dirname + '/data/list_lab.csv')
    .then(async (datas) => {
      for (const data of datas) {
        data.id = parseInt(data.id);
        await prisma.list_lab.upsert({
          where: { id: data.id },
          update: data,
          create: data,
        });
      }
    });
  
  await csv()
    .fromFile(__dirname + '/data/list_admin.csv')
    .then(async (datas) => {
      for (const data of datas) {
        data.id = parseInt(data.id);
        data.list_lab_id = parseInt(data.list_lab_id);
        try {
          await prisma.list_admin.upsert({
            where: { id: data.id },
            update: data,
            create: data,
          });
        } catch (e) {
          console.log(e);
        }
      }
    });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
