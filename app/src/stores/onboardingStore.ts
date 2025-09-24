import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type UserRole = 'LEARNER' | 'TEACHER' | 'BOTH';
export type AvailabilitySlot = 'MORNINGS' | 'EVENINGS' | 'WEEKNIGHTS' | 'WEEKENDS';

interface OnboardingState {
  // User selections
  role: UserRole | null;
  learningTags: string[];
  teachingTags: string[];
  city: string | null;
  availability: AvailabilitySlot[];
  languages: string[];
  displayName: string;
  bio: string;
  avatarUri: string | null;
  
  // Account info
  email: string;
  username: string;
  password: string;
  
  // UI state
  currentStep: number;
  hasAcceptedSafety: boolean;
  
  // Actions
  setRole: (role: UserRole) => void;
  setLearningTags: (tags: string[]) => void;
  setTeachingTags: (tags: string[]) => void;
  setCity: (city: string) => void;
  setAvailability: (slots: AvailabilitySlot[]) => void;
  setLanguages: (languages: string[]) => void;
  setProfile: (displayName: string, bio: string) => void;
  setAvatar: (uri: string | null) => void;
  setAccountInfo: (email: string, username: string, password: string) => void;
  acceptSafety: () => void;
  nextStep: () => void;
  previousStep: () => void;
  reset: () => void;
}

const initialState = {
  role: null,
  learningTags: [],
  teachingTags: [],
  city: null,
  availability: [],
  languages: [],
  displayName: '',
  bio: '',
  avatarUri: null,
  email: '',
  username: '',
  password: '',
  currentStep: 0,
  hasAcceptedSafety: false,
};

export const useOnboardingStore = create<OnboardingState>()(
  immer((set) => ({
    ...initialState,
    
    setRole: (role) =>
      set((state) => {
        state.role = role;
      }),
      
    setLearningTags: (tags) =>
      set((state) => {
        state.learningTags = tags;
      }),
      
    setTeachingTags: (tags) =>
      set((state) => {
        state.teachingTags = tags;
      }),
      
    setCity: (city) =>
      set((state) => {
        state.city = city;
      }),
      
    setAvailability: (slots) =>
      set((state) => {
        state.availability = slots;
      }),
      
    setLanguages: (languages) =>
      set((state) => {
        state.languages = languages;
      }),
      
    setProfile: (displayName, bio) =>
      set((state) => {
        state.displayName = displayName;
        state.bio = bio;
      }),
      
    setAvatar: (uri) =>
      set((state) => {
        state.avatarUri = uri;
      }),
      
    setAccountInfo: (email, username, password) =>
      set((state) => {
        state.email = email;
        state.username = username;
        state.password = password;
      }),
      
    acceptSafety: () =>
      set((state) => {
        state.hasAcceptedSafety = true;
      }),
      
    nextStep: () =>
      set((state) => {
        state.currentStep += 1;
      }),
      
    previousStep: () =>
      set((state) => {
        state.currentStep = Math.max(0, state.currentStep - 1);
      }),
      
    reset: () => set(initialState),
  }))
);