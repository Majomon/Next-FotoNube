import { GetUserResponse } from "@/interfaces/user/get-user.interface";
import claraApi from "@/lib/axios";

export const getCurrentUser = async (): Promise<GetUserResponse> => {
  const { data } = await claraApi.get("/users/me");
  console.log(data);

  return data;
};
