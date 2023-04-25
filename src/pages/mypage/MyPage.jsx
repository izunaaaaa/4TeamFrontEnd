import { useState } from "react";
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
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";
import FeedDetail from "pages/main/FeedDetail";
import useMyFeed from "components/mypages/Hook/useMyFeed";
import { useNavigate, useParams } from "react-router-dom";
import Profiles from "components/mypages/myProfile/Profiles";

export default function MyPage() {
  const navigate = useNavigate();
  const { type } = useParams();
  const [feedData, setFeedData] = useState({});

  /**routing */
  const handleTab = (tab) => {
    navigate(`/mypage/${tab}`);
  };

  const { data } = useMyFeed(type);

  const tabMap = {
    feedlist: 0,
    likelist: 1,
    feedlike: 2,
    profile: 3,
  };

  const selectedTabIndex = tabMap[type] ?? 0;

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
        margin={{
          md: "var(--nav-medium-height) 0px 30px var(--nav-medium-width)",
          base: "140px 0px 0px 0px",
        }}
      >
        <HStack
          listStyleType="none"
          display="flex"
          spacing="10"
          width="100%"
          justifyContent="center"
        >
          <Tabs
            isLazy
            isFitted
            variant="unstyled"
            justifyContent="center"
            w="78%"
            defaultIndex={selectedTabIndex}
          >
            <TabList borderTopRadius={"3xl"}>
              <Tab
                m={"1px"}
                borderTopRadius={"lg"}
                _selected={{ color: "white", bg: "#ff535e" }}
                onClick={() => handleTab("feedlist")}
                bg="#f1f4f7"
              >
                작성글
              </Tab>
              <Tab
                m={"1px"}
                borderTopRadius={"lg"}
                _selected={{ color: "white", bg: "#ff535e" }}
                bg="#f1f4f7"
              >
                작성 댓글
              </Tab>
              <Tab
                m={"1px"}
                borderTopRadius={"lg"}
                _selected={{ color: "white", bg: "#ff535e" }}
                bg="#f1f4f7"
                onClick={() => handleTab("feedlike")}
              >
                좋아요한 글
              </Tab>
              <Tab
                m={"1px"}
                borderTopRadius={"lg"}
                _selected={{ color: "white", bg: "#ff535e" }}
                bg="#f1f4f7"
                onClick={() => handleTab("profile")}
              >
                마이페이지
              </Tab>
            </TabList>
          </Tabs>
        </HStack>

        <Flex width="80%" flexWrap="wrap">
          {data?.pages?.map((feedData) =>
            feedData.results?.map((data) => (
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
        {type === "profile" && <Profiles />}
      </Center>
    </>
  );
}
