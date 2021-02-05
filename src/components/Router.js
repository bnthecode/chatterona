import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "../pages/Login";
import Main from "../pages/Main";
import MobileLanding from "../pages/MobileLanding";
import history from "../redux/history";
import { determineMobile } from "../utilities";
const onMobile = determineMobile();
const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const isLoggedIn = user && user.uid;
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to={onMobile ? '/mobile-landing' : '/login'} />
      }
    />
  );
};


const AppRouter = ({ user }) => {
  return (
    <Router history={history}>
    <PrivateRoute exact path="/" user={user} component={Main} />
    <Route exact path="/mobile-landing" component={MobileLanding} />
    <Route exact path="/login" component={Login} />
  </Router>
);
};

export default AppRouter;
