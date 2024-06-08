module.exports = {
  images: {
    unoptimized: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com'
      },
      {
        protocol: 'https',
        hostname: 'assets.digitalocean.com'
      },
      {
        protocol: 'https',
        hostname: 'miro.medium.com'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ]
  }
};
