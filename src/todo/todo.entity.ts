import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  body: string;

  @Column()
  dateCreated: Date;

  @Column({ nullable: true })
  dateUpdated: Date;
}
