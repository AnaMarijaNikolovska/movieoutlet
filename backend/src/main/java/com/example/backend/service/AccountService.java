package com.example.backend.service;

import com.example.backend.model.Account;
import com.example.backend.model.dto.AccountDto;
import com.example.backend.model.dto.AccountLoginDto;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface AccountService extends UserDetailsService {

    List<Account> findAllAccounts();

    Optional<Account> findOneAccount(String username);

    Account addAccount(AccountDto accountDto, MultipartFile accountPicture) throws IOException;

    Account editAccount(AccountDto accountDto, MultipartFile accountPicture, String username) throws IOException;

    Account signInUser(AccountLoginDto loginDto);

    void deleteAccount(String username);
}
