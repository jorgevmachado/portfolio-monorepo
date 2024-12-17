import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import type { EntityMove } from '@repo/business/pokemon/interface';

@Entity({ name: 'moves' })
export class Move implements EntityMove {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  pp: number;

  @Column({ nullable: false, length: 50 })
  url: string;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false, length: 200 })
  name: string;

  @Column({ nullable: false })
  order: number;

  @Column({ nullable: true })
  power?: number;

  @Column({ nullable: true })
  target: string;

  @Column({ nullable: true })
  effect: string;

  @Column({ nullable: true })
  priority: number;

  @Column({ nullable: true })
  accuracy?: number;

  pokemons?: Array<string>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column({ nullable: true })
  short_effect: string;

  @Column({ nullable: true })
  damage_class: string;

  @Column({ nullable: true })
  effect_chance?: number;

  @Column({ nullable: true })
  learned_by_pokemon: string;

  constructor(move?: Move) {
    if (move) {
      this.id = move.id ?? this.id;
      this.pp = move.pp ?? this.pp;
      this.url = move.url ?? this.url;
      this.type = move.type ?? this.type;
      this.name = move.name ?? this.name;
      this.order = move.order ?? this.order;
      this.power = move.power ?? this.power;
      this.target = move.target ?? this.target;
      this.effect = move.effect ?? this.effect;
      this.priority = move.priority ?? this.priority;
      this.accuracy = move.accuracy ?? this.accuracy;
      this.pokemons = move.pokemons ?? this.pokemons;
      this.created_at = move.created_at ?? this.created_at;
      this.updated_at = move.updated_at ?? this.updated_at;
      this.deleted_at = move.deleted_at ?? this.deleted_at;
      this.short_effect = move.short_effect ?? this.short_effect;
      this.damage_class = move.damage_class ?? this.damage_class;
      this.effect_chance = move.effect_chance ?? this.effect_chance;
      this.learned_by_pokemon = move.learned_by_pokemon ?? this.learned_by_pokemon;
    }
  }
}