import { envs } from './config/envs';
import { MongoDatabase } from './data';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';


(async()=> {
  main();
})();


async function main() {

  /* Connect BD mongo */
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB,
    mongoUrl: envs.MONGO_URL
  })

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}