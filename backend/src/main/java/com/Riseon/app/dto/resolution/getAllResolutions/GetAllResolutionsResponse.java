package com.Riseon.app.dto.resolution.getAllResolutions;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class GetAllResolutionsResponse {
    private String message;
    private List<ResolutionData> resolutions;
}
