import { useUserContext } from "@/app/context/UserContext";
import UserVideos from "@/components/shared/UserVideos";
import { redirect } from "next/navigation";

const UserVideosWrapper = () => {
  return (
    <div>
      <UserVideos />
    </div>
  );
};

export default UserVideosWrapper;
