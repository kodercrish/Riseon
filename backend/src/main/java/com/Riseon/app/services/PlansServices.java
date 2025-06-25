package com.Riseon.app.services;

import org.springframework.stereotype.Service;

import java.util.Optional;

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
    public void createPlan(String username, String title, String description, String date, String deadline) {
        // null check for user
        Users user = usersRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        // checking if the plan already exists for the user on that date
        if( plansRepository.existsByUserAndTitleAndDate(user, title, java.time.LocalDate.parse(date))) throw new RuntimeException("This plan already exists for the user on that date with the same title");

        // creating new plan
        Plans plan = new Plans();
        plan.setUser(user);
        plan.setTitle(title);
        plan.setDescription(description);
        plan.setDate(java.time.LocalDate.parse(date));
        if(deadline.isEmpty()) plan.setIsAllDay(true);
        else {
            plan.setIsAllDay(false);
            plan.setDeadline(java.time.LocalTime.parse(deadline));
        }
        plan.setCreatedAt(java.time.LocalDateTime.now());

        // saving plan to the database
        plansRepository.save(plan);
        return;
    }

    /** Method to view all plans of a user */
    public Iterable<Plans> getAllPlans(String username) {
        // null check for user
        Users user = usersRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));

        // fetching all plans of the user
        return plansRepository.findByUser(user);
    }

    /** Method to update a plan of a user */
    public void updatePlan(String username, String title, String description, String date, String deadline) {
        // null check for user
        Users user = usersRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        // checking if the plan exists for the user on that date
        if(!plansRepository.existsByUserAndTitleAndDate(user, title, java.time.LocalDate.parse(date))) throw new RuntimeException("The plan does not exist");

        // updating plan
        Optional<Plans> plan = plansRepository.findByUserAndTitleAndDate(user, title, java.time.LocalDate.parse(date));
        if(!title.isEmpty() && !title.trim().isEmpty()) plan.get().setTitle(title);
        if(!description.isEmpty() && !description.trim().isEmpty()) plan.get().setDescription(description);
        if(deadline.isEmpty()) plan.get().setIsAllDay(true);
        else {
            plan.get().setIsAllDay(false);
            plan.get().setDeadline(java.time.LocalTime.parse(deadline));
        }
        // saving plan to the database
        plansRepository.save(plan.get());
        return;
    }

    /** Method to delete a plan of a user */
    public void deletePlan(String username, String title, String date) {
        // null check for user
        Users user = usersRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        // checking if the plan exists for the user on that date
        if(!plansRepository.existsByUserAndTitleAndDate(user, title, java.time.LocalDate.parse(date))) throw new RuntimeException("The plan does not exist");

        // deleting plan
        plansRepository.delete(plansRepository.findByUserAndTitleAndDate(user, title, java.time.LocalDate.parse(date)).get());
        return;
    }
}