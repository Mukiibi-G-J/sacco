// API Client for SACCO Management System

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    // Try to get token from localStorage on initialization
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("auth_token");
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("auth_token", token);
      } else {
        localStorage.removeItem("auth_token");
      }
    }
  }

  getToken(): string | null {
    return this.token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new ApiError(
          response.status,
          data.message || data.detail || "An error occurred",
          data.errors
        );
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, "Network error. Please check your connection.");
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const queryString = params
      ? "?" + new URLSearchParams(params).toString()
      : "";
    return this.request<T>(`${endpoint}${queryString}`, {
      method: "GET",
    });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: "DELETE",
    });
  }
}

export const apiClient = new ApiClient();

// Authentication endpoints
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post<{
      access: string;
      refresh: string;
      user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
      };
    }>("/auth/login/", { email, password });
    apiClient.setToken(response.access);
    return response;
  },

  logout: async () => {
    await apiClient.post("/auth/logout/");
    apiClient.setToken(null);
  },

  refreshToken: async (refreshToken: string) => {
    const response = await apiClient.post<{ access: string }>(
      "/auth/refresh/",
      { refresh: refreshToken }
    );
    apiClient.setToken(response.access);
    return response;
  },

  getCurrentUser: async () => {
    return apiClient.get<{
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
    }>("/auth/me/");
  },
};

// Members endpoints
export const membersApi = {
  list: async (params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    status?: string;
  }) => {
    return apiClient.get("/members/", params as Record<string, string>);
  },

  get: async (id: string) => {
    return apiClient.get(`/members/${id}/`);
  },

  create: async (data: {
    firstName: string;
    lastName: string;
    email?: string;
    phone: string;
    idNumber: string;
    dateOfBirth?: string;
    address?: string;
  }) => {
    return apiClient.post("/members/", data);
  },

  update: async (id: string, data: Partial<typeof membersApi.create extends (...args: any[]) => Promise<infer T> ? T : never>) => {
    return apiClient.put(`/members/${id}/`, data);
  },

  getSavings: async (id: string) => {
    return apiClient.get(`/members/${id}/savings/`);
  },

  getLoans: async (id: string) => {
    return apiClient.get(`/members/${id}/loans/`);
  },
};

// Savings endpoints
export const savingsApi = {
  list: async (params?: {
    page?: number;
    pageSize?: number;
    memberId?: string;
  }) => {
    return apiClient.get("/savings/", params as Record<string, string>);
  },

  getTransactions: async (accountId: string, params?: {
    page?: number;
    pageSize?: number;
  }) => {
    return apiClient.get(
      `/savings/${accountId}/transactions/`,
      params as Record<string, string>
    );
  },

  recordContribution: async (data: {
    memberId: string;
    amount: number;
    description?: string;
    reference?: string;
  }) => {
    return apiClient.post("/savings/transactions/", data);
  },

  getStatement: async (accountId: string, params?: {
    startDate?: string;
    endDate?: string;
  }) => {
    return apiClient.get(
      `/savings/${accountId}/statement/`,
      params as Record<string, string>
    );
  },
};

// Loans endpoints
export const loansApi = {
  list: async (params?: {
    page?: number;
    pageSize?: number;
    status?: string;
    memberId?: string;
  }) => {
    return apiClient.get("/loans/", params as Record<string, string>);
  },

  get: async (id: string) => {
    return apiClient.get(`/loans/${id}/`);
  },

  createApplication: async (data: {
    memberId: string;
    amount: number;
    purpose: string;
    repaymentPeriod: number;
  }) => {
    return apiClient.post("/loans/applications/", data);
  },

  approve: async (id: string, data?: {
    interestRate?: number;
    notes?: string;
  }) => {
    return apiClient.post(`/loans/${id}/approve/`, data);
  },

  reject: async (id: string, reason: string) => {
    return apiClient.post(`/loans/${id}/reject/`, { reason });
  },

  getRepayments: async (id: string) => {
    return apiClient.get(`/loans/${id}/repayments/`);
  },

  recordRepayment: async (loanId: string, data: {
    amount: number;
    paymentMethod: string;
    reference?: string;
  }) => {
    return apiClient.post(`/loans/${loanId}/repayments/`, data);
  },
};

// Transactions endpoints
export const transactionsApi = {
  list: async (params?: {
    page?: number;
    pageSize?: number;
    type?: string;
    memberId?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    return apiClient.get("/transactions/", params as Record<string, string>);
  },

  get: async (id: string) => {
    return apiClient.get(`/transactions/${id}/`);
  },

  create: async (data: {
    memberId?: string;
    type: string;
    amount: number;
    description?: string;
    reference?: string;
  }) => {
    return apiClient.post("/transactions/", data);
  },

  getReceipt: async (id: string) => {
    return apiClient.get(`/transactions/${id}/receipt/`);
  },
};

// Dashboard endpoints
export const dashboardApi = {
  getSummary: async () => {
    return apiClient.get("/dashboard/summary/");
  },

  getAnalytics: async (params?: {
    startDate?: string;
    endDate?: string;
  }) => {
    return apiClient.get("/dashboard/analytics/", params as Record<string, string>);
  },
};

