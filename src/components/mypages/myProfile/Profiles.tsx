import { Box } from "@chakra-ui/react";
import useUser from "components/form/User/Hook/useUser";
import ManagerProfiles from "./ManagerProfiles";
import UserProfiles from "./UserProfiles";

const Profiles = () => {
  const { LoginUserData } = useUser();

  const isCoach = LoginUserData?.is_coach;
  return <>{!isCoach ? <UserProfiles /> : <ManagerProfiles />}</>;
};

export default Profiles;
