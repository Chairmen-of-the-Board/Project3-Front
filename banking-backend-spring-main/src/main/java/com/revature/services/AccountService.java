package com.revature.services;

import com.revature.models.Account;
import com.revature.models.Transaction;
import com.revature.models.TransactionType;
import com.revature.models.User;
import com.revature.repositories.AccountRepository;
import com.revature.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserService userService;

    public Optional<Account> findByUserId(int id) {
        User user = userService.findById(id);
        return accountRepository.findByUser(user);
    }

    public Account upsertAccount(Account accountToUpsert, String userId) {

        int id = Integer.parseInt(userId);
        User user = userService.findById(id);

        if(accountRepository.existsById(accountToUpsert.getId())) {
            Account account = accountRepository.getById(accountToUpsert.getId());
            account.setBalance(accountToUpsert.getBalance());
            account.setDescription(accountToUpsert.getDescription());
            account.setName(accountToUpsert.getName());
            return accountRepository.saveAndFlush(account);
        } else {
            accountToUpsert.setUser(user);
            accountToUpsert.setCreationDate(Date.from(Instant.now()));
            return accountRepository.save(accountToUpsert);
        }
    }

    public List<Transaction> getAllTransactions(int accountId) {
        Account account = accountRepository.getById(accountId);
        return transactionRepository.findByAccount(account);
    }

    public Transaction upsertTransaction(int accountId, Transaction transactionToUpsert) {

            Account account = accountRepository.getById(accountId);

            if(transactionToUpsert.getType() == TransactionType.Expense) {
                account.setBalance(account.getBalance() - transactionToUpsert.getAmount());
            } else if (transactionToUpsert.getType() == TransactionType.Income) {
                account.setBalance(account.getBalance() + transactionToUpsert.getAmount());
            }
            accountRepository.saveAndFlush(account);
            transactionToUpsert.setAccount(account);
            return transactionRepository.save(transactionToUpsert);
    }
}
