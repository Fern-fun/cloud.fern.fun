import React from "react";
import FileInput from "../components/FileInput/FileInput";
const FileContainer = React.lazy(
  () => import("../components/FileContainer/FileContainer")
);

function Home() {
  const [file, setFile] = React.useState<File>();
  const [reload, setReload] = React.useState<boolean>(false);

  const uploadFileHandler = async () => {
    console.log(file);
    if (file !== null && file !== undefined) {
      const formData = new FormData();
      formData.append("file", file);
      fetch(
        `https://api.fern.fun/cloud/upload/${localStorage.getItem(
          "username"
        )}/${localStorage.getItem("session")}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "text/html",
          },
        }
      );
      setReload((e) => !e);
    }
  };

  return (
    <div>
      <div>
        <h1>Home</h1>
        <FileInput setFile={setFile} />
        {file ? <button onClick={uploadFileHandler}>Upload</button> : null}
      </div>
      <FileContainer reload={true} />
    </div>
  );
}

export default Home;
