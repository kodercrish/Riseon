package com.Riseon.app.controllers;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.Riseon.app.constants.ApiEndPoints;
import com.Riseon.app.dto.journal.EntryRequest;
import com.Riseon.app.dto.journal.EntryResponse;
import com.Riseon.app.entities.User;
import com.Riseon.app.entities.Journal;
import com.Riseon.app.repositories.UserRepository;
import com.Riseon.app.repositories.JournalRepository;

@RestController
@RequestMapping(ApiEndPoints.JOURNAL_BASE)
@CrossOrigin(origins = "${app.cors.allowed-origin}")
public class JournalController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JournalRepository journalRepository;
    
    /**
     * Handles the addition or editing of a journal entry.
     * If an entry for the given date exists, it edits that entry; otherwise, it adds a new entry.
     */
    @PostMapping(ApiEndPoints.JOURNAL_ADD_EDIT)
    @ResponseBody
    public EntryResponse JournalEntry(@RequestBody EntryRequest EntryRequest) {
        User user = userRepository.findById(EntryRequest.getUserId()).orElse(null);
        if (user == null) {
            return new EntryResponse("User not found");
        }

        Journal journal = journalRepository.findByUserAndJournalDate(user, LocalDate.parse(EntryRequest.getJournalDate()));
        if(journal ==null){
            addEntry(EntryRequest, user);
            return new EntryResponse("Entry added successfully");
        }
        else{
            editEntry(EntryRequest, journal);
            return new EntryResponse("Entry edited successfully");
        }
    }

    public void addEntry(EntryRequest entryRequest, User user) {
        Journal journal = new Journal();

        journal.setUser(user);
        journal.setTitle(entryRequest.getTitle());
        journal.setContent(entryRequest.getContent());
        journal.setJournalDate(LocalDate.parse(entryRequest.getJournalDate()));

        journalRepository.save(journal);
    }

    public void editEntry(EntryRequest entryRequest, Journal journal) {
        journal.setTitle(entryRequest.getTitle());
        journal.setContent(entryRequest.getContent());
        journal.setJournalDate(LocalDate.parse(entryRequest.getJournalDate()));

        journalRepository.save(journal);
    }
}