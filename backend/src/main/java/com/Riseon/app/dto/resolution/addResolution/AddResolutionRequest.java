package com.Riseon.app.dto.resolution.addResolution;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class AddResolutionRequest {
    private String title;
    private String description;
    private Boolean isPublic;
}
