import { Box } from "@chakra-ui/react";
import useUser from "components/form/User/Hook/useUser";
import ManagerProfiles from "./ManagerProfiles";

const Profiles = () => {
  const { LoginUserData } = useUser();

  const isCoach = LoginUserData?.is_coach;
  return (
    <>
      {!isCoach ? (
        <Box>
          <div>유저정보</div>
        </Box>
      ) : (
        <ManagerProfiles />
      )}
    </>
  );
};

export default Profiles;
