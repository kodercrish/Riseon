package com.Riseon.app.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import jakarta.servlet.http.HttpServletRequest;

import com.Riseon.app.constants.ApiEndPoints;
import com.Riseon.app.dto.resolution.addResolution.AddResolutionRequest;
import com.Riseon.app.dto.resolution.addResolution.AddResolutionResponse;
import com.Riseon.app.dto.resolution.getAllResolutions.GetAllResolutionsResponse;
import com.Riseon.app.dto.resolution.getAllResolutions.ResolutionData;
import com.Riseon.app.dto.resolution.getPublicResolutions.GetPublicResolutionsResponse;
import com.Riseon.app.dto.resolution.getPublicResolutions.PublicResolutionData;
import com.Riseon.app.dto.resolution.updateResolution.UpdateResolutionRequest;
import com.Riseon.app.dto.resolution.updateResolution.UpdateResolutionResponse;
import com.Riseon.app.util.JwtUtil;

import com.Riseon.app.entities.Resolutions;
import com.Riseon.app.services.ResolutionServices;

@RestController
@RequestMapping(ApiEndPoints.RESOLUTION_BASE)
@CrossOrigin(origins = "${app.cors.allowed-origin}")
public class ResolutionController {
    @Autowired
    private ResolutionServices resolutionServices;
    @Autowired
    private JwtUtil jwtUtil;

    /** Method to add a new resolution for a user */
    @PostMapping(ApiEndPoints.RESOLUTION_ADD)
    @ResponseBody
    public ResponseEntity<AddResolutionResponse> addResolution(HttpServletRequest request, @RequestBody AddResolutionRequest addResolutionRequest) {
        try{
            // Extracting the token from the request header
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                throw new RuntimeException("Missing or invalid Authorization header");
            }
            String token = authHeader.substring(7); // Remove "Bearer "
            String username = jwtUtil.extractUsername(token);

            resolutionServices.addResolution(username, addResolutionRequest.getTitle(), addResolutionRequest.getDescription(), addResolutionRequest.getIsPublic());

            return ResponseEntity.status(HttpStatus.CREATED).body(new AddResolutionResponse("Resolution added successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new AddResolutionResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new AddResolutionResponse("An error occurred while adding the resolution"));
        }
    }

    /** Method to get all resolutions for a user */
    @GetMapping(ApiEndPoints.RESOLUTION_FETCH_ALL)
    @ResponseBody
    public ResponseEntity<GetAllResolutionsResponse> getAllResolutions(HttpServletRequest request) {
        try{
            // Extracting the token from the request header
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                throw new RuntimeException("Missing or invalid Authorization header");
            }
            String token = authHeader.substring(7); // Remove "Bearer "
            String username = jwtUtil.extractUsername(token);

            Iterable<Resolutions> resolutions = resolutionServices.getAllResolutions(username);
            List<ResolutionData> resolutionDataList = new ArrayList<>();
            for (Resolutions resolution : resolutions) {
                resolutionDataList.add(new ResolutionData(
                    resolution.getTitle(),
                    resolution.getDescription(),
                    resolution.getIsPublic(),
                    resolution.getIsActive(),
                    resolution.getCreatedAt().toString()
                ));
            }

            return ResponseEntity.status(HttpStatus.OK).body(new GetAllResolutionsResponse("Resolutions fetched successfully", resolutionDataList));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new GetAllResolutionsResponse(e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new GetAllResolutionsResponse("An error occurred while fetching resolutions", null));
        }
    }

    /** Method to get all public resolutions of a user */
    @GetMapping(ApiEndPoints.RESOLUTION_FETCH_PUBLIC)
    @ResponseBody
    public ResponseEntity<GetPublicResolutionsResponse> getPublicResolutions(HttpServletRequest request, @RequestParam String username) {
        try{
            Iterable<Resolutions> resolutions = resolutionServices.getPublicResolutions(username);
            List<PublicResolutionData> publicResolutionDataList = new ArrayList<>();
            for (Resolutions resolution : resolutions) {
                publicResolutionDataList.add(new PublicResolutionData(
                    resolution.getTitle(),
                    resolution.getDescription(),
                    resolution.getIsActive(),
                    resolution.getCreatedAt().toString()
                ));
            }

            return ResponseEntity.status(HttpStatus.OK).body(new GetPublicResolutionsResponse("Public resolutions fetched successfully", publicResolutionDataList));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new GetPublicResolutionsResponse(e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new GetPublicResolutionsResponse("An error occurred while fetching public resolutions", null));
        }
    }

    /** Method to update a resolution */
    @PutMapping(ApiEndPoints.RESOLUTION_UPDATE)
    @ResponseBody
    public ResponseEntity<UpdateResolutionResponse> updateResolution(HttpServletRequest request, @RequestBody UpdateResolutionRequest updateResolutionRequest) {
        try{
            // Extracting the token from the request header
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                throw new RuntimeException("Missing or invalid Authorization header");
            }
            String token = authHeader.substring(7); // Remove "Bearer "
            String username = jwtUtil.extractUsername(token);

            resolutionServices.updateResolution(username, updateResolutionRequest.getTitle(), updateResolutionRequest.getDescription(), updateResolutionRequest.getIsPublic());

            return ResponseEntity.status(HttpStatus.OK).body(new UpdateResolutionResponse("Resolution updated successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new UpdateResolutionResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new UpdateResolutionResponse("An error occurred while updating the resolution"));
        }
    }

    /** Method to delete a resolution */
    @DeleteMapping(ApiEndPoints.RESOLUTION_DELETE)
    @ResponseBody
    public ResponseEntity<String> deleteResolution(HttpServletRequest request, @RequestParam String title) {
        try{
            // Extracting the token from the request header
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                throw new RuntimeException("Missing or invalid Authorization header");
            }
            String token = authHeader.substring(7); // Remove "Bearer "
            String username = jwtUtil.extractUsername(token);

            resolutionServices.deleteResolution(username, title);

            return ResponseEntity.status(HttpStatus.OK).body("Resolution deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the resolution");
        }
    }
}