import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import MiniFeedCard from "components/Card/MiniFeedCard";
import { DefaultFeedData } from "pages/main/interface/type";
import InfiniteScroll from "react-infinite-scroller";
import { Outlet, useParams } from "react-router-dom";
import useSearchData from "./Hook/useSearchData";
import styles from "./SearchFeed.module.scss";

const SearchFeed = () => {
  const { groupId, keyword } = useParams();
  const { searchResults, fetchNextPage, hasNextPage, isFetching } =
    useSearchData(Number(groupId), keyword);

  return (
    <>
      <Center
        flexDirection="column"
        margin={{
          md: "var(--nav-medium-height) 0px 30px var(--nav-medium-width)",
          base: "140px 0px 0px 0px",
        }}
      >
        <Flex
          w={{
            base: "92%",
            md: "78%",
          }}
          padding="20px 0"
          fontWeight="bold"
          fontSize={20}
        >
          <Box color="yellow.500">"{keyword}"</Box>로 검색한 결과
        </Flex>
        <InfiniteScroll
          loadMore={fetchNextPage}
          hasMore={hasNextPage}
          className={styles.searchPageContents}
        >
          <Flex flexWrap="wrap">
            {searchResults?.pages?.map((feedData: any) =>
              feedData?.results?.map((data: DefaultFeedData) => {
                return <MiniFeedCard feedData={data} key={data.id} />;
              })
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
      </Center>
      <Outlet />
    </>
  );
};

export default SearchFeed;
