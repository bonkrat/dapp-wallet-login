import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const whitelist = ['http://localhost:3000'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: function (origin, callback) {
      // allow requests with no origin
      if (!origin) return callback(null, true);
      if (whitelist.indexOf(origin) === -1) {
        var message =
          "The CORS policy for this origin doesn't " +
          'allow access from the particular origin.';
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  });
  await app.listen(4000);
}
bootstrap();
