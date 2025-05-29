import React, { useEffect, useRef } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

export default function PopupTemplate({header, description, id, idseller, type, itemName}) {
  const toast = useRef(null);

  const handleNegociar = async () => {
    const idsender = sessionStorage.getItem("id");
    const idreceiver = idseller;

    const payload = {
      idsender: idsender,
      idreceiver: idreceiver,
      date: new Date().toISOString(),
      message: `Ola, é possivel negociar o preço do artigo ${itemName}`,
    };

    try {
      await fetch("https://xuoapi.azurewebsites.net/api/v1/newMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
    }
  };

  const accept = () => {
    if (type == "buy"){
    fetch("https://xuoapi.azurewebsites.net/api/v1/buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idBuyer: sessionStorage.getItem("id"),
        idItem: id
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Success:", data);
    })
    .catch(error => {
      console.error("Error:", error);
    });
  }else{
    handleNegociar()
  }

    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have accepted",
      life: 3000,
    });
  };

  useEffect(() => {
    confirm1();
  }, []);

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const confirm1 = () => {
    confirmDialog({
      message: description,
      header: header,
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept,
      reject,
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
    </>
  );
}
