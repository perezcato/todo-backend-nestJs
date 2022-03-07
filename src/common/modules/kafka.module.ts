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
            brokers: ['pkc-6ojv2.us-west4.gcp.confluent.cloud:9092'],
            ssl: true,
            sasl: {
              username: 'Z65D7EVKIR45UUDQ',
              password:
                'CRgr9RTtaFZLVtGUeXDqx0BK638iRZ6fAqHVgX3PwhjYwpJESP/R56IURmgzou6E',
              mechanism: 'plain',
            },
            requestTimeout: 4500,
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
