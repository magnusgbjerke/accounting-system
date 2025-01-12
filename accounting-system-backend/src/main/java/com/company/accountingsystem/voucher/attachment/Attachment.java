package com.company.accountingsystem.voucher.attachment;

import com.company.accountingsystem.account.Account;
import com.company.accountingsystem.voucher.Voucher;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table
@NoArgsConstructor
@Data
public class Attachment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne(optional = false)
    @JoinColumns({
            @JoinColumn(name = "voucher_nr_fk"),
            @JoinColumn(name = "voucher_year_fk")
    })
    private Voucher voucher;
    @Column(nullable = false)
    private LocalDate date;
    @ManyToOne(optional = false)
    private Account account;
    @Column(nullable = false, scale = 2)
    private BigDecimal amount;

    public Attachment(Voucher voucher, LocalDate date, Account account, BigDecimal amount) {
        this.voucher = voucher;
        this.date = date;
        this.account = account;
        this.amount = amount;
    }
}