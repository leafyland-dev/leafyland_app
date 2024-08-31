import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //     remotePatterns:[
    //         {
    //         protocol:"https",
    //         hostname: "lh3.googleusercontent.com",
    //         port: "",
    //         pathname: "/a/**"
    //     }
    // ]
    // },
    images: {
        domains: ['files.edgestore.dev']
    }
};

export default nextConfig;
