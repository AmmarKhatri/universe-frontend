export interface Community {
  id: string;
  commid: string;
  name: string;
  description: string;
  moderators: string[];
  createdBy: {
    username: string;
    email: string;
  };
  isArchived: boolean;
}

export interface User {
  id: string;
  email: string;
  username: string;
  dateOfBirth: string;
  role: string;
}
export enum Role {
  STUDENT = "STUDENT",
  MEMBER = "MEMBER",
  ADMIN = "ADMIN",
  SUPERADMIN = "SUPERADMIN",
}
