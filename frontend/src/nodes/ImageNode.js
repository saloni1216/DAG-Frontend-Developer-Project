import { useState } from "react";
import { BaseNode, nodeStyles } from "./BaseNode";

export const ImageNode = ({ id }) => {
  const [inputText, setInputText] = useState("");
  const [imageSrc, setImageSrc] = useState(null);

  const checkConditionAndShowImage = () => {
    const word = inputText.toLowerCase().trim();
    const assets = {
      flower: "/flower.gif",
      cat: "/cat.webp",
      panda: "oso-panda.gif",
      dog: "cute-dog.gif",
    };
    setImageSrc(assets[word] || null);
  };

  return (
    <BaseNode
      title="Image Generator"
      targetHandles={[{ id: `${id}-input` }]}
      sourceHandles={[{ id: `${id}-output` }]}
    >
      <label style={nodeStyles.label}>
        Image Input:
        <input
          style={nodeStyles.input}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="e.g. cat"
        />
      </label>
      <button style={nodeStyles.button} onClick={checkConditionAndShowImage}>
        Show Image
      </button>
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Result"
          style={{ width: "100%", marginTop: "10px" }}
        />
      )}
    </BaseNode>
  );
};
