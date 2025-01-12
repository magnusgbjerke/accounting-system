package com.company.accountingsystem.audit;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Embeddable
public class Audit {
    private LocalDateTime createdOn;
    private LocalDateTime updatedOn;
}