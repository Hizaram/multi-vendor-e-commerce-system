//src/entities/Product.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  name: string = "";

  @Column()
  price: number = 0;

  @ManyToOne(() => User, user => user.products)
  @JoinColumn({ name: "user_id" })
  user!: User;
}
