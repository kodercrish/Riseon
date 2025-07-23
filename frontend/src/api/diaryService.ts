import ENDPOINTS from '../constants/endpoints';

export interface DiaryEntry {
  title: string;
  content: string;
  diaryDate: string;
}

export interface DiaryEntryResponse {
  message: string;
  title: string | null;
  content: string | null;
  diaryDate: string | null;
}

class DiaryService {
  private async makeRequest<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const defaultOptions: RequestInit = {
      credentials: 'include', // Include cookies for JWT
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

  async getDiaryEntry(diaryDate: string): Promise<DiaryEntryResponse> {
    const url = `${ENDPOINTS.DIARY.GET}?diaryDate=${encodeURIComponent(diaryDate)}`;
    return this.makeRequest<DiaryEntryResponse>(url, {
      method: 'GET',
    });
  }

  async addDiaryEntry(entry: DiaryEntry): Promise<DiaryEntryResponse> {
    return this.makeRequest<DiaryEntryResponse>(ENDPOINTS.DIARY.ADD, {
      method: 'POST',
      body: JSON.stringify(entry),
    });
  }

  async updateDiaryEntry(entry: DiaryEntry): Promise<DiaryEntryResponse> {
    return this.makeRequest<DiaryEntryResponse>(ENDPOINTS.DIARY.UPDATE, {
      method: 'PUT',
      body: JSON.stringify(entry),
    });
  }

  async deleteDiaryEntry(diaryDate: string): Promise<string> {
    const url = `${ENDPOINTS.DIARY.DELETE}?diaryDate=${encodeURIComponent(diaryDate)}`;
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

export const diaryService = new DiaryService();
