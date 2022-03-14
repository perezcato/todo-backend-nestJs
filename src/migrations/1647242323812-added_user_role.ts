import { MigrationInterface, QueryRunner } from 'typeorm';

export class addedUserRole1647242323812 implements MigrationInterface {
  name = 'addedUserRole1647242323812';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "todo" ADD "admin" BOOLEAN`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "admin"`);
  }
}
