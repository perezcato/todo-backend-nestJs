import { MigrationInterface, QueryRunner } from 'typeorm';

export class addedEmojiToTodos1646578443649 implements MigrationInterface {
  name = 'addedEmojiToTodos1646578443649';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "todo" ADD "emoji" varchar`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "emoji"`);
  }
}
