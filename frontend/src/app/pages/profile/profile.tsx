import { Profile } from "@/features/profile/profile";
import { Helmet } from "react-helmet-async";

export function ProfilePage() {
  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Profile />
    </>
  );
}
