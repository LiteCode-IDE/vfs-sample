import {
  Breadcrumbs,
  FileExplorer,
  SearchInput,
  SearchResults,
  TabsList,
  getFileTree,
  updateFile,
  getSelectedFile,
} from "@litecode-ide/virtual-file-system";
import "@litecode-ide/virtual-file-system/dist/style.css";
import { useState } from "react";

function App() {
  const [value, setValue] = useState("");

  const updateFileContents = (e) => {
    setValue(e.target.value);
    updateFile(getSelectedFile(), e.target.value);
  };

  const getFileContents = (id?: string) => {
    const newID = getSelectedFile();
    if (!id) {
      id = newID;
    }
    return Object.values(getFileTree()).find(({ id: _id }) => _id === id)
      .content;
  };

  return (
    <div className="flex h-screen w-screen overflow-clip">
      <div className="flex flex-col h-full w-1/4">
        <SearchInput />
        <FileExplorer
          validExtensions={["js", "vite", "html"]}
          onItemSelected={(item) => {
            if (item.type === "file") {
              setValue(getFileContents(item.id));
              console.log("VVV", value);
            }
          }}
        />
      </div>
      <div className="flex flex-col h-full w-1/2">
        <TabsList
          onTabClick={(id: string) => setValue(getFileContents(id))}
          onTabClose={() => setValue(getFileContents())}
        />
        <Breadcrumbs
          onBreadcrumbFileClick={(id: string) => setValue(getFileContents(id))}
        />
        Here is a text area which will be used to edit the contents of the
        opened file
        <textarea
          onInput={updateFileContents}
          value={value}
          className="border"
          cols={30}
          rows={10}
        />
      </div>
      <div className="flex flex-col h-full w-1/4">
        <SearchResults searchResultClicked={(id: string, line: number) => setValue(getFileContents(id))}/>
      </div>
    </div>
  );
}

export default App;
