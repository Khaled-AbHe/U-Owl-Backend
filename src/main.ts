import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
// import { Reflector } from '@nestjs/core';

const cookoieSession = require("cookie-session")

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(cookoieSession({
    keys: ["mySecretKey"] // Usually the key comes from a seperate file, not hard coded
  }))

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // this gets rid of what isnt in the object parameter
    forbidNonWhitelisted: true,
    transform: true
  }))
  
  // app.useGlobalInterceptors(
  //   new ClassSerializerInterceptor(app.get(Reflector))
  // )

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
