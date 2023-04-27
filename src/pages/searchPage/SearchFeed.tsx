import { AspectRatio, Box, Center, Flex, Img, Spinner } from "@chakra-ui/react";
import MiniFeedCard from "components/Card/MiniFeedCard";
import { DefaultFeedData } from "pages/main/interface/type";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import useSearchData from "./Hook/useSearchData";
import styles from "./SearchFeed.module.scss";

const SearchFeed = () => {
  const navigate = useNavigate();
  // const [feedData, setFeedData] = useState({});
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
        <InfiniteScroll
          loadMore={fetchNextPage}
          hasMore={hasNextPage}
          className={styles.searchPageContents}
        >
          <Flex flexWrap="wrap">
            {searchResults?.pages?.map((feedData: any) =>
              feedData?.results?.map((data: DefaultFeedData) => {
                console.log(data);
                return <MiniFeedCard feedData={data} />;
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
