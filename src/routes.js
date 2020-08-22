// Layout Types
import { DefaultLayout, LandingLayout } from "./layouts";
import withStorage from "./components/common/WithStorage";
// Route Views
import BlogOverview from "./views/BlogOverview";
import Education from "./views/Education";
import Cms from "./views/Cms";
import Alerts from "./views/Alerts";
import MemberBlogOverview from "./views/MemberBlogOverview";
import Profile from "./views/Profile";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import Landing from "./views/Landing";
import PostPage from "./views/Post";
import Success from "./views/Success";
import Analyst from "./views/Analyst";
import Analysts from "./views/Analysts";
import SignupLayout from "./layouts/SignupLayout";
import Login from "./views/Login";
import Forgot from "./views/Forgot";
import Register from "./views/Register";
import Prices from "./views/Prices";
import Terms from "./views/Terms";
import Policy from "./views/Policy";
import SearchResults from "./views/SearchResults";

export default [
  {
    path: "/",
    exact: true,
    layout: LandingLayout,
    component: Landing
  },
  {
    path: "/login",
    exact: true,
    layout: SignupLayout,
    component: Login
  },
  {
    path: "/forgot",
    exact: true,
    layout: SignupLayout,
    component: Forgot
  },
  {
    path: "/success",
    exact: true,
    layout: SignupLayout,
    component: Success
  },
  {
    path: "/register",
    exact: true,
    layout: SignupLayout,
    component: Register
  },
  {
    path: "/terms&conditions",
    exact: true,
    layout: SignupLayout,
    component: Terms
  },
  {
    path: "/policy",
    exact: true,
    layout: SignupLayout,
    component: Policy
  },
  {
    path: "/prices",
    exact: true,
    layout: SignupLayout,
    component: Prices
  },
  {
    path: "/public",
    exact: true,
    layout: DefaultLayout,
    component: withStorage(BlogOverview)
  },
  {
    path: "/search",
    exact: true,
    layout: DefaultLayout,
    component: withStorage(SearchResults)
  },
  {
    path: "/blogs/premium/",
    exact: true,
    layout: DefaultLayout,
    component: MemberBlogOverview
  },
  {
    path: "/video/:postName",
    exact: true,
    layout: DefaultLayout,
    component: PostPage
  },
  {
    path: "/blog/:postName",
    exact: true,
    layout: DefaultLayout,
    component: PostPage
  },
  {
    path: "/public/:postName",
    exact: true,
    layout: DefaultLayout,
    component: PostPage
  },
  {
    path: "/analyst/:id",
    exact: true,
    layout: DefaultLayout,
    component: Analyst
  },
  {
    path: "/analysts",
    exact: true,
    layout: DefaultLayout,
    component: Analysts
  },
  {
    path: "/education",
    exact: true,
    layout: DefaultLayout,
    component: Education
  },
  {
    path: "/alerts",
    exact: true,
    layout: DefaultLayout,
    component: Alerts
  },
  {
    path: "/user-profile",
    exact: true,
    layout: DefaultLayout,
    component: Profile
  },
  {
    path: "/add-new-post",
    exact: true,
    layout: DefaultLayout,
    component: withStorage(AddNewPost)
  },
  {
    path: "/edit-post/:postId",
    exact: true,
    layout: DefaultLayout,
    component: withStorage(AddNewPost)
  },
  {
    path: "/errors",
    exact: true,
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/cms",
    exact: true,
    layout: DefaultLayout,
    component: Cms
  },
];
