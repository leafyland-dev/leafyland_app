import Image from 'next/image';
import { FC } from 'react';
import { FaTree, FaHome, FaBuilding, FaHardHat, FaLeaf, FaTools, FaPencilRuler, FaFire, FaProjectDiagram, FaWater } from 'react-icons/fa';


interface Service {
  name: string;
  icon: JSX.Element;
}

export const Services: Service[] = [
  { name: "Landscaping", icon: <FaTree size={32} /> },
  { name: "Cottage House", icon: <FaHome size={32} /> },
  { name: "Farm House Design", icon: <FaBuilding size={32} /> },
  { name: "Civil Works", icon: <FaHardHat size={32} /> },
  { name: "Garden Development", icon: <FaLeaf size={32} /> },
  { name: "Maintenance Service", icon: <FaTools size={32} /> },
  { name: "Architecture Design and Drawing", icon: <FaPencilRuler size={32} /> },
  { name: "Fire Pit Development", icon: <FaFire size={32} /> },
  { name: "Project Development", icon: <FaProjectDiagram size={32} /> },
  { name: "Landscape Architecture", icon: <FaPencilRuler size={32} /> },
  { name: "Waterscaping Development", icon: <FaWater size={32} /> },
];

const ServiceGrid: FC = () => {
  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 2fr))',
        gap: '20px'
      }}>
        {Services.map((service, index) => (
          <div key={index} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            textAlign: 'center',
            backgroundColor: '#f9f9f9',
          }}>
            <div style={{ marginBottom: '10px' }}>
              {service.icon}
            </div>
            <div>{service.name}</div>
          </div>
        ))}
    </div>
    <Customers/>
    </>
  );
};


function Customers(){
  const images = [
    '/client1.png',
    '/client2.png',
    '/client3.png',
    '/client4.png',
    '/client5.png',
    '/client6.png',
    '/client7.png',
    '/client8.png',
    '/client9.png'
  ]
  return(
    <>
    <div className='mt-20 space-y-2 text-3xl'>
      <h1 className='text-2xl lg:text-4xl font-semibold text-center mb-8 '>Our Clients</h1>
    </div>
    <div className='grid grid-cols-4 lg:grid-cols-4 gap-3'>
    {/* {images.map((src,index) =>( */}
      {/* <div key={index} className='relative'> */}
        <Image src='/client1.png' alt='image' width="150" height="150"/>
        <Image src='/client2.png' alt='image' width="300" height="300"/>
        {/* <Image src='/client3.png' alt='image' width="100" height="100"/> */}
        <Image src='/client4.png' alt='image' width="200" height="200"/>
        <Image src='/client5.png' alt='image' width="300" height="300"/>
        <Image src='/client6.png' alt='image' width="200" height="200"/>
        <Image src='/client7.png' alt='image' width="100" height="100"/>
        <Image src='/client8.png' alt='image' width="150" height="150"/>
        <Image src='/client9.png' alt='image' width="200" height="200"/>
      </div>
    {/* )) */}
    {/* } */}
    {/* </div> */}

    
    </>
  )
}

export default ServiceGrid;
