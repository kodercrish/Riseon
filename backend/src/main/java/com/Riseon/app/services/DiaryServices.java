package com.Riseon.app.services;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import com.Riseon.app.entities.Users;
import com.Riseon.app.entities.DiaryEntries;
import com.Riseon.app.repositories.UsersRepository;
import com.Riseon.app.repositories.DiaryEntriesRepository;

@Service
public class DiaryServices {
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private DiaryEntriesRepository diaryEntriesRepository;

    /** Create a new diary entry for a user for a particular day */
    public DiaryEntries createDiaryEntry(String username, String title, String content, String diaryDate) {
        // null check for user
        Users user = usersRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        // null check for diary on that date
        Optional<DiaryEntries> existingEntry = diaryEntriesRepository.findByUserAndDiaryDate(user, LocalDate.parse(diaryDate));
        if (existingEntry.isPresent()) {
            throw new RuntimeException("Diary entry already exists for the user on that date");
        }

        // creating new diary entry
        DiaryEntries diaryEntry = new DiaryEntries();
        diaryEntry.setUser(user);
        diaryEntry.setTitle(title);
        diaryEntry.setContent(content);
        diaryEntry.setDiaryDate(LocalDate.parse(diaryDate));
        diaryEntry.setCreatedAt(LocalDateTime.now());

        // saving diary entry to the database
        return diaryEntriesRepository.save(diaryEntry);
    }

    /** Get a diary entry for a user for a particular day */
    public DiaryEntries getDiaryEntry(String username, String diaryDate) {
        // null checks
        Users user = usersRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        if (!diaryEntriesRepository.existsByUserAndDiaryDate(user, LocalDate.parse(diaryDate))) throw new RuntimeException("Diary entry not found");

        return diaryEntriesRepository.findByUserAndDiaryDate(user, LocalDate.parse(diaryDate)).get();
    }

    /** Update a diary entry for a user for a particular day */
    public DiaryEntries updateDiaryEntry(String username, String diaryDate, String title, String content) {
        // null checks
        Users user = usersRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        if (!diaryEntriesRepository.existsByUserAndDiaryDate(user, LocalDate.parse(diaryDate))) throw new RuntimeException("Diary entry not found");

        // updating diary entry
        Optional<DiaryEntries> diaryEntry = diaryEntriesRepository.findByUserAndDiaryDate(user, LocalDate.parse(diaryDate));
        if(!title.isEmpty() && !title.trim().isEmpty()) diaryEntry.get().setTitle(title);
        if(!content.isEmpty() && !content.trim().isEmpty()) diaryEntry.get().setContent(content);

        // saving diary entry to the database
        return diaryEntriesRepository.save(diaryEntry.get());
    }

    /** Delete a diary entry for a user for a particular day */
    public void deleteDiaryEntry(String username, String diaryDate) {
        // null checks
        Users user = usersRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        Optional<DiaryEntries> diaryEntry = diaryEntriesRepository.findByUserAndDiaryDate(user, LocalDate.parse(diaryDate));
        if (!diaryEntry.isPresent()) throw new RuntimeException("Diary entry not found");

        // deleting diary entry - hard delete
        diaryEntriesRepository.delete(diaryEntry.get());
    }
}