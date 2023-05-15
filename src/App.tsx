import React from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { Home } from './Home/Home';

function App() {

  const Layout = () => {
    return (
      <div>
        <Outlet/>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children: [
        {
          path: '/',
          element: <Home/>
        }
      ]
    }
  ])

  return (
    <div className="App">
    <RouterProvider router={router} />
    </div>
  );
}

export default App;
