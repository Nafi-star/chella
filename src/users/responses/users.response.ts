export class UserProfileResponse{
  username: string;
  referralCode: string;
  referredBy?: string;
  balance: number;
  totalEarned: number;
  totalReferred: number;
  createdAt: Date;
}   