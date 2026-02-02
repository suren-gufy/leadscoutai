export interface BusinessContact {
  name: string;
  website: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  description: string;
}

export interface SearchState {
  isLoading: boolean;
  error: string | null;
  data: BusinessContact[];
  searchPerformed: boolean;
}
