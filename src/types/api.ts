// User & Authentication
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other";
  blood_type?: string;
  bloodType?: string;
  allergies?: string[];
  emergency_contact?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  updatedAt?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  access_token?: string;
  token_type?: string;
  user: User;
}

// Dashboard
export interface HealthMetrics {
  heart_rate: number;
  blood_pressure: string;
  temperature: number;
  steps_today: number;
  oxygen_level?: number;
  sleep_hours?: number;
  weight?: number;
  bmi?: number;
}

export interface HealthScore {
  score: number;
  trend: "up" | "down" | "stable";
  lastUpdated: string;
  factors: {
    activity: number;
    vitals: number;
    lifestyle: number;
  };
}

export interface DashboardData {
  user: User;
  healthScore: HealthScore;
  metrics: HealthMetrics;
  appointments: Appointment[];
  prescriptions: Prescription[];
  recentActivity: ActivityLog[];
}

// Appointments & Consultation
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualifications: string[];
  experience: number;
  rating: number;
  reviewCount: number;
  availability: TimeSlot[];
  consultationFee: number;
  image?: string;
  
  description: string;
  reviews: number;
  languages: string[];
  available: boolean;
  nextAvailable: string;
  avatar: string;
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  type: "video" | "in-person" | "phone";
  notes?: string;
  meetingLink?: string;
  createdAt: string;
}

export interface AppointmentBooking {
  doctorId: string;
  date: string;
  time: string;
  type: "video" | "in-person" | "phone";
  notes?: string;
}

// Prescriptions & Pharmacy
export interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  startDate: string;
  endDate?: string;
  doctorId: string;
  doctorName: string;
  refillsLeft: number;
  instructions?: string;
  sideEffects?: string[];
  status: "active" | "completed" | "cancelled";
}

export interface Medication {
  id: string;
  name: string;
  genericName: string;
  manufacturer: string;
  category: string;
  description: string;
  price: number;
  inStock: boolean;
  requiresPrescription: boolean;
  image?: string;
  sideEffects?: string[];
  dosageForm: string;
  
  brand?: string;
  dosage: string;
  form: string;
  discountedPrice?: number;
  stockCount: number;
  imageUrl: string;
}

export interface CartItem {
  medicationId: string;
  quantity: number;
  prescriptionId?: string;
}

export interface Order {
  id: string;
  items: Array<{
    medication: Medication;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  shippingAddress: Address;
  paymentMethod: string;
  orderDate: string;
  deliveryDate?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Diagnostics
export interface SymptomAnalysis {
  id: string;
  symptoms: string[];
  severity: "mild" | "moderate" | "severe";
  possibleConditions: Array<{
    name: string;
    probability: number;
    description: string;
  }>;
  recommendations: string[];
  urgencyLevel: "low" | "medium" | "high" | "critical";
  analyzedAt: string;
}

export interface HealthGuide {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
  image?: string;
  readTime: number;
}

// Emergency
export interface EmergencyRequest {
  user_id: string;
  type:
    | "heart_attack"
    | "fall"
    | "medical_emergency"
    | "accident"
    | "breathing_difficulty";
  location?: string;
}

export interface EmergencyResponse {
  id: string;
  status: "dispatched" | "en-route" | "arrived" | "completed";
  estimatedArrival?: string;
  responderContact?: string;
  instructions: string[];
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
}

// IoT Devices
export interface IoTDevice {
  id: string;
  name: string;
  type:
    | "blood_pressure"
    | "glucose"
    | "thermometer"
    | "scale"
    | "oximeter"
    | "ecg"
    | "bot"
    | "monitor"
    | "sensor"
    | "assistant";
  manufacturer: string;
  model: string;
  status: "online" | "offline" | "error" | "busy";
  batteryLevel?: number;
  lastSync: string;
  readings: DeviceReading[];
  battery: number;
  location: string;
  signalStrength: number;
  lastActivity: string;
  temperature?: number;
  humidity?: number;
  actions: DeviceAction[];
}

export interface DeviceReading {
  id: string;
  deviceId: string;
  timestamp: string;
  value: number | string;
  unit: string;
  metadata?: Record<string, unknown>;
}

export interface DeviceAction {
  id: string;
  label: string;
  command: string;
  icon: string;
  color: string;
}

// Voice Assistant
export interface VoiceCommand {
  id: string;
  command: string;
  response: string;
  timestamp: string;
  successful: boolean;
  action?: string;
}

export interface VoiceQuery {
  query: string;
  context?: Record<string, unknown>;
}

// Activity Log
export interface ActivityLog {
  id: string;
  type: "appointment" | "prescription" | "test" | "emergency" | "consultation";
  title: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

// Notifications
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}
