package com.Riseon.app.dto.resolutionLogs.getResolutionLogs;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ResolutionLogsData {
    private String logDate;
    private int followScore;
    private String notes;
    private String createdAt;
}
