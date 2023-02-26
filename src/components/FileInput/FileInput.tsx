import React from "react";

import "./FileInput.scss";

type FileInputProps = {
  setFile: (file: File) => void;
};

const FileInput: React.FC<FileInputProps> = ({ setFile }) => {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files[0].size > 1.049e8) {
        alert("File size is too large");
        return;
      }
      setFile(e.target.files[0]);
    }
  };

  return (
    <>
      <label htmlFor="fileInput" className="fileInput">
        <input id="fileInput" type={"file"} onChange={handleFile} />
        <img src="/img/add.svg" alt="plus" />
        Add a file
      </label>
    </>
  );
};

export default FileInput;
