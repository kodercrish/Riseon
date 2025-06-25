package com.Riseon.app.dto.resolution.getAllResolutions;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ResolutionData {
    private String title;
    private String description;
    private Boolean isPublic;
    private Boolean isActive;
    private String createdAt;
}