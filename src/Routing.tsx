import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "pages/SignUp/SignUp";
import UploadFeed from "./components/form/feed/UploadFeed";
import MsgRoom from "./pages/sendletters/MsgRoom";
import Mailbox from "./pages/sendletters/Mailbox";
import Layout from "./UI/Layout";
import MyPage from "pages/mypage/MyPage";
import Login from "components/form/User/Login";
import SignUpForm from "components/form/User/SignUpForm";
import SignUpMain from "pages/SignUp/SignUpMain";
import SignUpFormManager from "components/form/User/SignUpFormManager";
import Landing from "UI/landing/Landing";
import NotFound from "pages/notFound/NotFound";

import Home from "pages/main/Home";
import FeedDetail from "components/Feed/FeedDetail";
import MobileMsg from "pages/sendletters/MobileMsg";
import FindId from "components/form/User/FindId";
import FindPassword from "components/form/User/FindPassword";
import SearchFeed from "pages/searchPage/SearchFeed";
import FeedPage from "pages/main/FeedPage";

const Routing = () => {
  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       {LoginUserData ? (
  //         <>
  //           {/* <Route path="/landing" element={<Landing />} /> */}
  //           <Route path="/" element={<Layout />}>
  //             <Route path="home" element={<Home />} />
  //             <Route
  //               path="search/group_id/:groupId/keyword/:keyword"
  //               element={<SearchFeed />}
  //             >
  //               <Route path="feedDetail/:feedId" element={<FeedDetail />} />
  //             </Route>
  //             <Route path=":pk/category/:id" element={<Feed />}>
  //               <Route path="feedDetail/:feedId" element={<FeedDetail />} />
  //             </Route>
  //             <Route path="upload" element={<UploadFeed />} />

  //             <Route path="letterlist/mobile/:chatId" element={<MobileMsg />} />
  //             <Route path="letterlist/" element={<Mailbox />}>
  //               <Route path={":chatId/"} element={<MsgRoom />} />
  //             </Route>
  //             {/* 내정보 */}
  //             <Route path="mypage/:type" element={<MyPage />}>
  //               <Route path="feedDetail/:feedId" element={<FeedDetail />} />
  //             </Route>
  //           </Route>
  //         </>
  //       ) : (
  //         <>
  //           {/* <Route path="/main" element={<Main />} /> */}
  //           <Route path="/" element={<Landing />} />
  //           <Route path="findId" element={<FindId />} />
  //           <Route path="findPassword" element={<FindPassword />} />
  //           <Route path="/login" element={<Login />} />
  //           <Route path="/signup/" element={<SignUp />}>
  //             <Route path="main" element={<SignUpMain />} />
  //             <Route path="student" element={<SignUpForm />} />
  //             <Route path="manager" element={<SignUpFormManager />} />
  //           </Route>
  //         </>
  //       )}

  //       {/* notfound */}
  //       <Route path="/*" element={<NotFound />} />
  //     </Routes>
  //   </BrowserRouter>
  // );

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/landing" element={<Landing />} /> */}
        <Route path="/community" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route
            path="search/group_id/:groupId/keyword/:keyword"
            element={<SearchFeed />}
          >
            <Route path="feedDetail/:feedId" element={<FeedDetail />} />
          </Route>
          <Route path=":pk/category/:id" element={<FeedPage />}>
            <Route path="feedDetail/:feedId" element={<FeedDetail />} />
          </Route>
          <Route path="upload" element={<UploadFeed />} />

          <Route path="letterlist/mobile/:chatId" element={<MobileMsg />} />
          <Route path="letterlist/" element={<Mailbox />}>
            <Route path={":chatId/"} element={<MsgRoom />} />
          </Route>
          {/* 내정보 */}
          <Route path="mypage/:type" element={<MyPage />}>
            <Route path="feedDetail/:feedId" element={<FeedDetail />} />
          </Route>
        </Route>

        {/* <Route path="/main" element={<Main />} /> */}
        <Route path="/" element={<Landing />} />
        <Route path="findId" element={<FindId />} />
        <Route path="findPassword" element={<FindPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/" element={<SignUp />}>
          <Route path="main" element={<SignUpMain />} />
          <Route path="student" element={<SignUpForm />} />
          <Route path="manager" element={<SignUpFormManager />} />
        </Route>

        {/* notfound */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
