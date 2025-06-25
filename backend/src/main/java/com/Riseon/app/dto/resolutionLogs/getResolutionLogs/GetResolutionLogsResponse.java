package com.Riseon.app.dto.resolutionLogs.getResolutionLogs;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.util.List;

import lombok.AllArgsConstructor;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class GetResolutionLogsResponse {
    private String message;
    List<ResolutionLogsData> resolutionLogsData;
}