import React, {lazy, Suspense} from "react";

// import {
//     createBrowserRouter,
//     Link,
//     Outlet,
//     RouterProvider,
// } from "react-router-dom";
import Home from "./pages/Home";

import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
const About = lazy(() => import('./pages/About'));


// const router = createBrowserRouter([
//     {
//         path: "/",
//         Component: Layout,
//         children: [
//             {
//                 index: true,
//                 Component: Home,
//             },
//             {
//                 path: 'about',
//                 Component: About
//             }
//         ]
//     }
// ])

// export function Layout() {
//     return (
//         <>
//             <nav>
//                 <ul>
//                     <li>
//                         <Link to="/">Home</Link>
//                     </li>
//                     <li>
//                         <Link to="/about">About</Link>
//                     </li>
//                 </ul>
//             </nav>
            
//             <Outlet />
//         </>
//     );
// }

// function App() {
//     return (
//         <div className="App">
//             <div className="App-header">
//                 {/* <nav>
//                 <Link to="/" >Home</Link>
//                 <Link to="/about" >About</Link>
//             </nav> */}
//                 sds

//             </div>
//         </div>
//     );
// }

// export function Fallback() {
//     return <p>Performing initial data load</p>;
// }

// function App() {
//     return <RouterProvider router={router} fallbackElement={<Fallback />} />;
// }

function App() {
    return  <Router basename={window.__POWERED_BY_QIANKUN__ ? '/react' : '/'}>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
        </nav>
        <Suspense fallback={null}>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />
            </Switch>
        </Suspense>
    </Router>
}

export default App;
