import { render, fireEvent } from '@testing-library/react';
import ThemeToggle from './ThemeToggle';

beforeEach(() => {
  localStorage.clear();
  document.body.className = '';
});

test('toggles inverted-theme class on click', () => {
  const { getByLabelText } = render(<ThemeToggle />);
  const btn = getByLabelText(/toggle color theme/i);
  expect(document.body.classList.contains('inverted-theme')).toBe(false);
  fireEvent.click(btn);
  expect(document.body.classList.contains('inverted-theme')).toBe(true);
  fireEvent.click(btn);
  expect(document.body.classList.contains('inverted-theme')).toBe(false);
});

test('initializes from localStorage', () => {
  localStorage.setItem('invertedTheme', 'true');
  const { unmount } = render(<ThemeToggle />);
  expect(document.body.classList.contains('inverted-theme')).toBe(true);
  unmount();
});
