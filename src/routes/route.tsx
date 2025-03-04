import App from "@/App";
import { Home, Users } from "@/pages";
import {
  DailyDuaEditPage,
  DailyDuaPage,
  DailyDuaPageAdd,
  HomeScreenPage, 
  JazakallahEditPage, 
  JazakallahPage, 
  NatureImagePage, 
  NatureImgAddPage, 
  NatureImgEditPage, 
  PositiveThinikingEditPage, 
  PositiveThinkingPage, 
  ShukrInspirationAddPage, 
  ShukrInspirationEditPage, 
  ShukrInsPirationPage, 
  ShukrPostAddPage, 
  ShukrPostEditPage, 
  ShukrPostPage, 
  StickyNoteAddPage, 
  StickyNoteEditPage, 
  StickyNotePage } from "@/pages/homeScreen";
import Login from "@/pages/Login";
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
        path: '/daily-dua/add',
        element: <DailyDuaPageAdd />
      },
      {
        path: '/daily-dua/edit/:id',
        element: <DailyDuaEditPage />
      },
      {
        path: '/shukr-post',
        element: <ShukrPostPage />
      },
      {
        path: '/shukr-post/add',
        element: <ShukrPostAddPage />
      },
      {
        path: '/shukr-post/edit/:id',
        element: <ShukrPostEditPage />
      },
      
      {
        path: '/shukr-ins',
        element: <ShukrInsPirationPage />
      },
      {
        path: '/shukr-ins/add',
        element: <ShukrInspirationAddPage />
      },
      {
        path: '/shukr-ins/edit/:id',
        element: <ShukrInspirationEditPage />
      },
      {
        path: '/nature-beauty',
        element: <NatureImagePage />
      },
      {
        path: '/nature-beauty/add',
        element: <NatureImgAddPage />
      },
      {
        path: '/nature-beauty/edit/:id',
        element: <NatureImgEditPage />
      },
      {
        path: '/positive-thinking',
        element: <PositiveThinkingPage />
      },
    
      {
        path: '/positive-thinking/edit/:id',
        element: <PositiveThinikingEditPage />
      },
      {
        path: '/sticky-notes',
        element: <StickyNotePage />
      },
      {
        path: '/sticky-notes/add',
        element: <StickyNoteAddPage />
      },
      {
        path: '/sticky-notes/edit/:id',
        element: <StickyNoteEditPage />
      },
      {
        path: '/jazakallah',
        element: <JazakallahPage />
      },
      {
        path: '/jazakallah/edit/:id',
        element: <JazakallahEditPage />
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