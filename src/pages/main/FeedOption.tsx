import { Button, useDisclosure } from "@chakra-ui/react";
import { HiEllipsisVertical } from "react-icons/hi2";
import FeedOptionModal from "UI/Modal/FeedOptionModal";

const FeedOption = (props: any) => {
  const data = props.data;
  const LoginUserData = props.LoginUserData;
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
