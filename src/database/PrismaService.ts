import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

/* 
    Essa classe serve para permitirmos que o Prisma abra e feche as
    conexões com o banco de dados.
*/

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{

    async onModuleInit() {
        await this.$connect();
    }

    async enableShutdownHooks(app: INestApplication){
        this.$on('beforeExit', async () => {
            await app.close()
        })
    }
}