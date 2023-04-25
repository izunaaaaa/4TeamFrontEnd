import React, { useEffect, useRef, useState } from "react";
import {
  faPenToSquare,
  faMessage,
  faThumbsUp,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import TabMenuItem from "../../components/mypages/tabMenu/TabMenuItem";
import {
  Center,
  Flex,
  HStack,
  Img,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Modal,
  ModalBody,
  AspectRatio,
} from "@chakra-ui/react";
import FeedDetail from "pages/main/FeedDetail";
import useMyFeed from "components/mypages/Hook/useMyFeed";
import ManagerProfiles from "components/mypages/myProfile/ManagerProfiles";
import useUser from "components/form/User/Hook/useUser";

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("feedlist");
  const { LoginUserData } = useUser();
  const isCoach = LoginUserData.is_coach;
  const [feedData, setFeedData] = useState({});
  const [isMyPage, setMyPage] = useState(false);

  /**routing */
  const handleTab = (tab: string) => {
    setActiveTab(tab);
    setMyPage(false);
  };
  const myPageHandler = () => {
    setMyPage(true);
  };

  const { data } = useMyFeed(activeTab);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <FeedDetail feedData={feedData} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Center
        flexDirection="column"
        margin="var(--nav-medium-height) 0px 30px var(--nav-medium-width)"
      >
        <HStack listStyleType="none" display="flex" spacing="10">
          <TabMenuItem
            icon={faPenToSquare}
            size="lg"
            text="작성 글"
            tabName="feedlist"
            activeTab={activeTab}
            onClick={handleTab}
          />
          <TabMenuItem
            icon={faMessage}
            size="lg"
            text="작성 댓글"
            tabName="commentlist"
            activeTab={activeTab}
            onClick={handleTab}
          />
          <TabMenuItem
            icon={faThumbsUp}
            size="lg"
            text="좋아요한 글"
            tabName="feedlike"
            activeTab={activeTab}
            onClick={handleTab}
          />
          <TabMenuItem
            icon={faUser}
            size="lg"
            text="내 정보"
            tabName="managerProfile"
            activeTab={activeTab}
            onClick={myPageHandler}
          />
        </HStack>
        {isMyPage && isCoach ? (
          <ManagerProfiles />
        ) : (
          <Flex border="1px solid black " width="80%" flexWrap="wrap">
            {data?.pages?.map((feedData: any) =>
              feedData.results?.map((data: any) => (
                <AspectRatio
                  key={data.id ? data.id : data.pk}
                  width="33%"
                  padding="5px"
                  justifyContent="center"
                  alignItems="center"
                  ratio={9 / 10}
                  onClick={() => {
                    setFeedData(data);
                    onOpen();
                  }}
                >
                  {data.thumbnail ? (
                    <Img
                      src={data.thumbnail}
                      objectFit="cover"
                      width="100%"
                      height="100%"
                    />
                  ) : (
                    <p>{data.title}</p>
                  )}
                </AspectRatio>
              ))
            )}
          </Flex>
        )}
      </Center>
    </>
  );
}
