import {MigrationInterface, QueryRunner} from "typeorm";

export class UserEntity1646191130414 implements MigrationInterface {
    name = 'UserEntity1646191130414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE "users_id_seq"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" INT DEFAULT nextval('"users_id_seq"') NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(6), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP SEQUENCE "users_id_seq"`);
    }

}
