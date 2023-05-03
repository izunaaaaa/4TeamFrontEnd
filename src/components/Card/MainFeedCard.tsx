import { Avatar, Box, Button, Flex, HStack, Image } from "@chakra-ui/react";
import styles from "../../pages/main/FeedPage.module.scss";
import moment from "moment";
import "moment/locale/ko";
import FeedOption from "components/Feed/FeedOption";
import LikeBtn from "UI/Button/LikeBtn";
import { FiMessageSquare } from "react-icons/fi";
import SendBtn from "UI/Button/SendBtn";
import { useNavigate } from "react-router-dom";
import { DefaultFeedData } from "pages/main/interface/type";
import { UserData } from "components/form/User/interface/type";

interface MainFeedCardProps {
  key: number;
  data: DefaultFeedData;
  LoginUserData: UserData;
}

function MainFeedCard({ LoginUserData, data }: MainFeedCardProps) {
  const groupName = LoginUserData?.group.name;

  const navigate = useNavigate();

  const viewDetail = (dataId: number) => {
    navigate(`feedDetail/${dataId}`);
  };

  return (
    <>
      <div key={data.id} className={styles.feedDiv}>
        <div className={styles.feedUser}>
          <Avatar
            size="sm"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          />
          <Flex justifyContent="space-between" w="100%">
            <h1>
              <p>{groupName}의 개발자</p>
              {moment(data.created_at).fromNow()}
            </h1>
            <FeedOption
              data={data}
              LoginUserData={LoginUserData}
              feedType="mainFeed"
            />
          </Flex>
        </div>
        {data.thumbnail && (
          <Image
            fallbackSrc="https://velog.velcdn.com/images/view_coding/post/a8381e96-0dae-45bf-b30f-985c1d2d6359/image.png"
            borderRadius="xl"
            src={data.thumbnail}
            margin="20px 0"
            cursor="pointer"
            onClick={() => viewDetail(data.id)}
          />
        )}
        <Box
          marginBottom="20px"
          fontSize="1.2rem"
          onClick={() => viewDetail(data.id)}
          cursor="pointer"
        >
          {data.title}
        </Box>
        <HStack spacing="1px">
          <LikeBtn
            id={data.id}
            likeCount={data.like_count}
            isLike={data.is_like}
          />

          <Button
            padding="5px"
            backgroundColor="transparent"
            leftIcon={<FiMessageSquare />}
            onClick={() => viewDetail(data.id)}
          >
            {data.comments_count}
          </Button>
          {LoginUserData?.id !== data.user?.pk && (
            <SendBtn userPk={data.user.pk} />
          )}
        </HStack>

        <div className={styles.comment} onClick={() => viewDetail(data.id)}>
          댓글모두 보기
        </div>
      </div>
    </>
  );
}

export default MainFeedCard;
