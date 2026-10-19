import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

import Cover from "./pages/cover";
import Gifts from "./pages/gifts";
import Message from "./pages/message";
import Songs from "./pages/songs";
import Memories from "./pages/memories";
import Photobooth from "./pages/photobooth";
import { FloatingHearts } from "./components/fx";

// Satu route per halaman di flow: cover -> gifts -> (message | songs | memories | photobooth)
const router = createBrowserRouter([
  { path: "/", element: <Cover /> },
  { path: "/gifts", element: <Gifts /> },
  { path: "/message", element: <Message /> },
  { path: "/songs", element: <Songs /> },
  { path: "/memories", element: <Memories /> },
  { path: "/photobooth", element: <Photobooth /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FloatingHearts />
    <RouterProvider router={router} />
  </StrictMode>,
);
