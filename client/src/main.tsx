import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Import Boxicons CSS
const boxiconsLink = document.createElement("link");
boxiconsLink.href = "https://cdn.jsdelivr.net/npm/boxicons@2.1.4/css/boxicons.min.css";
boxiconsLink.rel = "stylesheet";
document.head.appendChild(boxiconsLink);

// Import Google Fonts
const googleFontsLink = document.createElement("link");
googleFontsLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";
googleFontsLink.rel = "stylesheet";
document.head.appendChild(googleFontsLink);

createRoot(document.getElementById("root")!).render(<App />);
