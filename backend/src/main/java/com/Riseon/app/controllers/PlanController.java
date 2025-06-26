package com.Riseon.app.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import jakarta.servlet.http.HttpServletRequest;

import com.Riseon.app.util.JwtCookieUtil;

import com.Riseon.app.constants.ApiEndPoints;
import com.Riseon.app.entities.Plans;
import com.Riseon.app.services.PlansServices;

import com.Riseon.app.dto.plans.addPlan.AddPlanResponse;
import com.Riseon.app.dto.plans.addPlan.AddPlanRequest;
import com.Riseon.app.dto.plans.getPlans.GetPlansResponse;
import com.Riseon.app.dto.plans.getPlans.PlanData;
import com.Riseon.app.dto.plans.updatePlan.UpdatePlanRequest;
import com.Riseon.app.dto.plans.updatePlan.UpdatePlanResponse;

@RestController
@RequestMapping(ApiEndPoints.PLAN_BASE)
@CrossOrigin(origins = "${app.cors.allowed-origin}")
public class PlanController {
    @Autowired
    private PlansServices planServices;
    @Autowired
    private JwtCookieUtil jwtCookieUtil;

    /** Method to add a new plan */
    @PostMapping(ApiEndPoints.PLAN_ADD)
    @ResponseBody
    public ResponseEntity<AddPlanResponse> addPlan(HttpServletRequest request, @RequestBody AddPlanRequest addPlanRequest) {
        try{
            // get username from jwt token in the cookie
            String username = jwtCookieUtil.extractUsernameFromRequest(request);

            planServices.createPlan(username, addPlanRequest.getTitle(), addPlanRequest.getDescription(), addPlanRequest.getDate(), addPlanRequest.getDeadline());
            AddPlanResponse addPlanResponse = new AddPlanResponse("Plan added successfully");

            return ResponseEntity.status(HttpStatus.OK).body(addPlanResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new AddPlanResponse(e.getMessage()));
        }
         catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new AddPlanResponse("Failed to add plan"));
        }
    }

    /** Method to get all plans of a user */
    @GetMapping(ApiEndPoints.PLAN_FETCH)
    @ResponseBody
    public ResponseEntity<GetPlansResponse> getAllPlans(HttpServletRequest request) {
        try{
            // get username from jwt token in the cookie
            String username = jwtCookieUtil.extractUsernameFromRequest(request);

            Iterable<Plans> plans = planServices.getAllPlans(username);
            List<PlanData> responseList = new ArrayList<>();
            for (Plans plan : plans) {
                responseList.add(new PlanData(
                    plan.getTitle(),
                    plan.getDescription(),
                    plan.getDate().toString(),
                    plan.getIsAllDay(),
                    plan.getDeadline() != null ? plan.getDeadline().toString() : null
                ));
            }

            return ResponseEntity.status(HttpStatus.OK).body(new GetPlansResponse("Plans fetched successfully", responseList));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new GetPlansResponse(e.getMessage(), null));
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new GetPlansResponse("Failed to fetch plans", null));
        }
    }

    /** Method to update a plan */
    @PutMapping(ApiEndPoints.PLAN_UPDATE)
    @ResponseBody
    public ResponseEntity<UpdatePlanResponse> updatePlan(HttpServletRequest request, @RequestBody UpdatePlanRequest updatePlanRequest) {
        try{
            // get username from jwt token in the cookie
            String username = jwtCookieUtil.extractUsernameFromRequest(request);

            planServices.updatePlan(username, updatePlanRequest.getTitle(), updatePlanRequest.getDescription(), updatePlanRequest.getDate(), updatePlanRequest.getDeadline());

            return ResponseEntity.status(HttpStatus.OK).body(new UpdatePlanResponse("Plan updated successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new UpdatePlanResponse(e.getMessage()));
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new UpdatePlanResponse("Failed to update plan"));
        }
    }

    /** Method to delete a plan */
    @DeleteMapping(ApiEndPoints.PLAN_DELETE)
    @ResponseBody
    public ResponseEntity<String> deletePlan(HttpServletRequest request, @RequestParam String date, @RequestParam String title) {
        try{
            // get username from jwt token in the cookie
            String username = jwtCookieUtil.extractUsernameFromRequest(request);

            planServices.deletePlan(username, title, date);

            return ResponseEntity.status(HttpStatus.OK).body("Plan deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete plan");
        }
    }
}