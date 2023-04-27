import { AspectRatio, Box, Center, Flex, Img, Spinner } from "@chakra-ui/react";
import { DefaultFeedData } from "pages/main/interface/type";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useNavigate, useParams } from "react-router-dom";
import useSearchData from "./Hook/useSearchData";

const SearchFeed = () => {
  const navigate = useNavigate();
  // const [feedData, setFeedData] = useState({});
  const { groupId, keyword } = useParams();
  const { searchResults, fetchNextPage, hasNextPage, isFetching } =
    useSearchData(Number(groupId), keyword);

  console.log(searchResults);

  return (
    <>
      <Center
        flexDirection="column"
        margin={{
          md: "var(--nav-medium-height) 0px 30px var(--nav-medium-width)",
          base: "140px 0px 0px 0px",
        }}
      >
        <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
          <Flex flexWrap="wrap">
            {searchResults?.pages?.map((feedData: any) =>
              feedData?.result?.map((data: DefaultFeedData) => (
                <AspectRatio
                  key={data.id ? data.id : data.pk}
                  width="31.33%"
                  margin="1%"
                  justifyContent="center"
                  alignItems="center"
                  ratio={9 / 10}
                  // onClick={() => {
                  //   setFeedData(data);
                  //   navigate(`/mypage/${type}/feedDetail/${data.id}`);
                  // }}
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
      </Center>
    </>
  );
};

export default SearchFeed;
