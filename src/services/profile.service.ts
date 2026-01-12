const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export interface UpdateProfileData {
  name?: string;
  phone?: string;
  blood_type?: string;
  emergency_contact?: string;
  allergies?: string[];
}

export interface ChangePasswordData {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export const profileService = {
  // Get current user profile
  async getCurrentProfile(token: string) {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Profile fetch error:", error);
      throw error;
    }
  },

  // Update user profile
  async updateProfile(token: string, data: UpdateProfileData) {
    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to update profile");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Profile update error:", error);
      throw error;
    }
  },

  // Change password
  async changePassword(token: string, data: ChangePasswordData) {
    try {
      const response = await fetch(`${API_URL}/auth/change-password`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to change password");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Password change error:", error);
      throw error;
    }
  },
};
