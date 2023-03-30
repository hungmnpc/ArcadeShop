package com.monopoco.arcade.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Table(name = "additional_info_title")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class AdditionalInfoTitle {

    @Id
    private String id;

    @Column(name = "title", unique = true, nullable = false)
    private String title;


}
