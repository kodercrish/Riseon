package com.Riseon.app.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import jakarta.servlet.http.HttpServletRequest;

import com.Riseon.app.constants.ApiEndPoints;

import com.Riseon.app.util.JwtUtil;
import com.Riseon.app.services.ResolutionLogsServices;
import com.Riseon.app.entities.ResolutionLogs;
import com.Riseon.app.dto.resolutionLogs.addResolutionLog.AddResolutionLogRequest;
import com.Riseon.app.dto.resolutionLogs.addResolutionLog.AddResolutionLogResponse;
import com.Riseon.app.dto.resolutionLogs.getResolutionLogs.GetResolutionLogsResponse;
import com.Riseon.app.dto.resolutionLogs.getResolutionLogs.ResolutionLogsData;
import com.Riseon.app.dto.resolutionLogs.updateResolutionLog.UpdateResolutionLogRequest;
import com.Riseon.app.dto.resolutionLogs.updateResolutionLog.UpdateResolutionLogResponse;

@RestController
@RequestMapping(ApiEndPoints.RESOLUTIONLOG_BASE)
@CrossOrigin(origins = "${app.cors.allowed-origin}")
public class ResolutionLogController {
    @Autowired
    private ResolutionLogsServices resolutionLogServices;
    @Autowired
    private JwtUtil jwtUtil;

    /** Method to add a new resolution log of a user resolution */
    @PostMapping(ApiEndPoints.RESOLUTIONLOG_ADD)
    @ResponseBody
    public ResponseEntity<AddResolutionLogResponse> addResolutionLog(HttpServletRequest request, @RequestBody AddResolutionLogRequest addResolutionLogRequest) {
        try{
            // Extracting the token from the request header
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                throw new RuntimeException("Missing or invalid Authorization header");
            }
            String token = authHeader.substring(7); // Remove "Bearer "
            String username = jwtUtil.extractUsername(token);

            resolutionLogServices.addResolutionLog(username, addResolutionLogRequest.getTitle(), addResolutionLogRequest.getLogDate(), addResolutionLogRequest.getFollowScore(), addResolutionLogRequest.getNotes());

            return ResponseEntity.status(HttpStatus.CREATED).body(new AddResolutionLogResponse("Resolution log added successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new AddResolutionLogResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new AddResolutionLogResponse("An error occurred while adding the resolution log"));
        }
    }

    @GetMapping(ApiEndPoints.RESOLUTIONLOG_FETCH)
    @ResponseBody
    public ResponseEntity<GetResolutionLogsResponse> getAllResolutionLogs(HttpServletRequest request, @RequestParam String username, @RequestParam String title) {
        try{
            // Extracting the token from the request header
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                throw new RuntimeException("Missing or invalid Authorization header");
            }
            String token = authHeader.substring(7); // Remove "Bearer "
            String tokenUsername = jwtUtil.extractUsername(token);

            Iterable<ResolutionLogs> resolutionLogs = resolutionLogServices.getResolutionLogs(tokenUsername, username, title);
            List<ResolutionLogsData> resolutionLogDataList = new ArrayList<>();
            for (ResolutionLogs resolutionLog : resolutionLogs) {
                resolutionLogDataList.add(new ResolutionLogsData(
                    resolutionLog.getLogDate().toString(),
                    resolutionLog.getFollowScore(),
                    resolutionLog.getNotes(),
                    resolutionLog.getCreatedAt().toString()
                ));
            }

            return ResponseEntity.status(HttpStatus.OK).body(new GetResolutionLogsResponse("Resolution Logs fetched successfully", resolutionLogDataList));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new GetResolutionLogsResponse(e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new GetResolutionLogsResponse("An error occurred while getting the resolution logs", null));
        }
    }

    @PutMapping(ApiEndPoints.RESOLUTIONLOG_UPDATE)
    @ResponseBody
    public ResponseEntity<UpdateResolutionLogResponse> updateResolutionLog(HttpServletRequest request, @RequestBody UpdateResolutionLogRequest updateResolutionLogRequest) {
        try{
            // Extracting the token from the request header
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                throw new RuntimeException("Missing or invalid Authorization header");
            }
            String token = authHeader.substring(7); // Remove "Bearer "
            String username = jwtUtil.extractUsername(token);

            resolutionLogServices.updateResolutionLog(username, updateResolutionLogRequest.getTitle(), updateResolutionLogRequest.getLogDate(), updateResolutionLogRequest.getFollowScore(), updateResolutionLogRequest.getNotes());

            return ResponseEntity.status(HttpStatus.OK).body(new UpdateResolutionLogResponse("Resolution log updated successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new UpdateResolutionLogResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new UpdateResolutionLogResponse("An error occurred while updating the resolution log"));
        }
    }

    @DeleteMapping(ApiEndPoints.RESOLUTIONLOG_DELETE)
    @ResponseBody
    public ResponseEntity<String> deleteResolutionLog(HttpServletRequest request, @RequestParam String title, @RequestParam String logDate) {
        try{
            // Extracting the token from the request header
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                throw new RuntimeException("Missing or invalid Authorization header");
            }
            String token = authHeader.substring(7); // Remove "Bearer "
            String username = jwtUtil.extractUsername(token);

            resolutionLogServices.deleteResolutionLog(username, title, logDate);

            return ResponseEntity.status(HttpStatus.OK).body("Resolution log deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the resolution log");
        }
    }
}