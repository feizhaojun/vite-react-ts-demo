import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
// 路由
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
// import Root from './routes/root'
import GoogleMap from './routes/google-map';
// import Contact from "./routes/contact"
// import G2 from './routes/g2'
// import ECharts from './routes/echarts'
// import MyCanvas from './routes/my-canvas'
// import List from './routes/list'
import ErrorPage from './error-page'

const router = createBrowserRouter([
  {
    path: "/",
    element: <GoogleMap />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/google-map/",
    element: <GoogleMap />,
    errorElement: <ErrorPage />,
  },
  // {
  //   path: "g2",
  //   element: <G2 />,
  // },
  // {
  //   path: "echarts",
  //   element: <ECharts />,
  // },
  // {
  //   path: "my-canvas",
  //   element: <MyCanvas />,
  // },
  // {
  //   path: "list",
  //   element: <List />,
  // },
  // {
  //   path: "contacts/:contactId",
  //   element: <Contact />,
  // },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
