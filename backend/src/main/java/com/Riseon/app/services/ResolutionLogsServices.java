package com.Riseon.app.services;

import java.util.Optional;

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
    public void addResolutionLog(String username, String title, String logDate, int followScore, String notes) {
        // null checks
        Users user = usersRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        Resolutions resolution = resolutionsRepository.findByUserAndTitle(user, title).orElseThrow(() -> new RuntimeException("Resolution not found"));
        if (!resolution.getUser().equals(user)) throw new RuntimeException("Resolution does not belong to the user");
        if(resolutionLogsRepository.existsByResolutionAndLogDate(resolution, java.time.LocalDate.parse(logDate))) throw new RuntimeException("Resolution log already exists for this date");

        // Constraints on values in database
        if(java.time.LocalDate.parse(logDate).isAfter(java.time.LocalDate.now())
            || java.time.temporal.ChronoUnit.DAYS.between(java.time.LocalDate.parse(logDate), java.time.LocalDate.now()) > 1) throw new RuntimeException("User cannot add resolution log for this date");
        if(followScore<1 || followScore>10) throw new RuntimeException("Follow score must be between 1 and 10");

        // Create a new resolution log
        ResolutionLogs resolutionLog = new ResolutionLogs();
        resolutionLog.setResolution(resolution);
        resolutionLog.setLogDate(java.time.LocalDate.parse(logDate));
        resolutionLog.setFollowScore(followScore);
        if(!notes.isEmpty() && !notes.trim().isEmpty()) resolutionLog.setNotes(notes);
        resolutionLog.setCreatedAt(java.time.LocalDateTime.now());

        // saving into database
        resolutionLogsRepository.save(resolutionLog);
        return;
    }

    /** Method to get a resolution logs of a user resolution (also check if the user is eligible to view the resolution) */
    public Iterable<ResolutionLogs> getResolutionLogs(String username, String passedUsername, String title) {
        // check if user exists and fetch it
        // check if resolution exists and fetch it
        // check if resolution is public or not
            // if public, return all resolution logs
            // if not public, then check if the user is the owner of the resolution
                // if yes, return all resolution logs
                // throw runtime exception if not

        // null checks
        Users user = usersRepository.findByUsername(passedUsername).orElseThrow(() -> new RuntimeException("User not found"));
        Resolutions resolution = resolutionsRepository.findByUserAndTitle(user, title).orElseThrow(() -> new RuntimeException("Resolution not found"));
        if(!resolution.getIsPublic() && !username.equals(passedUsername)) throw new RuntimeException("User cannot view this resolution");
        else{
            return resolutionLogsRepository.findByResolution(resolution);
        }
    }

    /** Method to update a resolution log */
    public void updateResolutionLog(String username, String title, String logDate, int followScore, String notes) {
        // null checks
        Users user = usersRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        Resolutions resolution = resolutionsRepository.findByUserAndTitle(user, title).orElseThrow(() -> new RuntimeException("Resolution not found"));
        Optional<ResolutionLogs> resolutionLog = resolutionLogsRepository.findByResolutionAndLogDate(resolution, java.time.LocalDate.parse(logDate));
        if (!resolutionLog.isPresent()) throw new RuntimeException("Resolution log not found");
        if (!resolution.getUser().equals(user)) throw new RuntimeException("Resolution does not belong to the user");

        // Constraints on values in database
        if(java.time.LocalDate.parse(logDate).isAfter(java.time.LocalDate.now())
        || java.time.temporal.ChronoUnit.DAYS.between(java.time.LocalDate.parse(logDate), java.time.LocalDate.now()) > 1) throw new RuntimeException("User cannot update resolution log for this date");
        if(followScore<1 || followScore>10) throw new RuntimeException("Follow score must be between 1 and 10");
        
        // update values
        resolutionLog.get().setFollowScore(followScore);
        if(notes != null && !notes.trim().isEmpty()) resolutionLog.get().setNotes(notes);

        resolutionLogsRepository.save(resolutionLog.get());
        return;
    }

    /** Method to delete a resolution log */
    public void deleteResolutionLog(String username, String title, String logDate) {
        // null checks
        Users user = usersRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        Resolutions resolution = resolutionsRepository.findByUserAndTitle(user, title).orElseThrow(() -> new RuntimeException("Resolution not found"));
        Optional<ResolutionLogs> resolutionLog = resolutionLogsRepository.findByResolutionAndLogDate(resolution, java.time.LocalDate.parse(logDate));
        if (!resolutionLog.isPresent()) throw new RuntimeException("Resolution log not found");
        if (!resolution.getUser().equals(user)) throw new RuntimeException("Resolution does not belong to the user");
        if(java.time.LocalDate.parse(logDate).isAfter(java.time.LocalDate.now())
            || java.time.temporal.ChronoUnit.DAYS.between(java.time.LocalDate.parse(logDate), java.time.LocalDate.now()) > 1) throw new RuntimeException("User cannot delete resolution log for this date");
        
        // delete resolution log
        resolutionLogsRepository.delete(resolutionLog.get());
    }
}