package com.company.accountingsystem.year;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Year {
    @Id
    private Integer nr;
}
