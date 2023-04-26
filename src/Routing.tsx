import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "pages/SignUp/SignUp";
import Main from "./pages/main/Main";
import UploadFeed from "./components/form/feed/UploadFeed";
import MsgRoom from "./pages/sendletters/MsgRoom";
import Mailbox from "./pages/sendletters/Mailbox";
import Layout from "./UI/Layout";
import Feed from "./pages/main/Feed";
import WrittenPost from "components/mypages/tabMenu/WrittenPost";
import LikedPost from "components/mypages/tabMenu/LikedPost";
import MyPage from "pages/mypage/MyPage";
import WrittenComment from "components/mypages/tabMenu/WrittenComment";
import Profile from "components/mypages/myProfile/Profiles";
import Login from "components/form/User/Login";
import SignUpForm from "components/form/User/SignUpForm";
import SignUpMain from "pages/SignUp/SignUpMain";
import SignUpFormManager from "components/form/User/SignUpFormManager";
import Landing from "UI/landing/Landing";
import useUser from "components/form/User/Hook/useUser";
import NotFound from "pages/notFound/NotFound";
import ManagerProfiles from "components/mypages/myProfile/ManagerProfiles";

import Home from "pages/main/Home";
import FeedDetail from "pages/main/FeedDetail";
import MobileMsg from "pages/sendletters/MobileMsg";

const Routing = () => {
  const { LoginUserData } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        {LoginUserData ? (
          <>
            {/* <Route path="/landing" element={<Landing />} /> */}
            <Route path="/" element={<Layout />}>
              <Route path="home" element={<Home />} />
              <Route path=":pk/category/:id" element={<Feed />}>
                <Route path="feedDetail/:feedId" element={<FeedDetail />} />
              </Route>

              <Route path="letterlist/mobile/:chatId" element={<MobileMsg />} />
              <Route path="letterlist/" element={<Mailbox />}>
                <Route path={":chatId/"} element={<MsgRoom />} />
              </Route>
              {/* 내정보 */}
              <Route path="mypage/:type" element={<MyPage />}>
                {/* 작성글, 작성댓글, 댓글단 글,  좋아요한 글, 삭제한 글 */}
              </Route>
              <Route path="upload" element={<UploadFeed />} />
            </Route>
          </>
        ) : (
          <>
            <Route path="/main" element={<Main />} />
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup/" element={<SignUp />}>
              <Route path="main" element={<SignUpMain />} />
              <Route path="student" element={<SignUpForm />} />
              <Route path="manager" element={<SignUpFormManager />} />
            </Route>
          </>
        )}

        {/* notfound */}
        {/* <Route path="/*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
