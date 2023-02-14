const errorHandler = async ({ next }) => {
  try {
    return await next();
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
};


const guardByBasicAuth = async ({ next, request, env }) => {
  // Check header
  if (!request.headers.has("Authorization")) {
    return new Response(
      "You need to login.",
      {
        status: 401,
        headers: {
          // Prompts the user for credentials.
          'WWW-Authenticate': 'Basic realm="Input username and password"',
        },
      });
  };
  // Decode header value
  const [scheme, encoded] = request.headers.get("Authorization").split(' ');
  if (!encoded || scheme !== 'Basic') {
    return new Response(
      "Malformed authorization header.",
      {
        status: 400,
      }
    );
  }
  const buffer = Uint8Array.from(atob(encoded), character => character.charCodeAt(0));
  const decoded = new TextDecoder().decode(buffer).normalize();
  const index = decoded.indexOf(":");
  if (index === -1 || /[\0-\x1F\x7F]/.test(decoded)) {
    return new Response(
      "Invalid authorization value.",
      {
        status: 400,
      }
    );
  }
  const credentials = {
    username: env.BASIC_USERNAME,
    password: env.BASIC_PASSWORD,
  };
  // Verify credentials
  const username = decoded.substring(0, index);
  const password = decoded.substring(index + 1);
  if (username !== credentials.username || password !== credentials.password) {
    return new Response(
      "Invalid username or password.",
      {
        status: 401,
      }
    );
  }
  return await next();
};

export const onRequest = [errorHandler, guardByBasicAuth];