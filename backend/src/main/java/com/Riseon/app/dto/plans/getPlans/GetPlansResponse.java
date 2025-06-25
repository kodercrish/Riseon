package com.Riseon.app.dto.plans.getPlans;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class GetPlansResponse {
    private String message;
    private List<PlanData> plans;
}