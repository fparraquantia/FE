import { userData } from "@/app/_data/mockData";
import { useSession } from "next-auth/react";

const useUserEmail = () => {
  const session = useSession();
  return session?.data?.user.email || "";
};

const useCurrentUser = () => {
  const currentUserEmail = useUserEmail();
  // TODO: userData should come from a dynamic request
  return userData.find((user) => {
    return user.email === currentUserEmail;
  });
};

const useCurrentUserProfileId = () => {
  return useCurrentUser()?.profileId || null;
};

export function useUserCanEditPowerBIReport() {
  let userCanEdit = false;
  const editingPermission: number = 1;
  const currentUserProfileId = useCurrentUserProfileId();
  if (currentUserProfileId === editingPermission) {
    userCanEdit = true;
  }
  return userCanEdit;
}
