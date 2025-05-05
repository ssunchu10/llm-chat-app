export type Role = 'user' | 'model';

export interface Message {
  role: Role;
  content: string;
  model?: string; // optional: used for labeling responses
}
