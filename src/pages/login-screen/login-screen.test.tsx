import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import userEvent from '@testing-library/user-event';
import LoginScreen from './login-screen';
import { AuthStatus } from '../../const';

describe('Component: Login Screen', () => {

  const initialStore = {
    USER: {
      authStatus: AuthStatus.NoAuth,
      userInfo: null
    }
  };

  it('Should render correct', () => {
    const loginElementId = 'emailElement';
    const passwordElement = 'passwordElement';

    const { withStoreComponent } = withStore(<LoginScreen />, initialStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(loginElementId)).toBeInTheDocument();
    expect(screen.getByTestId(passwordElement)).toBeInTheDocument();
  });

  it('Should render correctly when user enter login and password', async () => {
    const loginElementTestId = 'emailElement';
    const passwordElementTestId = 'passwordElement';
    const expectedLoginValue = 'test@test.ru';
    const expectedPasswordValue = '1111';
    const { withStoreComponent } = withStore(<LoginScreen />, initialStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId(loginElementTestId),
      expectedLoginValue,
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue,
    );

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });
});
