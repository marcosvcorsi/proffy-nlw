import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateClassSchedule1598055600648
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'class_schedule',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'week_day',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'from',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'to',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'class_id',
            type: 'integer',
          },
        ],
        foreignKeys: [
          {
            name: 'ClassScheduleClasses',
            referencedTableName: 'classes',
            referencedColumnNames: ['id'],
            columnNames: ['class_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('class_schedule');
  }
}
