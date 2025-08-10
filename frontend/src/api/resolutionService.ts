import ENDPOINTS from '../constants/endpoints';

interface ResolutionResponse {
  message: string;
  resolutions?: any[];
}

interface ResolutionLogResponse {
  message: string;
  resolutionLogsData?: any[];
}

class ResolutionService {
  private async makeRequest<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const defaultOptions: RequestInit = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Resolution methods
  async getAllResolutions(): Promise<ResolutionResponse> {
    return this.makeRequest<ResolutionResponse>(ENDPOINTS.RESOLUTION.GETALL, {
      method: 'GET',
    });
  }

  async getPublicResolutions(username: string): Promise<ResolutionResponse> {
    const url = `${ENDPOINTS.RESOLUTION.GETPUBLIC}?username=${encodeURIComponent(username)}`;
    return this.makeRequest<ResolutionResponse>(url, {
      method: 'GET',
    });
  }

  async addResolution(resolution: {
    title: string;
    description?: string;
    isPublic: boolean;
  }): Promise<{ message: string }> {
    return this.makeRequest<{ message: string }>(ENDPOINTS.RESOLUTION.ADD, {
      method: 'POST',
      body: JSON.stringify(resolution),
    });
  }

  async updateResolution(resolution: {
    title: string;
    description?: string;
    isPublic: boolean;
  }): Promise<{ message: string }> {
    return this.makeRequest<{ message: string }>(ENDPOINTS.RESOLUTION.UPDATE, {
      method: 'PUT',
      body: JSON.stringify(resolution),
    });
  }

  async deleteResolution(title: string): Promise<string> {
    const url = `${ENDPOINTS.RESOLUTION.DELETE}?title=${encodeURIComponent(title)}`;
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.text();
  }

  // Resolution Log methods
  async getResolutionLogs(username: string, title: string): Promise<ResolutionLogResponse> {
    const url = `${ENDPOINTS.RESOLUTIONLOG.GET}?username=${encodeURIComponent(username)}&title=${encodeURIComponent(title)}`;
    console.log('Fetching logs from URL:', url);
    return this.makeRequest<ResolutionLogResponse>(url, {
      method: 'GET',
    });
  }

  async addResolutionLog(log: {
    title: string;
    logDate: string;
    followScore: number;
    notes?: string;
  }): Promise<{ message: string }> {
    console.log('Sending add log request:', log);
    return this.makeRequest<{ message: string }>(ENDPOINTS.RESOLUTIONLOG.ADD, {
      method: 'POST',
      body: JSON.stringify(log),
    });
  }

  async updateResolutionLog(log: {
    title: string;
    logDate: string;
    followScore: number;
    notes?: string;
  }): Promise<{ message: string }> {
    return this.makeRequest<{ message: string }>(ENDPOINTS.RESOLUTIONLOG.UPDATE, {
      method: 'PUT',
      body: JSON.stringify(log),
    });
  }

  async deleteResolutionLog(title: string, logDate: string): Promise<string> {
    const url = `${ENDPOINTS.RESOLUTIONLOG.DELETE}?title=${encodeURIComponent(title)}&logDate=${encodeURIComponent(logDate)}`;
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.text();
  }
}

export default new ResolutionService();
