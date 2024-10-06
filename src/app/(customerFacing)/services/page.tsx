
import ContactForm from "@/components/ContactForm";
import ServiceExample from "@/components/ServiceExample";
import ServiceGrid from "@/components/ServicesGrid";

export default function Service() {
  return (
    <div style={{ padding: '20px' }}>
      {/* <div className=""></div> */}
        <h1 className="text-2xl lg:text-4xl font-semibold text-center mb-8 "> Our Services</h1>
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill), minmax(200px, 1fr))',
            gap: '20px'
        }}>
      {/* <h1 className='text-2xl lg:text-4xl font-semibold text-center mb-8 '>Work History</h1> */}
      <ServiceExample/>

      <ServiceGrid />

        </div>
          <div className="container mx-auto mt-8">
            <h1 className="text-4xl font-semibold text-center mb-8">Contact Us</h1>
            <p className="text-center text-lg mb-8">We would love to hear from you. Please fill out the form below to get in touch.</p>
            <ContactForm />
          </div>
        </div>
  );
};

