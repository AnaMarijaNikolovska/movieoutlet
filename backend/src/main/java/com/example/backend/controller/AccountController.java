package com.example.backend.controller;

import com.example.backend.model.Account;
import com.example.backend.model.dto.AccountDto;
import com.example.backend.service.AccountService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/account")
public class AccountController {
    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping
    public List<Account> findAllAccounts(){
        return accountService.findAllAccounts();
    }

    @GetMapping("/{username}")
    public Optional<Account> findOneAccount(@PathVariable String username){
        return accountService.findOneAccount(username);
    }

    @PostMapping
    public Account addAccount(@RequestPart("accountDto")AccountDto accountDto, @RequestPart("accountPicture") MultipartFile accountPicture)throws IOException {
        return accountService.addAccount(accountDto);
    }

    @DeleteMapping("/{username}")
    public void deleteAccount(@PathVariable String username){
        accountService.deleteAccount(username);
    }

    @PutMapping("/{username}")
    public Account editAccount(@PathVariable String username, @RequestPart("accountDto")AccountDto accountDto, @RequestPart("accountPicture") MultipartFile accountPicture)throws IOException {
        return accountService.editAccount(accountDto, username);
    }
}
