import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'POC_KAFKA_INSTANCE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [process.env.KAFKA_BROKER],
            ssl: true,
            sasl: {
              username: process.env.KAFKA_USERNAME,
              password: process.env.KAFKA_PASSWORD,
              mechanism: 'plain',
            },
            requestTimeout: 4500,
          },
          consumer: {
            groupId: process.env.KAFKA_CONSUMER_GROUP,
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export default class KafkaModule {}
