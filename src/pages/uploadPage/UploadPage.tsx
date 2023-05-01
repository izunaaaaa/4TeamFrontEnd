import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Select,
  Spinner,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { faCloudArrowUp, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { postFeed, postUploadUrl, updateFeed } from "api/axios/axiosSetting";
import { PostFeed } from "../../components/form/User/interface/type";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import CropUploadImg from "../../components/form/feed/CropUploadImg";
import useFeedCategory from "../../components/form/feed/hook/useFeedCategory";
import styles from "./UploadPage.module.scss";
import useUser from "../../components/form/User/Hook/useUser";
import { Category } from "UI/sidebar/hook/useSide";
import useFeedDetail from "pages/main/hook/useFeedDetail";

const UploadPage = () => {
  const { register, handleSubmit } = useForm<PostFeed>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();

  const { state: feedId } = useLocation();
  const { LoginUserData } = useUser();

  const { feedDetail } = useFeedDetail(feedId.id);
  const feedThumbnail = feedDetail?.thumbnail ?? null;

  useEffect(() => {
    setCategory(feedDetail.category);
  }, [feedDetail]);

  const [category, setCategory] = useState(feedDetail.category);
  const [previewImg, setPreviewImg] = useState();
  const [cropImg, setCropImg] = useState<string | null>(feedThumbnail);

  /**카테고리 가져오기 */
  const { feedCategory } = useFeedCategory(LoginUserData?.group?.pk);

  const newCategory = feedCategory?.filter((data: Category) => {
    return data.name !== "전체글" && data.name !== "인기글";
  });

  const wholeFeedCategory = feedCategory?.find(
    (e: Category) => e.name === "전체글"
  );

  /**이미지를 담을 url 요청 */
  const { mutateAsync: postUploadUrlHandler, isLoading: postUploadUrlLoading } =
    useMutation(async (img: any) => await postUploadUrl(img));

  const postState = {
    onSuccess: () => {
      toast({
        title: "게시글을 업로드했습니다.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate(
        `/community/${wholeFeedCategory.group.pk}/category/${wholeFeedCategory.id}`
      );
    },
    onError: () => {
      toast({
        title: "업로드 실패",
        description: `카테고리와 제목은 필수 입니다.`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  };

  /**게시글 post */
  const { mutate: postFeedHandler, isLoading: postFeedLoading } = useMutation(
    (postData: PostFeed) => postFeed(postData),
    postState
  );

  /**게시글 put */
  const { mutate: updateFeedHandler } = useMutation(
    (updateData: PostFeed) => updateFeed(feedDetail.id, updateData),
    postState
  );

  /**업로드 이미지 크롭 모달창으로 보내기*/
  const changeImg = async (e: React.ChangeEvent) => {
    const reader: any = new FileReader();

    const target = e.currentTarget as HTMLInputElement;

    const file = target.files?.[0];

    if (!file) return;

    reader.readAsDataURL(file);
    const data: any = URL.createObjectURL(file);

    setPreviewImg(data);
    onOpen();
  };

  /**크롭한 이미지 미리보기 */
  const getCroppedImg = (img: string) => {
    setCropImg(img);
  };

  /**이미지url을 blob으로 변환 */
  function dataURLToBlob(dataURL: any): Blob {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  /**양식 제출하기 */
  const submitHandler = async (data: PostFeed) => {
    let resUrl = "";

    if (feedDetail) {
      if (cropImg === null) {
      } else if (cropImg !== feedDetail?.thumbnail) {
        const blob = dataURLToBlob(cropImg);
        const file = new File([blob], "image.jpeg", { type: "image/jpeg" });
        resUrl = await postUploadUrlHandler(file);
      }
      const postData: PostFeed = {
        title: data.title,
        category: data.category,
        ...(data.description && { description: data.description }),
        ...(cropImg ? { image: feedDetail?.thumbnail } : { image: null }),
        ...(resUrl && { image: resUrl }),
      };
      return updateFeedHandler(postData);
    } else {
      if (cropImg) {
        const blob = dataURLToBlob(cropImg);
        const file = new File([blob], "image.jpeg", { type: "image/jpeg" });
        resUrl = await postUploadUrlHandler(file);
      }
    }

    const postData: PostFeed = {
      title: data.title,
      category: data.category,
      ...(data.description && { description: data.description }),
      ...(resUrl && { image: resUrl }),
    };
    postFeedHandler(postData);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <CropUploadImg
            previewImg={previewImg}
            getCroppedImg={getCroppedImg}
            onClose={onClose}
          />
        </ModalContent>
      </Modal>

      <Flex
        justifyContent="center"
        margin={{
          md: "100px 0px 0px var(--nav-medium-width)",
          sm: "8.7em 0px 0px 0px",
        }}
        h="100%"
      >
        {(postFeedLoading || postUploadUrlLoading) && (
          <Center
            zIndex="1000"
            position="fixed"
            top="50%"
            left="50%"
            display="flex"
            flexDirection="column"
          >
            <Spinner
              thickness="5px"
              speed="0.75s"
              emptyColor="gray.200"
              color="pink.100"
              size={{ lg: "xl", md: "lg", base: "lg" }}
            />
          </Center>
        )}
        <form
          onSubmit={handleSubmit(submitHandler)}
          className={styles.postForm}
        >
          <div className={styles.postFormHeader}>
            <Button onClick={() => navigate(-1)} bg="transparent">
              <FontAwesomeIcon icon={faArrowLeft} />
            </Button>
            {feedDetail ? (
              <Box lineHeight={2} fontSize="xl">
                게시물 수정하기
              </Box>
            ) : (
              <Box lineHeight={2} fontSize="xl" bg="transparent">
                새 게시물 작성하기
              </Box>
            )}
            <Button type="submit" onSubmit={handleSubmit(submitHandler)}>
              업로드
            </Button>
          </div>

          <div className={styles.postFormMain}>
            <Flex
              flexDirection="column"
              width={{
                md: "50%",
                sm: "100%",
              }}
            >
              <div className={styles.fileForm}>
                {!cropImg ? (
                  <>
                    <input
                      type="file"
                      {...register("image")}
                      accept="image/*"
                      onChange={changeImg}
                    />
                    <button>
                      <FontAwesomeIcon
                        icon={faCloudArrowUp}
                        size="5x"
                        style={{ color: "skyblue" }}
                      />
                    </button>
                  </>
                ) : (
                  <>
                    <img alt=" " className={styles.previewImg} src={cropImg} />
                  </>
                )}
              </div>
              {cropImg && (
                <Box textAlign="center">
                  <Button marginTop="5px" onClick={() => setCropImg(null)}>
                    사진 삭제
                  </Button>
                </Box>
              )}
            </Flex>

            <Flex
              flexDirection="column"
              width={{
                md: "50%",
                sm: "100%",
              }}
              padding="10px"
              height="100%"
            >
              <Select
                placeholder="카테고리를 입력해주세요"
                h="40px"
                size="sm"
                {...register("category", {
                  onChange: (e) => {
                    setCategory(e.target.value);
                  },
                })}
                value={category}
              >
                {newCategory?.map((category: Category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </Select>
              <Input
                placeholder="제목을 입력하세요."
                marginTop="10px"
                type="text"
                minH="40px"
                defaultValue={feedDetail ? feedDetail.title : ""}
                {...register("title", {})}
              />
              <Textarea
                marginTop="10px"
                placeholder="내용을 입력해주세요..."
                defaultValue={feedDetail ? feedDetail.description : ""}
                {...register("description")}
                resize="none"
                h={"100%"}
              />
            </Flex>
          </div>
        </form>
      </Flex>
    </>
  );
};

export default UploadPage;
