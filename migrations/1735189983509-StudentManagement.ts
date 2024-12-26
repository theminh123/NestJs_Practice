import { MigrationInterface, QueryRunner } from 'typeorm';

export class StudentManagement1735189983509 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "class" (
        "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        "className" VARCHAR NOT NULL UNIQUE,
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "student" (
        "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        "studentName" VARCHAR NOT NULL,
        "className" VARCHAR,
        CONSTRAINT "FK_classEntity" FOREIGN KEY ("className") REFERENCES "class" ("className") ON UPDATE CASCADE ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS "student";
    `);

    await queryRunner.query(`
      DROP TABLE IF EXISTS "class";
    `);
  }
}
