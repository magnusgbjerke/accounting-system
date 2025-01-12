package com.company.accountingsystem.account;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "api/account")
public class AccountController {
    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @Operation(summary = "Get accounts", description = "Gets accounts", tags = {"account"})
    @ApiResponses(value = {@ApiResponse(
            description = "Successful operation",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = Account.class))})})
    @GetMapping
    public List<Account> getAccounts() {
        return accountService.getAccounts();
    }
}
