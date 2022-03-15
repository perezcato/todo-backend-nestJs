import { MigrationInterface, QueryRunner } from 'typeorm';

export class roleUserRelationship1647318796437 implements MigrationInterface {
  name = 'roleUserRelationship1647318796437';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users_roles_role" ("usersId" int8 NOT NULL, "roleId" int8 NOT NULL, CONSTRAINT "PK_3fb5295f0482f3c5090b41a5427" PRIMARY KEY ("usersId", "roleId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3ea8bcae76ff0b74bcc1340af8" ON "users_roles_role" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_03c652226fd376f26b31503d40" ON "users_roles_role" ("roleId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles_role" ADD CONSTRAINT "FK_3ea8bcae76ff0b74bcc1340af86" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles_role" ADD CONSTRAINT "FK_03c652226fd376f26b31503d40c" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_roles_role" DROP CONSTRAINT "FK_03c652226fd376f26b31503d40c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles_role" DROP CONSTRAINT "FK_3ea8bcae76ff0b74bcc1340af86"`,
    );

    await queryRunner.query(
      `DROP INDEX "users_roles_role"@"IDX_03c652226fd376f26b31503d40" CASCADE`,
    );
    await queryRunner.query(
      `DROP INDEX "users_roles_role"@"IDX_3ea8bcae76ff0b74bcc1340af8" CASCADE`,
    );
    await queryRunner.query(`DROP TABLE "users_roles_role"`);
  }
}
