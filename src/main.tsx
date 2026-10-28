import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Root from "@/app/Root";
import { initTheme } from "@/app/theme";
import "@/styles/fonts.css";
import "@/styles/styles.css";
import "@/styles/pages.css";
import "@/styles/tw.css";
import "@/features/invitation/styles/invitation.generated.css";
import "@/features/invitation/components/generated/headers.css";

initTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
