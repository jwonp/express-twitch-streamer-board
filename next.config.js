module.exports = {
  images: {
    domains: ["static-cdn.jtvnw.net", "localhost", "via.placeholder.com"],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async rewrites() {
    return [
      {
        source: "/websocket/:path*",
        destination: `http://localhost:4000/:path*`,
      },
    ];
  },
};
