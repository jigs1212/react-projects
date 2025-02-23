import "./App.css";
import TreeView from "./components/TreeView";
import {
  FileExplorerContextProvider,
  useFileExplorerContext,
} from "./contexts/FileExplorerContext";

function AppContent() {
  const { treeViewData } = useFileExplorerContext();

  return (
    <>
      <h1>File tree structure</h1>
      <p>File tree structure in react.</p>
      <TreeView tree={treeViewData} />
    </>
  );
}

function App() {
  return (
    <FileExplorerContextProvider>
      <AppContent />
    </FileExplorerContextProvider>
  );
}

// function App() {
//   const { treeViewData } = useFileExplorerContext();

//   return (
//     <>
//       <FileExplorerContextProvider>
//         <h1>File tree structure</h1>
//         <p>File tree structure in react.</p>
//         <TreeView tree={treeViewData} />
//       </FileExplorerContextProvider>
//     </>
//   );
// }

export default App;
