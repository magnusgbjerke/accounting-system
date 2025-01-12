package com.company.accountingsystem.voucher;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@NoArgsConstructor
@Data
@Schema(name = "VoucherResponse")
public class VoucherResponseDTO extends VoucherRequestDTO {

    public VoucherResponseDTO(Integer nr, LocalDate date, Integer account, BigDecimal amount) {
        super(nr, date, account, amount);
    }
}
