package com.example.backend.service.serviceImpl;

import com.example.backend.model.Account;
import com.example.backend.model.dto.AccountDto;
import com.example.backend.repository.AccountRepository;
import com.example.backend.service.AccountService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

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
    public Account addAccount(AccountDto accountDto) {

        Account newAccount = new Account();

        newAccount.setName(accountDto.getName());
        newAccount.setSurname(accountDto.getSurname());
        newAccount.setUsername(accountDto.getUsername());
        newAccount.setPassword(accountDto.getPassword());
        newAccount.setMail(accountDto.getMail());

        return accountRepository.save(newAccount);
    }

    @Override
    public Account editAccount(AccountDto accountDto, String username) {

        Optional<Account> optionalAccount = findOneAccount(username);

        if (optionalAccount.isPresent()){
            Account editedAccount = optionalAccount.get();
            editedAccount.setName(accountDto.getName());
            editedAccount.setSurname(accountDto.getSurname());
            editedAccount.setUsername(accountDto.getUsername());
            editedAccount.setPassword(accountDto.getPassword());
            editedAccount.setMail(accountDto.getMail());

            return accountRepository.save(editedAccount);
        }

        return null;
    }

    @Override
    public void deleteAccount(String username) {
        accountRepository.deleteById(username);
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Account account = findOneAccount(s).orElseThrow(() -> new UsernameNotFoundException("Username is not found!"));
        return account;
    }
}
