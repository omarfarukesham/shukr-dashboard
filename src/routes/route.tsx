import App from "@/App";
import { Home, Users } from "@/pages";
import {
  DailyDuaPage, 
  HomeScreenPage, 
  NatureImagePage, 
  PositiveThinkingPage, 
  ShukrInsPirationPage, 
  ShukrPostPage, 
  StickyNotePage } from "@/pages/homeScreen";

import Login from "@/pages/Login";
// import ProductAdd from "@/pages/product/Product.add";
import ProductEdit from "@/pages/product/Product.edit";
import { AdminRoute, PrivateRoute } from "@/utils/PrivateRoute";
import { createBrowserRouter } from 'react-router-dom';


const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/home',
        element: <Home />
      },
      // {
      //   path: '/product',
      //   element:
      //   <PrivateRoute>
      //       <AdminRoute>
      //         <Product />
      //       </AdminRoute>
      //     </PrivateRoute>},
      // {
      //   path: '/product/add-product',
      //   element: (
      //     <PrivateRoute>
      //       <AdminRoute>
      //         <ProductAdd />
      //       </AdminRoute>
      //     </PrivateRoute>
      //   )
      // },
      {
        path: '/product/edit-product/:id',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ProductEdit />
            </AdminRoute>
          </PrivateRoute>
        )
      },
      {
        path: '/home-screen',
        element: <HomeScreenPage />
      },
      {
        path: '/daily-dua',
        element: <DailyDuaPage />
      },
      {
        path: '/shukr-post',
        element: <ShukrPostPage />
      },
      {
        path: '/shukr-ins',
        element: <ShukrInsPirationPage />
      },
      {
        path: '/nature-beauty',
        element: <NatureImagePage />
      },
      {
        path: '/positive-thinking',
        element: <PositiveThinkingPage />
      },
      {
        path: '/sticky-notes',
        element: <StickyNotePage />
      },
      {
        path: '/user',
        element: <Users />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
]);

export default routes;