import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors({
    origin: '*',
  });

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Backend integradora')
    .setDescription('The API endpoints description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Aquí especifica la dirección IP y el puerto
  // const ip = '192.168.88.7';
  const port = 2451;

  await app.listen(port, () => {
    // console.log('\n');
    // console.log('\x1b[34m|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\x1b[0m');
    // console.log(`\x1b[34m||||||||\x1b[0m \x1b[1m\x1b[32mServidor corriendo en ${port}\x1b[0m \x1b[34m||||||||\x1b[0m`);
    // console.log('\x1b[34m|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\x1b[0m');
    // console.log('\n');
  });
}
bootstrap();
