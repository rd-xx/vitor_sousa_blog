const config = {
  security: {
    session: {
      cookie: {
        key: "sessionJwt",
        secure: process.env.NODE_ENV !== "development",
      },
    },
  },
}

export default config
