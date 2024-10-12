import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

 export interface IUser {
  _id?: string;
  id? : string
  name: string;
  email: string;
  userName: string;
  role: string;
  profilePicture: string;
   
}

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label?: string;
  name: string;
  disabled? : boolean;
}

export interface IRecipe {
  _id : string;
  title : string
  description : string;
  ingredients: any[]
  instructions: string
  images: any[]
  author: Author
  isPremium: boolean
  isDeleted: boolean
  isPublished: boolean
  tags: string[]
  cookingTime: number
  ratings: any[]
  comments: any[]
  votes: Vote[]
  createdAt: string
  updatedAt: string
  __v: number
  averageRating: number
  voteScore: number
  ratingCounts: number
  commentCounts: number
  id: string
}

export interface Author {
  _id: string
  name: string
  email: string
  role: string
  followers: any[]
  following: any[]
  phone: string
  profilePicture: string
  isPremium: boolean
  username: string
  isBlocked: boolean
  isDeleted: boolean
  needsPasswordChange: boolean
  createdAt: string
  updatedAt: string
  bio? : string;
  subscriptionEndDate: string
  subscriptionStartDate: string
}

export interface Vote {
  user: string
  vote: number
  _id: string
}
