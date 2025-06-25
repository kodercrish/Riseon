package com.Riseon.app.dto.resolution.getPublicResolutions;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class GetPublicResolutionsResponse {
    private String message;
    private List<PublicResolutionData> publicResolutions;
}
