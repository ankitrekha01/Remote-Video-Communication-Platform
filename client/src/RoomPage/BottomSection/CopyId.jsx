import React, { useEffect } from "react";
import copy from "../../resources/images/copy.svg";

function CopyId({ roomId }) {
  useEffect(() => {
    document.getElementsByClassName("tooltiptext")[0].style.visibility =
      "visible";
    document.getElementsByClassName("tooltiptext")[0].style.opacity = "1";
    setTimeout(() => {
      document
        .getElementsByClassName("tooltiptext")[0]
        .removeAttribute("style");
    }, 3000);
  }, []);
  const handleCopyButtonPressed = () => {
    navigator.clipboard.writeText(roomId);
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied!!";
  };
  const handleOnMouseOut = () => {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy Link";
  };
  return (
    <div className="video_button_container tooltip">
      <img
        src={copy}
        className="video_button_image"
        onClick={handleCopyButtonPressed}
        onMouseOut={handleOnMouseOut}
      />
      <span className="tooltiptext" id="myTooltip">
        Copy Link
      </span>
    </div>
  );
}

export default CopyId;
