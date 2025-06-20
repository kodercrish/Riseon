package com.Riseon.app.repositories;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Riseon.app.entities.ResolutionLogs;
import com.Riseon.app.entities.Resolutions;

@Repository
public interface ResolutionLogsRepository extends JpaRepository<ResolutionLogs, String> {
    /** Method to find all resolution logs of a resolution */
    Iterable<ResolutionLogs> findByResolution(Resolutions resolution);

    /** Method to find a resolution log by resolution and date */
    ResolutionLogs findByResolutionAndLogDate(Resolutions resolution, LocalDate localDate);
}