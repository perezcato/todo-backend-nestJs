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
            clientId: 'poc_test_consumer',
            brokers: ['137.184.236.59:9092'],
            requestTimeout: 45000,
          },
          consumer: {
            groupId: 'poc_test_consumer_group',
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export default class KafkaModule {}
