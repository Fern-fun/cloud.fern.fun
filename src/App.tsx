import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./pages/Home";

function App() {
  const [token, setToken] = React.useState<string | null>(
    localStorage.getItem("session")
  );

  // Check if the user is logged in
  React.useEffect(() => {
    fetch(
      `https://api.fern.fun/fern/account/get/user/data/${localStorage.getItem(
        "username"
      )}/${localStorage.getItem("session")}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== "success") {
          localStorage.removeItem("session");
          localStorage.removeItem("username");
          setToken(null);
        }
      });
  }, []);

  if (!token)
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={<Login token={token} setToken={setToken} />}
          />
        </Routes>
      </BrowserRouter>
    );

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
