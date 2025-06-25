package com.Riseon.app.dto.resolutionLogs.updateResolutionLog;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class UpdateResolutionLogRequest {
    private String title;
    private String logDate;
    private int followScore;
    private String notes;
}
