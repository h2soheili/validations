import React, { useState } from "react";
import { UXIDIcon, UXIDSnackbar } from "@uxid/components";

function CopyToClipboard({ text, btnTtitle }) {
  const [showSnackBars, setShowSnackBars] = useState(false);

  const copyToClipboard = () => {
    let textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    setShowSnackBars(!showSnackBars);
  };

  return (
    <div className="copypaste-uxid">
      <UXIDIcon icon="copy" onClick={copyToClipboard} />
      {showSnackBars && (
        <UXIDSnackbar
          className="snakbar-uxid"
          message={text}
          actionTitle={btnTtitle}
        ></UXIDSnackbar>
      )}
    </div>
  );
}

export default CopyToClipboard;
