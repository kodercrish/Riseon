import type { Event } from '../features/calendar/types';
import ENDPOINTS from '../constants/endpoints';

export interface PlanData {
  title: string;
  description: string;
  date: string;
  isAllDay: boolean;
  deadline: string | null;
}

export interface GetPlansResponse {
  message: string;
  plans: PlanData[];
}

export interface AddPlanRequest {
  title: string;
  description: string;
  date: string;
  deadline: string;
}

export interface AddPlanResponse {
  message: string;
}

export interface UpdatePlanRequest {
  title: string;
  description: string;
  date: string;
  deadline: string;
}

export interface UpdatePlanResponse {
  message: string;
}

// Color palette for plans
const PLAN_COLORS = [
  'bg-purple-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-red-500',
  'bg-yellow-500',
  'bg-teal-500',
  'bg-orange-500',
  'bg-cyan-500',
];

// Generate color based on plan title for consistency
const generatePlanColor = (title: string): string => {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    const char = title.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  const index = Math.abs(hash) % PLAN_COLORS.length;
  return PLAN_COLORS[index];
};

// Determine plan type based on title/description keywords
const determinePlanType = (title: string, description: string): Event['type'] => {
  const text = (title + ' ' + description).toLowerCase();
  
  if (text.includes('meeting') || text.includes('call') || text.includes('conference')) {
    return 'meeting';
  } else if (text.includes('workout') || text.includes('exercise') || text.includes('goal') || text.includes('target')) {
    return 'goal';
  } else if (text.includes('journal') || text.includes('review') || text.includes('reflect')) {
    return 'journal';
  } else {
    return 'personal';
  }
};

// Convert backend PlanData to frontend Event
const convertPlanToEvent = (plan: PlanData, index: number): Event => {
  const time = plan.isAllDay ? '23:59' : (plan.deadline || '09:00');
  
  return {
    id: `${plan.date}-${plan.title}-${index}`,
    title: plan.title,
    time: time,
    type: determinePlanType(plan.title, plan.description),
    color: generatePlanColor(plan.title),
    description: plan.description,
  };
};

export const planService = {
  async getAllPlans(): Promise<Event[]> {
    try {
      const response = await fetch(ENDPOINTS.PLAN.GET, {
        method: 'GET',
        credentials: 'include', // Include cookies for JWT
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: GetPlansResponse = await response.json();
      
      if (data.plans) {
        return data.plans.map((plan, index) => convertPlanToEvent(plan, index));
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching plans:', error);
      throw error;
    }
  },

  async addPlan(planData: AddPlanRequest): Promise<AddPlanResponse> {
    try {
      const response = await fetch(ENDPOINTS.PLAN.ADD, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(planData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding plan:', error);
      throw error;
    }
  },

  async updatePlan(planData: UpdatePlanRequest): Promise<UpdatePlanResponse> {
    try {
      const response = await fetch(ENDPOINTS.PLAN.UPDATE, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(planData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating plan:', error);
      throw error;
    }
  },

  async deletePlan(date: string, title: string): Promise<string> {
    try {
      const response = await fetch(`${ENDPOINTS.PLAN.DELETE}?date=${encodeURIComponent(date)}&title=${encodeURIComponent(title)}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.text();
    } catch (error) {
      console.error('Error deleting plan:', error);
      throw error;
    }
  },
};
