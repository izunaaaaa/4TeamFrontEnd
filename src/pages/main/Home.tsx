import { Flex, Img } from "@chakra-ui/react";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <Flex className={styles.community_home}>
      <Img
        className={styles.community_img}
        src="https://velog.velcdn.com/images/view_coding/post/96f6b4e2-defc-4609-8519-2a2146f44b64/image.png"
      />
    </Flex>
  );
};

export default Home;
