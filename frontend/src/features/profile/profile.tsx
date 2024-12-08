import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FiEdit3, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

interface IProps {
  fullname?: string;
  username?: string;
  profilePicture?: string;
  bio?: string;
  totalProduct: number;
  followers?: number;
  rating?: number;
  email?: string;
  phone?: string;
  address?: string;
}

export function Profile() {
  const profile: IProps = {
    fullname: "Jhon Due",
    username: "Jhon Due",
    profilePicture: "/assets/defaultprofile.jpg",
    bio: "Orang paling terkenal sejagat pemograman",
    totalProduct: 100,
    followers: 250,
    rating: 4.5,
    email: "jhondue@example.com",
    phone: "+6281234567890",
    address: "123 Main St, Jakarta, Indonesia",
  };

  return (
    <div className="flex justify-center items-center max-h-screen">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex items-center space-x-4 p-4 bg-gray-100 rounded-t-lg">
          <img
            src={profile.profilePicture}
            className="w-[100px] h-[100px] rounded-full object-cover border-4 border-white shadow-md"
            alt="Profile"
          />
          <div className="flex flex-col space-y-1">
            <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-900">
              @{profile.username}
              <Link
                to="/seller/profile/edit"
                className="mt-1 text-blue-500 hover:text-blue-700"
              >
                <FiEdit3 />
              </Link>
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 text-center">
              {profile.fullname}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <CardDescription className="mb-4 text-center text-gray-700">
            {profile.bio}
            <div className="text-left text-center">
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {profile.email}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Phone:</strong> {profile.phone}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Address:</strong> {profile.address}
              </p>
            </div>
          </CardDescription>

          <div className="flex justify-around text-center mb-4 pt-3">
            <div>
              <p className="text-lg font-semibold text-gray-800">
                {profile.totalProduct}
              </p>
              <p className="text-sm text-gray-600">Total Produk</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800">
                {profile.followers}
              </p>
              <p className="text-sm text-gray-600">Produk Terjual</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800">
                {profile.rating}
              </p>
              <p className="text-sm text-gray-600">Rating</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-around p-4 bg-gray-100 rounded-b-lg">
          <Link
            to="/seller/products/create"
            className="text-blue-500 hover:text-blue-700 flex items-center gap-2"
          >
            <FiPlus /> Tambah Produk
          </Link>
          <Link
            to="/seller/products"
            className="text-blue-500 hover:text-blue-700"
          >
            Lihat Produk
          </Link>
          <Link
            to="/seller/orders"
            className="text-blue-500 hover:text-blue-700"
          >
            Lihat Order
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
