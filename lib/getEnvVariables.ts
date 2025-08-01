export const getEnvVariables = () => ({
  API_URL: process.env.NEXT_PUBLIC_LOCAL || "", // ahora sí coincide
});
