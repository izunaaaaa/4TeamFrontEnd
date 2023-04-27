import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useToast } from "@chakra-ui/react";
import { postLetters } from "api/axios/axiosSetting";

export interface SendMsgData {
  receiver: number;
  text: string;
}

export const useSendMsg = (onClose: () => void) => {
  const { register, handleSubmit, reset } = useForm<SendMsgData>();

  const sendMutation = useMutation((data: { receiver: number; text: string }) =>
    postLetters(data)
  );

  const toast = useToast();

  const onSubmit = async (data: { receiver: number; text: string }) => {
    if (data.text.trim() === "") {
      toast({
        render: () => "내용을 입력해주세요",
      });
      return;
    }

    try {
      await sendMutation.mutateAsync({ ...data });
      reset();
      console.log("send", data);
      onClose();
    } catch (error) {
      console.error("send error", error);
    }
  };

  return { register, handleSubmit, onSubmit, reset };
};
