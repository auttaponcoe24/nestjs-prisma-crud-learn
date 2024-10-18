import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 8001;
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  // await app.listen(8000);

  await app.listen(port, () => console.log(`Server is run on PORT: ${port}`));
}
bootstrap();