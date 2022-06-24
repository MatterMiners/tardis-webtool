import LoginWidget from '@/components/LoginWidget.vue';
import { useUsers } from '@/store/userStore';
import { render, screen, fireEvent } from '@testing-library/vue';
import { createTestingPinia } from '@pinia/testing';
import { AxiosError } from 'axios';

const pinia = createTestingPinia({});
const loginStore = useUsers(pinia);

describe('LoginWidget', () => {
  beforeEach(() => {
    render(LoginWidget);
    loginStore.$reset();
  });

  test('renders correctly', () => {
    // Header 'Login' is present as some form of header
    expect(screen.getAllByText(/login/i)[0].nodeName).toMatch(/h\d/i);
    // password, username inputs are present
    const inputs = screen.getAllByRole('searchbox');
    expect(inputs[0].getAttribute('placeholder')).toMatch(/username/i);
    expect(inputs[1].getAttribute('placeholder')).toMatch(/password/i);
    // login button is present
    expect(screen.getByRole('button', { name: /login/i })).toBeTruthy();
  });

  test('login button works (no errors)', async () => {
    await login('foo', 'bar');
    expect(loginStore.login).toHaveBeenCalledWith('foo', 'bar');
    expect(screen.queryByPlaceholderText(/password/i)?.nodeValue).toBeFalsy();
  });

  test('login button works (with generic error)', async () => {
    loginStore.login = async () => {
      throw new Error('failed login');
    };
    await login('foo', 'bar');
    expect(screen.getByText('failed login')).toBeTruthy();
  });

  test('login button works (with axios error)', async () => {
    loginStore.login = async () => {
      throw new AxiosError('test', AxiosError.ECONNABORTED);
    };

    await login('foo', 'bar');
    expect(screen.getByText(/connection timed out/i)).toBeTruthy();
  });

  test('login button disabled when credentials empty', async () => {
    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton.getAttribute('disabled')).toBe('true');
    await enterCredentials('foo', '');
    expect(loginButton.getAttribute('disabled')).toBe('true');
    await enterCredentials('', 'bar');
    expect(loginButton.getAttribute('disabled')).toBe('true');
    await enterCredentials('foo', 'bar');
    expect(loginButton.getAttribute('disabled')).toBe('false');
  });
});

async function login(username: string, password: string) {
  await enterCredentials(username, password);
  const loginButton = screen.getByRole('button', { name: /login/i });
  await fireEvent.click(loginButton);
}

async function enterCredentials(username: string, password: string) {
  const usernameInput = screen.queryByPlaceholderText(/username/i);
  const passwordInput = screen.queryByPlaceholderText(/password/i);
  await fireEvent.update(usernameInput!, username);
  await fireEvent.update(passwordInput!, password);
}
