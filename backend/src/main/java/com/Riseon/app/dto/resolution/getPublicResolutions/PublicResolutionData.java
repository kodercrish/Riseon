package com.Riseon.app.dto.resolution.getPublicResolutions;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class PublicResolutionData {
    private String title;
    private String description;
    private Boolean isActive;
    private String createdAt;
}