import { ProfileForm } from "@/features/profile/profile-form";
import { Helmet } from "react-helmet-async";

export function EditProfilePage() {
  return (
    <>
      <Helmet>
        <title>Edit Profile</title>
      </Helmet>
      <ProfileForm />
    </>
  );
}
