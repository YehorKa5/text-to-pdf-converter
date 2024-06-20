import React from "react";

interface TextInputProps {
  text: string;
  setText: (text: string) => void;
}

function TextInput({ text, setText }: TextInputProps) {
  return (
    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      className="w-full h-32 p-2 border rounded"
      placeholder="Введіть текст тут..."
    />
  );
}

export default TextInput;
