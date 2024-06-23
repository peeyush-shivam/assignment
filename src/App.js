import Navbar from "./components/Navbar";
import Flow from "./components/Flow";
import SideBar from "./components/SideBar";
import SettingsPanel from "./components/SettingsPanel";
import "./App.css";
import { useSelector } from "react-redux";

function App() {
  const { nodes, selectedNode } = useSelector((state) => state.flowData);
  const checkNodePresent = nodes.filter(
    // checks if node is present to toggle between nodes panel and settings panel
    (node) => node?.id === selectedNode?.id
  );
  return (
    <div className="main w-screen h-screen">
      <nav>
        <Navbar />
      </nav>
      <main className="w-full h-full flex">
        <Flow />
        {selectedNode && nodes.length > 0 && checkNodePresent.length > 0 ? (
          <SettingsPanel />
        ) : (
          <SideBar />
        )}
      </main>
    </div>
  );
}

export default App;
