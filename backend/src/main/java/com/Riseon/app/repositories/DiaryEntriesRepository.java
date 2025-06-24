package com.Riseon.app.repositories;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

import com.Riseon.app.entities.DiaryEntries;
import com.Riseon.app.entities.Users;

@Repository
public interface DiaryEntriesRepository extends JpaRepository<DiaryEntries, String> {
    /** Check if a diary entry exists for a user on a particular day */
    boolean existsByUserAndDiaryDate(Users user, LocalDate diaryDate);

    /** Get a diary entry for a user on a particular day */
    Optional<DiaryEntries> findByUserAndDiaryDate(Users user, LocalDate diaryDate);
}