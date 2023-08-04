import { Route, Router, Link } from "./components/Router";

export default function App() {
  return (
    <div>
      测试路由
      <Router>
        <div style={{ padding: "16px 0" }}>
          <Link to={"/home"}>home</Link>
          <Link to={"/about"}>about</Link>
          <Link to={"/help"}>help</Link>
        </div>

        <div style={{ border: "1px solid #e8e8e8", marginBottom: 16 }} />
        <Route path="/home">
          <h1>Home页面</h1>
        </Route>
        <Route path="/about">
          <h3>About页面</h3>
        </Route>
        <Route path="/help">
          <h5>Help页面</h5>
        </Route>
      </Router>
    </div>
  );
}
