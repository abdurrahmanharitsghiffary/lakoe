import { axios } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useSession } from "./use-session";
import { useEffect } from "react";

const addressSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  address: z.string().min(1, "Address cannot be empty"),
  postalCode: z.string().min(1, "Postal code cannot be empty"),
  province: z.string().min(1, "Province cannot be empty"),
  city: z.string().min(1, "City cannot be empty"),
  district: z.string().min(1, "District cannot be empty"),
  latitude: z.string().min(1, "Latitude cannot be empty"),
  longitude: z.string().min(1, "Longitude cannot be empty"),
});

type AddressInput = z.infer<typeof addressSchema>;

export const useLocation = () => {
  const { user } = useSession();
  const storeId = user?.storeId;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
    control,
    setValue,
  } = useForm<AddressInput>({
    mode: "onChange",
    resolver: zodResolver(addressSchema),
  });

  console.log("form:", errors);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: AddressInput) => createLocation(storeId!, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
    },
  });

  const onSubmit: SubmitHandler<AddressInput> = async (data) => {
    const transformedData = {
      ...data,
      latitude: data.latitude.toString(),
      longitude: data.longitude.toString(),
    };
    mutation.mutate(transformedData);
  };

  const createLocation = async (id: number, data: AddressInput) => {
    const response = await axios.post(`/stores/${id}/address`, data);
    return response.data;
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  // const [coordinate, setCoordinate] = React.useState<L.LatLng | null>(null);

  // const handlePositionUpdate = (position: L.LatLng) => {
  //   setCoordinate(position);
  //   setValue("latitude", position.lat.toString(), { shouldValidate: true });
  //   setValue("longitude", position.lng.toString(), { shouldValidate: true });
  // };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    control,
    setValue,
  };
};
