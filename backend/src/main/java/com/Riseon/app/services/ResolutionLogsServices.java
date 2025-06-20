package com.Riseon.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Riseon.app.entities.Users;
import com.Riseon.app.entities.Resolutions;
import com.Riseon.app.entities.ResolutionLogs;

import com.Riseon.app.repositories.UsersRepository;
import com.Riseon.app.repositories.ResolutionsRepository;
import com.Riseon.app.repositories.ResolutionLogsRepository;

@Service
public class ResolutionLogsServices {
    @Autowired
    private ResolutionsRepository resolutionsRepository;
    @Autowired
    private ResolutionLogsRepository resolutionLogsRepository;
    @Autowired
    private UsersRepository usersRepository;

    /** Method to add a new resolution log of a user resolution */
    public ResolutionLogs addResolutionLog(String user_Id, String resolution_Id, String logDate, String followScore, String notes) {
        // null checks
        Users user = usersRepository.findById(user_Id).orElseThrow(() -> new RuntimeException("User not found"));
        Resolutions resolution = resolutionsRepository.findById(resolution_Id).orElseThrow(() -> new RuntimeException("Resolution not found"));
        if (!resolution.getUser().equals(user)) throw new RuntimeException("Resolution does not belong to the user");

        // Constraints on values in database
        if(java.time.LocalDate.parse(logDate).isAfter(java.time.LocalDate.now())
            || java.time.temporal.ChronoUnit.DAYS.between(java.time.LocalDate.parse(logDate), java.time.LocalDate.now()) > 1) throw new RuntimeException("User cannot add resolution log for this date");
        if(Integer.parseInt(followScore)<1 || Integer.parseInt(followScore)>10) throw new RuntimeException("Follow score must be between 1 and 10");

        // Create a new resolution log
        ResolutionLogs resolutionLog = new ResolutionLogs();
        resolutionLog.setResolution(resolution);
        resolutionLog.setLogDate(java.time.LocalDate.parse(logDate));
        resolutionLog.setFollowScore(Integer.parseInt(followScore));
        if(!notes.isEmpty() && !notes.trim().isEmpty()) resolutionLog.setNotes(notes);
        resolutionLog.setCreatedAt(java.time.LocalDateTime.now());

        // saving into database
        return resolutionLogsRepository.save(resolutionLog);
    }

    /** Method to view all resolution logs of a user resolution */
    public Iterable<ResolutionLogs> viewAllResolutionLogs(String user_Id, String resolution_Id) {
        // null checks
        Users user = usersRepository.findById(user_Id).orElseThrow(() -> new RuntimeException("User not found"));
        Resolutions resolution = resolutionsRepository.findById(resolution_Id).orElseThrow(() -> new RuntimeException("Resolution not found"));
        if (!resolution.getUser().equals(user)) throw new RuntimeException("Resolution does not belong to the user");

        return resolutionLogsRepository.findByResolution(resolution);
    }

    /** Method to view all public resolution logs of a user resolution */
    public Iterable<ResolutionLogs> viewAllPublicResolutionLogs(String user_Id, String resolution_Id) {
        // null checks
        Users user = usersRepository.findById(user_Id).orElseThrow(() -> new RuntimeException("User not found"));
        Resolutions resolution = resolutionsRepository.findById(resolution_Id).orElseThrow(() -> new RuntimeException("Resolution not found"));
        if (!resolution.getIsPublic()) throw new RuntimeException("Resolution is not public");
        if (!resolution.getUser().equals(user)) throw new RuntimeException("Resolution does not belong to the user");

        return resolutionLogsRepository.findByResolution(resolution);
    }

    /** Method to update a resolution log */
    public ResolutionLogs updateResolutionLog(String user_Id, String resolution_Id, String logDate, String followScore, String notes) {
        // null checks
        Users user = usersRepository.findById(user_Id).orElseThrow(() -> new RuntimeException("User not found"));
        Resolutions resolution = resolutionsRepository.findById(resolution_Id).orElseThrow(() -> new RuntimeException("Resolution not found"));
        ResolutionLogs resolutionLog = resolutionLogsRepository.findByResolutionAndLogDate(resolution, java.time.LocalDate.parse(logDate));
        if (resolutionLog == null) throw new RuntimeException("Resolution log not found");
        if (!resolution.getUser().equals(user)) throw new RuntimeException("Resolution does not belong to the user");

        // Constraints on values in database
        if(java.time.LocalDate.parse(logDate).isAfter(java.time.LocalDate.now())
        || java.time.temporal.ChronoUnit.DAYS.between(java.time.LocalDate.parse(logDate), java.time.LocalDate.now()) > 1) throw new RuntimeException("User cannot update resolution log for this date");
        if(Integer.parseInt(followScore)<1 || Integer.parseInt(followScore)>10) throw new RuntimeException("Follow score must be between 1 and 10");
        
        // update values
        if(followScore != null && !followScore.trim().isEmpty()) resolutionLog.setFollowScore(Integer.parseInt(followScore));
        if(notes != null && !notes.trim().isEmpty()) resolutionLog.setNotes(notes);

        return resolutionLogsRepository.save(resolutionLog);
    }

    /** Method to delete a resolution log */
    public void deleteResolutionLog(String user_Id, String resolution_Id, String logDate) {
        // null checks
        Users user = usersRepository.findById(user_Id).orElseThrow(() -> new RuntimeException("User not found"));
        Resolutions resolution = resolutionsRepository.findById(resolution_Id).orElseThrow(() -> new RuntimeException("Resolution not found"));
        ResolutionLogs resolutionLog = resolutionLogsRepository.findByResolutionAndLogDate(resolution, java.time.LocalDate.parse(logDate));
        if (resolutionLog == null) throw new RuntimeException("Resolution log not found");
        if (!resolution.getUser().equals(user)) throw new RuntimeException("Resolution does not belong to the user");
        if(java.time.LocalDate.parse(logDate).isAfter(java.time.LocalDate.now())
            || java.time.temporal.ChronoUnit.DAYS.between(java.time.LocalDate.parse(logDate), java.time.LocalDate.now()) > 1) throw new RuntimeException("User cannot delete resolution log for this date");
        
        // delete resolution log
        resolutionLogsRepository.delete(resolutionLog);
    }
}