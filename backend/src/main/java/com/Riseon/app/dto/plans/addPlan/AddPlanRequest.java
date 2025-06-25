package com.Riseon.app.dto.plans.addPlan;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class AddPlanRequest {
    private String title;
    private String description;
    private String date;
    private String deadline;
}