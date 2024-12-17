import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173'], // Allow only this origin (your React app)
    methods: 'GET,POST,PUT,PATCH,DELETE', // Allow methods you need
    allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
