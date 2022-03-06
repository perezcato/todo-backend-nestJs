import { MigrationInterface, QueryRunner } from 'typeorm';

export class userTodoRelationship1646565837201 implements MigrationInterface {
  name = 'userTodoRelationship1646565837201';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "todo" ADD "userId" int8`);
    await queryRunner.query(
      `CREATE INDEX "IDX_1e982e43f63a98ad9918a86035" ON "todo" ("userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ADD CONSTRAINT "FK_1e982e43f63a98ad9918a86035c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todo" DROP CONSTRAINT "FK_1e982e43f63a98ad9918a86035c"`,
    );
    await queryRunner.query(
      `DROP INDEX "todo"@"IDX_1e982e43f63a98ad9918a86035" CASCADE`,
    );
    await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "userId"`);
  }
}
