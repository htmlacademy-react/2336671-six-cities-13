import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import LoginScreen from './login-screen';

describe('Component: Login Screen', () => {
  it('Should render correct', () => {
    const loginElementId = 'emailElement';
    const passwordElement = 'passwordElement';

    const { withStoreComponent } = withStore(<LoginScreen />);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(loginElementId)).toBeInTheDocument();
    expect(screen.getByTestId(passwordElement)).toBeInTheDocument();
  });
});
