// import { hostname } from 'os';

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     // images: {
//     //     remotePatterns:[
//     //         {
//     //         protocol:"https",
//     //         hostname: "lh3.googleusercontent.com",
//     //         port: "",
//     //         pathname: "/a/**"
//     //     }
//     // ]
//     // },
//     images: {
//         domains: ['files.edgestore.dev', 'gardengram.in'],
        
//     },
//     images: {
//         remotePatterns: [
//           {
//             protocol: 'https',
//             hostname: 'res.cloudinary.com',
//           },
//         ],
//       },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['files.edgestore.dev', 'gardengram.in'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
    },
};

export default nextConfig;
