import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LogoutButton from './LogoutButton';

test('logout button calls sign out handler', async () => {
  const handler = jest.fn();
  render(<LogoutButton onSignOut={handler} />);
  const button = screen.getByRole('button', { name: /log out/i });
  await userEvent.click(button);
  expect(handler).toHaveBeenCalledTimes(1);
});
