import { AppRoute, AuthStatus } from '../../const';
import { Navigate } from 'react-router-dom';
import LoginScreen from '../../pages/login-screen/login-screen';

type PrivateRouteProps = {
  authStatus: AuthStatus;
  children: JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authStatus, children} = props;
  if (children.type === LoginScreen) {
    return (
      authStatus === AuthStatus.Auth ? <Navigate to={AppRoute.Root} /> : children
    );
  }

  return (
    authStatus === AuthStatus.Auth ? children : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
