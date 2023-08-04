import { MouseEvent, createContext, useContext, useState } from "react";

export { Route, Router, Link };

const RouterContext = createContext<{
  currentPath?: string;
  handlePathChange?: (v: string) => void;
}>({
  currentPath: undefined,
  handlePathChange: undefined,
});

function Router({ children }: { children: React.ReactNode }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  function handlePathChange(path: string) {
    setCurrentPath(path);
    window.history.pushState({}, "", path);
  }

  const contextValue = {
    currentPath,
    handlePathChange,
  };

  return (
    <RouterContext.Provider value={contextValue}>
      {children}
    </RouterContext.Provider>
  );
}

function Route({
  path,
  children,
}: {
  path: string;
  children: React.ReactNode;
}) {
  const { currentPath } = useContext(RouterContext);
  return currentPath === path ? children : null;
}

function Link({ to, children }: { to: string; children: React.ReactNode }) {
  const { handlePathChange } = useContext(RouterContext);

  function handleClick(e: MouseEvent) {
    e.preventDefault();
    handlePathChange?.(to);
  }

  return (
    <div style={{ color: "blue", cursor: "pointer" }}>
      <a href={to} onClick={handleClick}>
        {children}
      </a>
    </div>
  );
}
