package com.company.accountingsystem.account;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Account {
    @Id
    @Schema(example = "1900")
    private Integer nr;
    @Schema(example = "Kontanter")
    @Column(nullable = false)
    private String name;
}
