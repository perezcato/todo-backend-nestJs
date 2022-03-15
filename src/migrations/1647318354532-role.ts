import { MigrationInterface, QueryRunner } from 'typeorm';

export class role1647318354532 implements MigrationInterface {
  name = 'role1647318354532';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SEQUENCE "role_id_seq"`);
    await queryRunner.query(
      `CREATE TABLE "role" ("id" INT DEFAULT nextval('"role_id_seq"') NOT NULL, "role" varchar NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `ALTER TABLE "users" ADD "admin" bool NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "admin"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP SEQUENCE "role_id_seq"`);
  }
}
