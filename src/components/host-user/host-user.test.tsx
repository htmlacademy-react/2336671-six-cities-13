import { render, screen } from '@testing-library/react';
import { internet } from 'faker';
import HostUser from './host-user';

describe('Component: Host user', () => {
  it('Should render correct', () => {
    const fakeHostUser = {
      isPro: true,
      name: 'Dima',
      avatarUrl: internet.avatar(),
    };
    const hostUserTestId = 'host-user';

    render(<HostUser host={fakeHostUser} />);

    expect(screen.getByTestId(hostUserTestId)).toBeInTheDocument();
  });
});
