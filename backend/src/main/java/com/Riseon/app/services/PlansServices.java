package com.Riseon.app.services;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.Riseon.app.entities.Users;
import com.Riseon.app.entities.Plans;

import com.Riseon.app.repositories.UsersRepository;
import com.Riseon.app.repositories.PlansRepository;

@Service
public class PlansServices {
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private PlansRepository plansRepository;

    /** Method to create a new plan for a user */
    public Plans createPlan(String user_Id, String title, String description, String date, Boolean isAllDay, String deadline) {
        // null check for user
        Users user = usersRepository.findById(user_Id).orElseThrow(() -> new RuntimeException("User not found"));
        // checking if the plan already exists for the user on that date
        if( plansRepository.existsByUserAndTitleAndDate(user, title, java.time.LocalDate.parse(date))) throw new RuntimeException("This plan already exists for the user on that date with the same title");

        // creating new plan
        Plans plan = new Plans();
        plan.setUser(user);
        plan.setTitle(title);
        plan.setDescription(description);
        plan.setDate(java.time.LocalDate.parse(date));
        if(deadline.isEmpty()) plan.setIsAllDay(isAllDay);
        else plan.setDeadline(java.time.LocalTime.parse(deadline));

        // saving plan to the database
        return plansRepository.save(plan);
    }

    /** Method to view all plans of a user */
    public Iterable<Plans> viewAllPlans(String user_Id) {
        // null check for user
        Users user = usersRepository.findById(user_Id).orElseThrow(() -> new RuntimeException("User not found"));

        // fetching all plans of the user
        return plansRepository.findByUser(user);
    }

    /** Method to update a plan of a user */
    public Plans updatePlan(String user_Id, String title, String description, String date, Boolean isAllDay, String deadline) {
        // null check for user
        Users user = usersRepository.findById(user_Id).orElseThrow(() -> new RuntimeException("User not found"));
        // checking if the plan exists for the user on that date
        if(!plansRepository.existsByUserAndTitleAndDate(user, title, java.time.LocalDate.parse(date))) throw new RuntimeException("The plan does not exist");

        // updating plan
        Plans plan = plansRepository.findByUserAndTitleAndDate(user, title, java.time.LocalDate.parse(date));
        if(!title.isEmpty() && !title.trim().isEmpty()) plan.setTitle(title);
        if(!description.isEmpty() && !description.trim().isEmpty()) plan.setDescription(description);
        if(deadline.isEmpty()) plan.setIsAllDay(isAllDay);
        else plan.setDeadline(java.time.LocalTime.parse(deadline));

        // saving plan to the database
        return plansRepository.save(plan);
    }

    /** Method to delete a plan of a user */
    public void deletePlan(String user_Id, String title, String date) {
        // null check for user
        Users user = usersRepository.findById(user_Id).orElseThrow(() -> new RuntimeException("User not found"));
        // checking if the plan exists for the user on that date
        if(!plansRepository.existsByUserAndTitleAndDate(user, title, java.time.LocalDate.parse(date))) throw new RuntimeException("The plan does not exist");

        // deleting plan
        plansRepository.delete(plansRepository.findByUserAndTitleAndDate(user, title, java.time.LocalDate.parse(date)));
        return;
    }
}