import { MigrationInterface, QueryRunner } from 'typeorm';

export class TodoEntiry1646009551048 implements MigrationInterface {
  name = 'TodoEntiry1646009551048';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SEQUENCE "todo_id_seq"`);
    await queryRunner.query(
      `CREATE TABLE "todo" ("id" INT DEFAULT nextval('"todo_id_seq"') NOT NULL, "name" varchar NOT NULL, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "todo"`);
    await queryRunner.query(`DROP SEQUENCE "todo_id_seq"`);
  }
}
