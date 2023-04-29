import { AspectRatio, Img } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

const MiniFeedCard = (props: any) => {
  const data = props.feedData;
  const navigate = useNavigate();

  return (
    <AspectRatio
      key={data.id ? data.id : data.pk}
      width="31.33%"
      margin="1%"
      justifyContent="center"
      alignItems="center"
      ratio={9 / 10}
      onClick={() => {
        navigate(`feedDetail/${data.id}`);
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
