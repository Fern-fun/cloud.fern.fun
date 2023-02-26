import React from "react";

function FileContainer() {
  const [files, setFiles] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch(
      `https://api.fern.fun/cloud/get/${localStorage.getItem(
        "username"
      )}/${localStorage.getItem("session")}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFiles(data.data);
      });
  }, []);

  return (
    <div className="filesContainer">
      {files.map((item) => (
        <div key={item.id}>
          {item.name}
          <a
            href={`https://api.fern.fun/cloud/download/${
              item.id
            }?username=${localStorage.getItem(
              "username"
            )}&session=${localStorage.getItem("session")}`}
          >
            Download
          </a>
        </div>
      ))}
    </div>
  );
}

export default FileContainer;
