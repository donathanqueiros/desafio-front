import { Alert, message } from "antd";

export default function useMessage() {
  const types = {
    INFO: "info",
    SUCESS: "success",
    WARNING: "warning",
    ERROR: "error",
  };

  function messageGeneric(mensagem, type) {
    message.open({
      content: (
        <>
          <Alert message={mensagem} type={type} showIcon />
        </>
      ),
      icon: "",
      duration: 4,
    });
  }

  const sucess = (mensagem) => {
    messageGeneric(mensagem, types.SUCESS);
  };

  const warning = (mensagem) => {
    messageGeneric(mensagem, types.WARNING);
  };

  const error = (mensagem) => {
    messageGeneric(mensagem, types.ERROR);
  };

  const info = (mensagem) => {
    messageGeneric(mensagem, types.INFO);
  };
  return {
    sucess: sucess,
    warning: warning,
    error: error,
    info: info,
  };
}
