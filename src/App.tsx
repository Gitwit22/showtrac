import { useState } from "react";
import ProjectListPage from "./pages/ProjectListPage";
import SplashScreen from "./components/SplashScreen";

export default function App() {
  const [showSplash, setShowSplash] = useState(() => sessionStorage.getItem("splash:seen") === "1" ? false : true);

  if (showSplash) {
    return (
      <SplashScreen
        onDone={() => {
          try { sessionStorage.setItem("splash:seen", "1"); } catch {}
          setShowSplash(false);
        }}
      />
    );
  }

  return <ProjectListPage />;
}
