/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse } from "msw";

interface UserType {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
};

interface SessionType {
  sessionId: string;
  token: string;
}

const users: UserType[] = [];
const sessions: SessionType[] = [];

const generateToken = () => crypto.randomUUID();

const findUserByEmail = (email: string) => {
  return users.find((user) => user.email === email);
};

const findUserById = (id: string) => {
  return users.find((user: UserType) => user.id === id)
}

const findSessionByToken = (token: string) => {
  return sessions.find((session: SessionType) => session.token === token)
};



export const handlers = [
  // Register New User
  http.post('/api/signup', async ({ request }) => {
    const { name, username, email, password }: any = await request.json();

    if (!name || !email || !password) {
      return HttpResponse.json(
        { message: "Name and email and password are required" },
        { status: 400 }
      );
    }

    if (findUserByEmail(email)) {
      return HttpResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    const newUser: UserType = {
      id: crypto.randomUUID(),
      name,
      username,
      email,
      password
    }
    users.push(newUser);

    const token = generateToken();
    sessions.push({ sessionId: newUser.id, token });

    return HttpResponse.json(
      {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        }
      },
      {
        status: 201,
        headers: {
          'Set-Cookie': `session=${token}; Path=/; HttpOnly`
        }
      }
    )
  }),

  // Login User
  http.post('/api/login', async ({ request }) => {
    const { email, password }: any = await request.json();
    const user = findUserByEmail(email);

    if (!user || password !== user.password) {
      return HttpResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const token = generateToken();
    sessions.push({ sessionId: user.id, token });

    return HttpResponse.json(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      },
      {
        status: 200,
        headers: {
          'Set-Cookie': `session=${token}; Path=/; HttpOnly`
        }
      }
    )
  }),

  // Current User
  http.get('/api/me', async ({ cookies }) => {
    const sessionToken = cookies.session;

    const session = findSessionByToken(sessionToken);
    if (!session) {
      return new HttpResponse(null, { status: 401 });
    }

    const user = findUserById(session.sessionId);
    if (!user) {
      return new HttpResponse(null, { status: 401 });
    }

    return HttpResponse.json({
      id: user.id,
      name: user.name,
      email: user.email
    });
  }),

  // Logout User
  http.post('api/logout', async ({ cookies }) => {
    const sessionToken = cookies.session;

    if (sessionToken) {
      const sessionIndex = sessions.findIndex(s => s.token === sessionToken)
      if (sessionIndex !== -1) sessions.splice(sessionIndex, 1);
    }

    return new HttpResponse(null, {
      status: 204,
      headers: {
        'Set-Cookie': 'session=; Path=/; Max-Age=0; HttpOnly',
      }
    })

  }),

]