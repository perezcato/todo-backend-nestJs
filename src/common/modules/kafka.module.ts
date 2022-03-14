import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
              username: process.env.USERNAME,
              password: process.env.PASSWORD,
              mechanism: 'plain',
            },
            requestTimeout: 4500,
          },
          consumer: {
            groupId: process.env.CONSUMER_GROUP,
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export default class KafkaModule {}
