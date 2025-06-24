package com.Riseon.app.services;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
    public DiaryEntries createDiaryEntry(String user_Id, String title, String content, String diaryDate) {
        // null check for user
        Users user = usersRepository.findById(user_Id).orElseThrow(() -> new RuntimeException("User not found"));
        // null check for diary on that date
        DiaryEntries existingEntry = diaryEntriesRepository.findByUserAndDiaryDate(user, LocalDate.parse(diaryDate));
        if (existingEntry != null && !existingEntry.isDeleted()) {
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
    public DiaryEntries getDiaryEntry(String user_Id, String diaryDate) {
        // null checks
        Users user = usersRepository.findById(user_Id).orElseThrow(() -> new RuntimeException("User not found"));
        if (!diaryEntriesRepository.existsByUserAndDiaryDate(user, LocalDate.parse(diaryDate))) throw new RuntimeException("Diary entry not found");
        if(diaryEntriesRepository.findByUserAndDiaryDate(user, LocalDate.parse(diaryDate)).isDeleted()) throw new RuntimeException("Diary entry is deleted");

        return diaryEntriesRepository.findByUserAndDiaryDate(user, LocalDate.parse(diaryDate));
    }

    /** Update a diary entry for a user for a particular day */
    public DiaryEntries updateDiaryEntry(String user_Id, String diaryDate, String title, String content) {
        // null checks
        Users user = usersRepository.findById(user_Id).orElseThrow(() -> new RuntimeException("User not found"));
        if (!diaryEntriesRepository.existsByUserAndDiaryDate(user, LocalDate.parse(diaryDate))) throw new RuntimeException("Diary entry not found");
        if(diaryEntriesRepository.findByUserAndDiaryDate(user, LocalDate.parse(diaryDate)).isDeleted()) throw new RuntimeException("Diary entry is deleted");

        // updating diary entry
        DiaryEntries diaryEntry = diaryEntriesRepository.findByUserAndDiaryDate(user, LocalDate.parse(diaryDate));
        if(!title.isEmpty() && !title.trim().isEmpty()) diaryEntry.setTitle(title);
        if(!content.isEmpty() && !content.trim().isEmpty()) diaryEntry.setContent(content);

        // saving diary entry to the database
        return diaryEntriesRepository.save(diaryEntry);
    }

    /** Delete a diary entry for a user for a particular day */
    public void deleteDiaryEntry(String user_Id, String diaryDate) {
        // null checks
        Users user = usersRepository.findById(user_Id).orElseThrow(() -> new RuntimeException("User not found"));
        DiaryEntries diaryEntry = diaryEntriesRepository.findByUserAndDiaryDate(user, LocalDate.parse(diaryDate));
        if (diaryEntry == null || diaryEntry.isDeleted()) {
            throw new RuntimeException("Diary entry not found");
        }

        // deleting diary entry - soft delete
        diaryEntry.setDeleted(true);
        diaryEntriesRepository.save(diaryEntry);
    }
}
