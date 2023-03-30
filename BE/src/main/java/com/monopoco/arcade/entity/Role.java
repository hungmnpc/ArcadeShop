package com.monopoco.arcade.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@Table(name = "roles")
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Role {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
}
