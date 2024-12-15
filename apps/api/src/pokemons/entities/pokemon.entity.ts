
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EntityAbility, EntityMove, EntityPokemon, EntityType } from "@repo/business/pokemon/interface";
import { EStatus } from "@repo/business/api/enum";

@Entity({ name: 'pokemons' })
export class Pokemon implements EntityPokemon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  hp?: number;

  @Column({ nullable: false, length: 50 })
  url: string;

  @Column({ nullable: false, length: 200 })
  name: string;

  @Column({ nullable: true, length: 200 })
  image?: string;

  @Column({ nullable: true })
  speed?: number;

  moves?: Array<EntityMove>;

  @Column({ nullable: false })
  order: number;

  types?: Array<EntityType>;

  @Column({ nullable: false, default: EStatus.INCOMPLETE })
  status: EStatus;

  @Column({ nullable: true })
  attack?: number;

  @Column({ nullable: true })
  defense?: number;

  @Column({ nullable: true, length: 50 })
  habitat?: string;

  @Column({ nullable: true })
  is_baby?: boolean;

  @Column({ nullable: true, length: 200 })
  shape_url?: string;

  abilities?: Array<EntityAbility>;

  evolutions?: Array<EntityPokemon>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column({ nullable: true, length: 200 })
  shape_name?: string;

  @Column({ nullable: true })
  is_mythical?: boolean;

  @Column({ nullable: true })
  gender_rate?: number;

  @Column({ nullable: true })
  is_legendary?: boolean;

  @Column({ nullable: true })
  capture_rate?: number;

  @Column({ nullable: true })
  hatch_counter?: number;

  @Column({ nullable: true })
  base_happiness?: number;

  @Column({ nullable: true })
  special_attack?: number;

  @Column({ nullable: true })
  special_defense?: number;

  @Column({ nullable: true, length: 200 })
  evolution_chain_url?: string;

  @Column({ nullable: true, length: 200 })
  evolves_from_species?: string;

  @Column({ nullable: true })
  has_gender_differences?: boolean;
}
