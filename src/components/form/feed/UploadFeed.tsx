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
import { PostFeed } from "../User/interface/type";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import CropUploadImg from "./CropUploadImg";
import useFeedCategory from "./hook/useFeedCategory";
import styles from "./UploadFeed.module.scss";
import useUser from "../User/Hook/useUser";

const UploadFeed = () => {
  const { register, handleSubmit } = useForm<PostFeed>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();

  const { state: feedDetail } = useLocation();
  const { LoginUserData } = useUser();

  const [previewImg, setPreviewImg] = useState();
  const [cropImg, setCropImg] = useState<string | null>(null);

  /**카테고리 가져오기 */
  const { feedCategory } = useFeedCategory(LoginUserData?.group?.name);

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
      navigate(-1);
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
    if (cropImg) {
      const blob = dataURLToBlob(cropImg);
      const file = new File([blob], "image.jpeg", { type: "image/jpeg" });
      resUrl = await postUploadUrlHandler(file);
    }
    if (feedDetail) {
      const postData: PostFeed = {
        title: data.title,
        category: data.category,
        ...(data.description && { description: data.description }),
        ...(feedDetail.thumbnail && { image: feedDetail.thumbnail }),
        ...(resUrl && { image: resUrl }),
      };
      return updateFeedHandler(postData);
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
      {(postFeedLoading || postUploadUrlLoading) && (
        <Center
          zIndex="1000"
          position="absolute"
          top="50%"
          left="50%"
          height="50%"
          marginLeft="-50px"
          marginTop="-50px"
          display="flex"
          flexDirection="column"
        >
          <Spinner size="xl" thickness="3px" color="blue.500" />
        </Center>
      )}

      <Flex justifyContent="center" margin="20px">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className={styles.postForm}
        >
          <div className={styles.postFormHeader}>
            <button onClick={() => navigate("/home")}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            {feedDetail ? (
              <h3>게시물 수정하기</h3>
            ) : (
              <h3>새 게시물 작성하기</h3>
            )}
            <button onSubmit={handleSubmit(submitHandler)}>업로드하기</button>
          </div>

          <div className={styles.postFormMain}>
            {(cropImg || feedDetail?.thumnail) && (
              <Box left="1%" top="1%">
                <Button onClick={() => setCropImg(null)}>x</Button>
              </Box>
            )}
            <div className={styles.fileForm}>
              {feedDetail?.thumbnail ? (
                <>
                  <img
                    alt=" "
                    className={styles.previewImg}
                    src={feedDetail.thumbnail}
                  />
                  <Button position="absolute">x</Button>
                </>
              ) : !cropImg ? (
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

            <Flex flexDirection="column" w="450px" padding="10px">
              <Select
                placeholder="카테고리를 입력해주세요"
                size="sm"
                {...register("category", {})}
              >
                {feedCategory.map((category: any) => {
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
                defaultValue={feedDetail ? feedDetail.title : null}
                {...register("title", {})}
              />
              <Textarea
                marginTop="10px"
                placeholder="내용을 입력해주세요..."
                {...register("description")}
                resize="none"
                h={"50%"}
              />
            </Flex>
          </div>
        </form>
      </Flex>
    </>
  );
};

export default UploadFeed;
