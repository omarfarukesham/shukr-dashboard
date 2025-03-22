interface UserInfo {
    _id: string;
    name: string;
    email: string;
    role: string;
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
 export interface IChallenge {
    _id: string;
    name: string;
    description: string;
    duration: string;
    startedAt: string | null;
    image: string;
    completedAt: string | null;
    isActive: boolean;
    isLoop: boolean;
    resettable: boolean;
    isFeatured?: boolean;
    reminderTime: string;
    category: string;
    userInfo: UserInfo;
    visibility: "FREE" | "PAID";
    streak: number;
    createdBy: string;
    updatedBy: string;
    challengeId: string;
    createdAt: string;
    updatedAt: string;
    templateId: string[];
  }
  