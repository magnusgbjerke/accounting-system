package com.company.accountingsystem.voucher;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Schema(name = "VoucherRequest")
@JsonPropertyOrder({"nr", "date", "account", "amount"})
public class VoucherRequestDTO {
    @Schema(example = "1")
    @NotNull(message = "Field can not be null.")
    @Min(value = 1, message = "Field has to be 1 or higher.")
    private Integer nr;

    @Schema(example = "2023-02-02")
    @NotNull(message = "Field can not be null.")
    private LocalDate date;

    @Schema(example = "1920")
    @Min(value = 1000, message = "Field can never go below 1000.")
    @Max(value = 8000, message = "Field can never exceed 8000.")
    @NotNull(message = "Field can not be null.")
    private Integer account;

    @Schema(example = "100")
    @NotNull(message = "Field can not be null.")
    @Digits(integer = 10, fraction = 2, message = "Only two digits after decimal separator is allowed.")
    private BigDecimal amount;
}
