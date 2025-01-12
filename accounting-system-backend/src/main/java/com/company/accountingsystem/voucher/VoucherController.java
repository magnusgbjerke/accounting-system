package com.company.accountingsystem.voucher;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "api/voucher")
@Validated
public class VoucherController {

    private final VoucherService voucherService;

    public VoucherController(VoucherService voucherService) {
        this.voucherService = voucherService;
    }

    @Operation(summary = "Get vouchers", description = "Gets vouchers", tags = {"voucher"})
    @ApiResponses(value = {@ApiResponse(
            description = "Successful operation",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = VoucherResponseDTO.class))})})
    @GetMapping
    public List<VoucherResponseDTO> getVouchers() {
        return voucherService.getVouchers();
    }

    @Operation(summary = "Create vouchers", description = "Creates vouchers.", tags = {"voucher"})
    @ApiResponses(value = {@ApiResponse(
            description = "successfully created",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = VoucherRequestDTO.class))})})
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createVouchers(@RequestBody @Valid List<VoucherRequestDTO> vouchers) {
        voucherService.createVouchers(vouchers);
    }
}
