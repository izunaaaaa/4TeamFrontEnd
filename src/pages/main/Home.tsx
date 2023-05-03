import { Flex, Img } from "@chakra-ui/react";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <Flex className={styles.community_home}>
      <Img
        className={styles.community_img}
        src="https://velog.velcdn.com/images/view_coding/post/9a2ffd3f-91e8-4014-8d90-9301e9551124/image.png"
      />
    </Flex>
  );
};

export default Home;
