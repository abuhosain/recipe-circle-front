"use client"
import { Card, CardBody, Button } from '@nextui-org/react';
import Link from 'next/link';

export default function AboutUs() {
  return (
    <div className="py-16   transition duration-300">
      <h2 className="text-center text-5xl font-extrabold text-gray-800 dark:text-white mb-10">
        About Us
      </h2>

      <div className="max-w-7xl mx-auto px-4">
        {/* Platform Mission Section */}
        <Card className="mb-10 shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-700">
          <CardBody>
            <div className="flex flex-col md:flex-row">
              <img
                src="https://t4.ftcdn.net/jpg/00/96/54/53/360_F_96545306_cX6N4Fv2TTVRMKahA3aoCvxlUOGm2KkV.jpg" // Replace with your mission image URL
                alt="Our Mission"
                className="w-full md:w-1/2 rounded-lg shadow-md object-cover h-64 md:h-48"
              />
              <div className="md:pl-6 flex flex-col justify-center">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  Our Mission
                </h3>
                <p className="mt-3 text-gray-600 dark:text-gray-300">
                  At Recipe Service, our mission is to bring people together through the joy of cooking.
                  We believe that everyone should have access to delicious recipes, and we aim to provide
                  a platform where culinary enthusiasts can share and discover new dishes from around the world.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Team Information Section */}
        <Card className="mb-10 shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-700">
          <CardBody>
            <div className="flex flex-col md:flex-row">
              <img
                src="https://web.s-cdn.boostkit.dev/webaction-files/590eaf4467962d794869f303_myteam/our_team-1-64158e683f70e659c3e92504.png" // Replace with your team image URL
                alt="Our Team"
                className="w-full md:w-1/2 rounded-lg shadow-md object-cover h-64 md:h-48"
              />
              <div className="md:pl-6 flex flex-col justify-center">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  Our Team
                </h3>
                <p className="mt-3 text-gray-600 dark:text-gray-300">
                  Our team consists of passionate food lovers, professional chefs, and dedicated home cooks
                  who work tirelessly to curate the best recipes and cooking tips for our community.
                  Together, we strive to inspire creativity in the kitchen and promote a love for cooking
                  that spans generations.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Invitation to Join Section */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-700">
          <CardBody>
            <div className="flex flex-col md:flex-row">
              <img
                src="https://img.freepik.com/free-vector/flat-design-join-us-message_23-2148954904.jpg" // Replace with your invitation image URL
                alt="Join Us"
                className="w-full md:w-1/2 rounded-lg shadow-md object-cover h-64 md:h-48"
              />
              <div className="md:pl-6 flex flex-col justify-center">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  Join Us
                </h3>
                <p className="mt-3 text-gray-600 dark:text-gray-300">
                  We invite you to explore our collection of recipes, contribute your own, and become part
                  of our vibrant community. Whether you're a beginner or a seasoned chef, there’s something
                  for everyone at Recipe Service!
                </p>
                <div className="mt-5 text-center">
                  <Link href="/" passHref>
                    <Button size="lg" >
                      Explore Recipes
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
