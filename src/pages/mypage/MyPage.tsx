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
  Box,
  Spinner,
} from "@chakra-ui/react";
import FeedDetail from "pages/main/FeedDetail";
import useMyFeed from "components/mypages/Hook/useMyFeed";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Profiles from "components/mypages/myProfile/Profiles";
import InfiniteScroll from "react-infinite-scroller";
import styles from "./MyPage.module.scss";
import { DefaultFeedData } from "pages/main/interface/type";

export default function MyPage() {
  const navigate = useNavigate();
  const [feedData, setFeedData] = useState({});
  const { type }: { type?: string } = useParams();

  /**routing */
  const handleTab = (tab: string) => {
    navigate(`/mypage/${tab}`);
  };

  const { data, isFetching, hasNextPage, fetchNextPage } = useMyFeed(type);

  const tabMap: Record<string, number> = {
    feedlist: 0,
    feedlike: 1,
    profile: 2,
  };

  const selectedTabIndex = tabMap[type ?? ""] ?? 0;

  const { isOpen, onClose } = useDisclosure();

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
            w={{
              base: "100%",
              md: "78%",
            }}
            defaultIndex={selectedTabIndex}
          >
            <TabList borderTopRadius={"3xl"}>
              <Tab
                m={"1px"}
                borderTopRadius={"lg"}
                _selected={{ bg: "#f1f4f7" }}
                onClick={() => handleTab("feedlist")}
              >
                작성글
              </Tab>

              <Tab
                m={"1px"}
                borderTopRadius={"lg"}
                _selected={{ bg: "#f1f4f7" }}
                onClick={() => handleTab("feedlike")}
              >
                좋아요 글
              </Tab>
              <Tab
                m={"1px"}
                borderTopRadius={"lg"}
                _selected={{ bg: "#f1f4f7" }}
                onClick={() => handleTab("profile")}
              >
                프로필
              </Tab>
            </TabList>
          </Tabs>
        </HStack>
        <InfiniteScroll
          loadMore={fetchNextPage}
          hasMore={hasNextPage}
          className={styles.myPageContents}
        >
          <Flex flexWrap="wrap">
            {data?.pages?.map((feedData: any) =>
              feedData.results?.map((data: DefaultFeedData) => (
                <AspectRatio
                  key={data.id ? data.id : data.pk}
                  width="31.33%"
                  margin="1%"
                  justifyContent="center"
                  alignItems="center"
                  ratio={9 / 10}
                  onClick={() => {
                    setFeedData(data);
                    navigate(`/mypage/${type}/feedDetail/${data.id}`);
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

            {isFetching && (
              <Box width="100%">
                <Box textAlign="center">
                  <Spinner
                    thickness="5px"
                    speed="0.75s"
                    emptyColor="gray.200"
                    color="pink.100"
                    size={{ lg: "xl", md: "lg", base: "lg" }}
                  />
                </Box>
              </Box>
            )}
          </Flex>
        </InfiniteScroll>
        {type === "profile" && <Profiles />}
      </Center>
      <Outlet />
    </>
  );
}
