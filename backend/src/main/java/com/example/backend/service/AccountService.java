package com.example.backend.service;

import com.example.backend.model.Account;
import com.example.backend.model.dto.AccountDto;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;

public interface AccountService extends UserDetailsService {

    List<Account> findAllAccounts();

    Optional<Account> findOneAccount(String username);

    Account addAccount(AccountDto accountDto);

    Account editAccount(AccountDto accountDto, String username);

    void deleteAccount(String username);
}
