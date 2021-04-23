package com.example.backend.service.serviceImpl;

import com.example.backend.model.Account;
import com.example.backend.model.dto.AccountDto;
import com.example.backend.model.dto.AccountLoginDto;
import com.example.backend.repository.AccountRepository;
import com.example.backend.service.AccountService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;

    public AccountServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public List<Account> findAllAccounts() {
        return accountRepository.findAll();
    }

    @Override
    public Optional<Account> findOneAccount(String username) {
        return accountRepository.findById(username);
    }

    @Override
    public Account addAccount(AccountDto accountDto, MultipartFile accountPicture) throws IOException {

        Account newAccount = new Account();

        newAccount.setName(accountDto.getName());
        newAccount.setSurname(accountDto.getSurname());
        newAccount.setUsername(accountDto.getUsername());
        newAccount.setPassword(accountDto.getPassword());
        newAccount.setMail(accountDto.getMail());

        if (accountPicture != null) {
            newAccount.setPicture(accountPicture.getBytes());
        }

        return accountRepository.save(newAccount);
    }

    @Override
    public Account editAccount(AccountDto accountDto, MultipartFile accountPicture, String username) throws IOException {

        Optional<Account> optionalAccount = findOneAccount(username);

        if (optionalAccount.isPresent()) {
            Account editedAccount = optionalAccount.get();
            editedAccount.setName(accountDto.getName());
            editedAccount.setSurname(accountDto.getSurname());
            editedAccount.setUsername(accountDto.getUsername());
            editedAccount.setPassword(accountDto.getPassword());
            editedAccount.setMail(accountDto.getMail());

            if (accountPicture != null) {
                editedAccount.setPicture(accountPicture.getBytes());
            }

            return accountRepository.save(editedAccount);
        }

        return null;
    }

    @Override
    public Account signInUser(AccountLoginDto loginDto) {
        Account account = (Account) loadUserByUsername(loginDto.getUsername());
        if (account.getPassword().equals(loginDto.getPassword())) {
            return account;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    @Override
    public void deleteAccount(String username) {
        accountRepository.deleteById(username);
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return findOneAccount(s).orElseThrow(() -> new UsernameNotFoundException("Username is not found!"));
    }
}
