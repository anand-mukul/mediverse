"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  User,
  Phone,
  Heart,
  AlertCircle,
  Save,
  Loader2,
  Lock,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authService } from "@/services/auth.service";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BLOOD_TYPES = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"] as const;

const profileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone must be a valid 10-digit number"),
  bloodType: z.enum(BLOOD_TYPES).optional(),
  emergencyContact: z
    .string()
    .regex(/^[0-9]{10}$/, "Emergency contact must be a valid 10-digit number")
    .optional()
    .or(z.literal("")),
  allergies: z.string().optional(),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[0-9]/, "Password must contain a number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

interface UserData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  blood_type?: string;
  emergency_contact?: string;
  allergies?: string[];
  created_at?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      bloodType: undefined,
      emergencyContact: "",
      allergies: "",
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Load user data on mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setIsLoading(true);
        const storedUser = authService.getStoredUser();

        if (!storedUser) {
          toast.error("Please login first");
          router.push("/login");
          return;
        }

        const token = authService.getToken();
        if (token) {
          try {
            const response = await fetch(
              `${
                process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
              }/api/auth/me`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (response.ok) {
              const freshUser = await response.json();

              const bloodType = freshUser.blood_type as string | undefined;
              const isValidBloodType = BLOOD_TYPES.includes(
                bloodType as (typeof BLOOD_TYPES)[number]
              );

              profileForm.reset({
                name: freshUser.name || "",
                email: freshUser.email || "",
                phone: freshUser.phone || "",
                bloodType: isValidBloodType
                  ? (bloodType as (typeof BLOOD_TYPES)[number])
                  : undefined,
                emergencyContact: freshUser.emergency_contact || "",
                allergies: Array.isArray(freshUser.allergies)
                  ? freshUser.allergies.join(", ")
                  : "",
              });
            } else {
              // Fallback to stored user
              profileForm.reset({
                name: storedUser.name || "",
                email: storedUser.email || "",
                phone: storedUser.phone || "",
                bloodType: undefined,
                emergencyContact: "",
                allergies: "",
              });
            }
          } catch (error) {
            console.error("Failed to fetch user from backend:", error);
            // Fallback to stored user
            profileForm.reset({
              name: storedUser.name || "",
              email: storedUser.email || "",
              phone: storedUser.phone || "",
              bloodType: undefined,
              emergencyContact: "",
              allergies: "",
            });
          }
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [profileForm, router]);

  const onProfileSubmit = async (values: ProfileFormValues) => {
    try {
      setIsSaving(true);
      const token = authService.getToken();

      if (!token) {
        toast.error("Authentication required");
        router.push("/login");
        return;
      }

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
        }/api/auth/profile`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            phone: values.phone,
            blood_type: values.bloodType || null,
            emergency_contact: values.emergencyContact || null,
            allergies: values.allergies
              ? values.allergies.split(",").map((a) => a.trim())
              : [],
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to update profile");
      }

      const result = await response.json();

      if (result.user) {
        localStorage.setItem("user", JSON.stringify(result.user));
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const onPasswordSubmit = async (values: PasswordFormValues) => {
    try {
      setIsChangingPassword(true);
      const token = authService.getToken();

      if (!token) {
        toast.error("Authentication required");
        router.push("/login");
        return;
      }

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
        }/api/auth/change-password`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            current_password: values.currentPassword,
            new_password: values.newPassword,
            confirm_password: values.confirmPassword,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to change password");
      }

      toast.success("Password changed successfully!");
      passwordForm.reset();
    } catch (error) {
      console.error("Password change error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to change password"
      );
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2 cursor-pointer">
            <User className="w-8 h-8 text-primary" />
            Profile Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your personal information and security settings
          </p>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-2 cursor-pointer">
            <TabsTrigger value="personal" className="cursor-pointer">
              Personal Information
            </TabsTrigger>
            <TabsTrigger value="security" className="cursor-pointer">
              Security
            </TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form
                    onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your full name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              disabled
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Email cannot be changed
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="10-digit phone number"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter a valid 10-digit Indian mobile number
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="bloodType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Heart className="w-4 h-4" />
                            Blood Type
                          </FormLabel>
                          <Select
                            value={field.value || ""}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger className="cursor-pointer">
                                <SelectValue placeholder="Select blood type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="cursor-pointer">
                              {BLOOD_TYPES.map((type) => (
                                <SelectItem
                                  key={type}
                                  value={type}
                                  className="cursor-pointer"
                                >
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="emergencyContact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            Emergency Contact
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="10-digit emergency contact number"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Emergency contact person&apos;s phone number
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="allergies"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Allergies</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Penicillin, Peanuts, Lactose (comma-separated)"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            List any known allergies separated by commas
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isSaving}
                      className="w-full md:w-auto cursor-pointer"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...passwordForm}>
                  <form
                    onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter current password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter new password (8+ characters, uppercase, number)"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Password must be at least 8 characters with an
                            uppercase letter and number
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Confirm new password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isChangingPassword}
                      className="w-full md:w-auto cursor-pointer"
                    >
                      {isChangingPassword ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Changing...
                        </>
                      ) : (
                        <>
                          <Lock className="mr-2 h-4 w-4" />
                          Change Password
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
