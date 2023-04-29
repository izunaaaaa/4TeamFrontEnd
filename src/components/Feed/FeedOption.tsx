import { Button, useDisclosure } from "@chakra-ui/react";
import { UserData } from "components/form/User/interface/type";
import { DefaultFeedData } from "pages/main/interface/type";
import { HiEllipsisVertical } from "react-icons/hi2";
import FeedOptionModal from "UI/Modal/FeedOptionModal";

interface FeedOptionProps {
  data: DefaultFeedData;
  LoginUserData: UserData;
  refetchFeed?: void;
}

const FeedOption: React.FC<FeedOptionProps> = ({
  data,
  LoginUserData,
  refetchFeed,
}) => {
  const {
    isOpen: isOptionOpen,
    onOpen: onOptionOpen,
    onClose: onOptionClose,
  } = useDisclosure();

  return (
    <>
      <FeedOptionModal
        onClose={onOptionClose}
        isOpen={isOptionOpen}
        feedData={data}
      />

      {LoginUserData?.id === data.user?.pk && (
        <Button
          bg="transparent"
          _hover={{ bg: "transparent" }}
          onClick={() => {
            onOptionOpen();
          }}
        >
          <HiEllipsisVertical size="26" />
        </Button>
      )}
    </>
  );
};

export default FeedOption;
