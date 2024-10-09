'use client'
import { Card, CardBody, Button, Input, Textarea } from '@nextui-org/react';
import Link from 'next/link';

export default function ContactUs() {
  return (
    <div className="py-16   transition duration-300">
      <h2 className="text-center text-5xl font-extrabold text-gray-800 dark:text-white mb-10">
        Contact Us
      </h2>

      <div className="max-w-7xl mx-auto px-4">
        {/* Contact Form Section */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300  ">
          <CardBody>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              We’d love to hear from you!
            </h3>
            <form>
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                 
                  label="Full Name"
                  placeholder="Enter your name"
                  
                />
                <Input
                 
                  label="Email Address"
                  placeholder="Enter your email"
                  
                />
              </div>
              <div className="mt-4">
                <Textarea
                 
                  label="Message"
                  placeholder="Your message"
                  
                  rows={4}
                />
              </div>
              <div className="mt-6 text-center">
                <Button type="submit" size="lg" >
                  Send Message
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
     
        {/* Additional Information Section */}
        <div className="mt-10 text-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Other Ways to Reach Us
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            You can also connect with us via social media:
          </p>
          <Link href="#" className="text-blue-500 hover:underline">
            Facebook
          </Link>
          <span className="mx-2">|</span>
          <Link href="#" className="text-blue-500 hover:underline">
            Twitter
          </Link>
          <span className="mx-2">|</span>
          <Link href="#" className="text-blue-500 hover:underline">
            Instagram
          </Link>
        </div>
        <iframe
              title="Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345094235!2d144.96305781568016!3d-37.81410774201665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf0727c636bf870d7!2sFederation%20Square!5e0!3m2!1sen!2sbd!4v1641207999190!5m2!1sen!2sbd"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              className="rounded-lg shadow-md"
            ></iframe>
      </div>
    </div>
  );
}
