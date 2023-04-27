import { AspectRatio, Card, CardBody, Img } from "@chakra-ui/react";
import useUser from "components/form/User/Hook/useUser";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const MiniFeedCard = (props: any) => {
  const data = props.feedData;
  const navigate = useNavigate();
  const { LoginUserData } = useUser();
  const { groupId, keyword } = useParams();
  // const groupPk = LoginUserData.group.pk;

  return (
    <AspectRatio
      key={data.id ? data.id : data.pk}
      width="31.33%"
      margin="1%"
      justifyContent="center"
      alignItems="center"
      ratio={9 / 10}
      onClick={() => {
        navigate(
          `/search/group_id/${groupId}/keyword/${keyword}/feedDetail/${data.id}`
        );
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
  );
};

export default MiniFeedCard;
