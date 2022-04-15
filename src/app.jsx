import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./home";
import { Boop } from "./boop";

export function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1 data-content="Boop!" className="rb">
          Boop!
        </h1>
        <nav aria-label="Primary">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/boop">Boop</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="boop" element={<Boop />} />
        </Routes>
      </main>
    </div>
  );
}
