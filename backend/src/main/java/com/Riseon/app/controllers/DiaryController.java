package com.Riseon.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Riseon.app.constants.ApiEndPoints;
import com.Riseon.app.entities.DiaryEntries;
import com.Riseon.app.services.DiaryServices;

import com.Riseon.app.dto.diary.addDiaryEntry.AddDiaryEntryResponse;
import com.Riseon.app.dto.diary.addDiaryEntry.AddDiaryEntryRequest;
import com.Riseon.app.dto.diary.getDiaryEntry.GetDiaryEntryResponse;
import com.Riseon.app.dto.diary.updateDiaryEntry.UpdateDiaryEntryResponse;
import com.Riseon.app.dto.diary.updateDiaryEntry.UpdateDiaryEntryRequest;

@RestController
@RequestMapping(ApiEndPoints.DIARY_BASE)
@CrossOrigin(origins = "${app.cors.allowed-origin}")
public class DiaryController {
    @Autowired
    private DiaryServices diaryServices;

    /** Adds a new diary entry for a user for a particular day */
    @PostMapping(ApiEndPoints.DIARY_ADD)
    @ResponseBody
    public ResponseEntity<AddDiaryEntryResponse> addDiaryEntry(@RequestBody AddDiaryEntryRequest addDiaryEntryRequest) {
        try{
            DiaryEntries diaryEntry = diaryServices.createDiaryEntry(addDiaryEntryRequest.getUser_Id(), addDiaryEntryRequest.getTitle(), addDiaryEntryRequest.getContent(), addDiaryEntryRequest.getDiaryDate());
            AddDiaryEntryResponse addDiaryEntryResponse = new AddDiaryEntryResponse(
                "Diary entry added successfully",
                diaryEntry.getDiaryEntry_Id(),
                diaryEntry.getUser().getUser_Id(),
                diaryEntry.getTitle(),
                diaryEntry.getContent(),
                diaryEntry.getDiaryDate()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(addDiaryEntryResponse);
        } catch(RuntimeException e) {
            AddDiaryEntryResponse addDiaryEntryResponse = new AddDiaryEntryResponse(e.getMessage(), null, null, null, null, null);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(addDiaryEntryResponse);
        } catch(Exception e) {
            AddDiaryEntryResponse addDiaryEntryResponse = new AddDiaryEntryResponse("Failed to add diary entry", null, null, null, null, null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(addDiaryEntryResponse);
        }
    }

    /** Gets a diary entry for a user for a particular day */
    @GetMapping(ApiEndPoints.DIARY_FETCH)
    @ResponseBody
    public ResponseEntity<GetDiaryEntryResponse> getDiaryEntry(@RequestParam("user_Id") String user_Id, @RequestParam("diaryDate") String diaryDate) {
        try{
            DiaryEntries diaryEntry = diaryServices.getDiaryEntry(user_Id, diaryDate);
            GetDiaryEntryResponse getDiaryEntryResponse = new GetDiaryEntryResponse(
                "Diary entry fetched successfully",
                diaryEntry.getUser().getUser_Id(),
                diaryEntry.getTitle(),
                diaryEntry.getContent(),
                diaryEntry.getDiaryDate());
            return ResponseEntity.status(HttpStatus.OK).body(getDiaryEntryResponse);
        } catch(RuntimeException e) {
            GetDiaryEntryResponse getDiaryEntryResponse = new GetDiaryEntryResponse(e.getMessage(), null, null, null, null);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(getDiaryEntryResponse);
        } catch(Exception e) {
            GetDiaryEntryResponse getDiaryEntryResponse = new GetDiaryEntryResponse("Failed to fetch diary entry", null, null, null, null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(getDiaryEntryResponse);
        }
    }

    /** Updates a diary entry for a user for a particular day */
    @PutMapping(ApiEndPoints.DIARY_UPDATE)
    @ResponseBody
    public ResponseEntity<UpdateDiaryEntryResponse> updateDiaryEntry(@RequestBody UpdateDiaryEntryRequest updateDiaryEntryRequest) {
        try{
            DiaryEntries diaryEntry = diaryServices.updateDiaryEntry(updateDiaryEntryRequest.getUser_Id(), updateDiaryEntryRequest.getDiaryDate(), updateDiaryEntryRequest.getTitle(), updateDiaryEntryRequest.getContent());
            UpdateDiaryEntryResponse updateDiaryEntryResponse = new UpdateDiaryEntryResponse(
                "Diary entry updated successfully",
                diaryEntry.getDiaryEntry_Id(),
                diaryEntry.getTitle(),
                diaryEntry.getContent(),
                diaryEntry.getDiaryDate()
            );
            return ResponseEntity.status(HttpStatus.OK).body(updateDiaryEntryResponse);
        } catch(RuntimeException e) {
            UpdateDiaryEntryResponse updateDiaryEntryResponse = new UpdateDiaryEntryResponse(e.getMessage(), null, null, null, null);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(updateDiaryEntryResponse);
        } catch(Exception e) {
            UpdateDiaryEntryResponse updateDiaryEntryResponse = new UpdateDiaryEntryResponse("Failed to update diary entry", null, null, null, null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(updateDiaryEntryResponse);
        }
    }

    /** Deletes a diary entry for a user for a particular day */
    @DeleteMapping(ApiEndPoints.DIARY_DELETE)
    @ResponseBody
    public ResponseEntity<String> deleteDiaryEntry(@RequestParam("user_Id") String user_Id, @RequestParam("diaryDate") String diaryDate){
        try{
            diaryServices.deleteDiaryEntry(user_Id, diaryDate);
            return ResponseEntity.status(HttpStatus.OK).body("Diary entry deleted successfully");
        } catch(RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Diary entry not found");
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete diary entry");
        }
    }
}
