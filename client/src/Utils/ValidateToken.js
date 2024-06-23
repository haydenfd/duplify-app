export const validateToken = () => {
  let duplify_token = localStorage.getItem("duplify_token");

  if (!duplify_token) return null;

  duplify_token = JSON.parse(duplify_token);
  const expiration_time = duplify_token.expiration_time;
  const current_time = new Date().getTime();

  if (current_time > expiration_time) {
    return null;
  }

  return duplify_token.token;
};
