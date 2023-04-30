import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useToast } from "@chakra-ui/react";
import { postLetters } from "api/axios/axiosSetting";

export interface SendMsgData {
  receiver: number;
  text: string;
}

export const useSendMsg = (onClose: () => void, receiver: number) => {
  const { register, handleSubmit, reset } = useForm<{ text: string }>();

  const sendMutation = useMutation((data: SendMsgData) => postLetters(data));

  const toast = useToast();

  const onSubmit = async (data: { text: string }) => {
    if (data.text.trim() === "") {
      toast({
        render: () => "내용을 입력해주세요",
      });
      return;
    }

    try {
      await sendMutation.mutateAsync({ receiver, text: data.text });
      reset();
      console.log("send", { receiver, text: data.text });
      onClose();
    } catch (error) {
      console.error("send error", error);
    }
  };

  return { register, handleSubmit, onSubmit, reset };
};
