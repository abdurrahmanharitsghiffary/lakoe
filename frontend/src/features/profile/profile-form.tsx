import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface IProfile {
  fullname?: string;
  username?: string;
  profilePicture?: string;
  bio?: string;
  phone?: string;
  gender?: "MALE" | "FEMALE";
  birthDate?: Date;
}

export function ProfileForm() {
  const profile: IProfile = {
    fullname: "Jhon Due",
    username: "JhonDue",
    profilePicture: "/assets/defaultprofile.jpg",
    bio: "This is a short bio",
    phone: "123456789",
    gender: "MALE",
    birthDate: new Date("1990-01-01"),
  };

  const [form, setForm] = useState({
    fullname: "",
    username: "",
    profilePicture: "",
    bio: "",
    phone: "",
    gender: "",
    birthDate: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelectChange = (value: string) => {
    setForm({ ...form, gender: value as "MALE" | "FEMALE" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form");
  };
  return (
    <div className="flex flex-col items-center mt-10 space-y-10">
      <div className="flex justify-start max-w-3xl w-full space-x-5">
        <img src={profile.profilePicture} className="w-20 h-20 rounded-full" />
        <div>
          <CardTitle className="text-2xl font-semibold">
            @{profile.username}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            {profile.fullname}
          </CardDescription>
          <button className="mt-2 px-4 py-2 bg-blue-500 w-full text-white rounded-lg hover:bg-blue-600">
            Change Photo
          </button>
        </div>
      </div>
      <Card className="w-full max-w-3xl border border-gray-300 shadow-lg">
        <CardContent>
          <form className="space-y-5 mt-5" onSubmit={handleSubmit}>
            <div>
              <Label className="block mb-2 text-sm font-medium text-gray-700">
                Nama Lengkap
              </Label>
              <Input
                type="text"
                placeholder="Nama Lengkap"
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <Label className="block mb-2 text-sm font-medium text-gray-700">
                Username
              </Label>
              <Input
                type="text"
                placeholder="Username"
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <Label className="block mb-2 text-sm font-medium text-gray-700">
                Foto Profil
              </Label>
              <Input
                type="file"
                placeholder="Profile picture"
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <Label className="block mb-2 text-sm font-medium text-gray-700">
                Bio
              </Label>
              <textarea
                placeholder="Write your biography here"
                className="w-full p-2 border border-gray-300 rounded-md h-24"
              />
            </div>
            <div>
              <Label className="block mb-2 text-sm font-medium text-gray-700">
                Phone
              </Label>
              <Input
                type="text"
                placeholder="Phone"
                onChange={handleInputChange}
                value={form.phone}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <Label className="block mb-2 text-sm font-medium text-gray-700">
                Gender
              </Label>
              <Select value={form.gender} onValueChange={handleSelectChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Laki-laki</SelectItem>
                  <SelectItem value="FEMALE">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 w-full text-white rounded-lg hover:bg-blue-600"
            >
              Save Changes
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
