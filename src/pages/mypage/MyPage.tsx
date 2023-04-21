import React, { useEffect, useRef, useState } from "react";
import {
  faPenToSquare,
  faMessage,
  faThumbsUp,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import TabMenuItem from "../../components/mypages/tabMenu/TabMenuItem";
import useMyFeed from "components/mypages/Hook/useMyFeed";
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
} from "@chakra-ui/react";
import FeedDetail from "pages/main/FeedDetail";

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("feedlist");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTabMenuFixed, setIsTabMenuFixed] = useState(false);
  const [feedData, setFeedData] = useState({});

  const handleTab = (tab: string) => {
    setActiveTab(tab);
  };

  const { data } = useMyFeed(activeTab);

  const activeContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const activeContentHeight = activeContentRef.current?.clientHeight || 0;
      setIsScrolled(scrollTop > 0);

      if (
        activeContentRef.current &&
        scrollTop >= activeContentRef.current.offsetTop - activeContentHeight
      ) {
        setIsTabMenuFixed(true);
      } else {
        setIsTabMenuFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      <Center flexDirection="column" margin="100px 0 20px 150px">
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
            tabName="writtencomment"
            activeTab={activeTab}
            onClick={handleTab}
          />
          <TabMenuItem
            icon={faThumbsUp}
            size="lg"
            text="좋아요한 글"
            tabName="likes"
            activeTab={activeTab}
            onClick={handleTab}
          />
          <TabMenuItem
            icon={faUser}
            size="lg"
            text="내 정보"
            tabName="profile"
            activeTab={activeTab}
            onClick={handleTab}
          />
        </HStack>
        <Flex
          border="1px solid black "
          width="80%"
          flexWrap="wrap"
          justifyContent="center"
        >
          {data?.pages?.map((feedData: any) =>
            feedData.results?.map((data: any) => (
              <Flex
                key={data.id}
                width="30%"
                height="300px"
                padding="5px"
                justifyContent="center"
                alignItems="center"
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
              </Flex>
            ))
          )}
        </Flex>
      </Center>
    </>
  );
}
