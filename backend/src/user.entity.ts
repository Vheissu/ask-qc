import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    ipAddress: string;

    @Column({ type: 'timestamp', nullable: true })
    firstQueryTimestamp: Date | null;

    @Column({ default: 0 })
    queryCount: number;
}
