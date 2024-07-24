export type Profile = {
  hasStore: boolean;
  storeId: number;
  profile: {
    fullName: string;
    username: string;
    phone: string;
    profilePicture: string;
    bio: string;
    gender: "MALE" | "FEMALE";
    birthDate: Date;
  };
  email: string;
  password: string;
  id: number;
  isVerified: boolean;
  role: `ADMIN` | `USER`;
};
