package com.Riseon.app.dto.plans.getPlans;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class PlanData {
    private String title;
    private String description;
    private String date;
    private Boolean isAllDay;
    private String deadline;
}
