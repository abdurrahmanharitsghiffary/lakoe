import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Typography } from "@/components/ui/typography";
  
  export function AboutUs() {
    return (
      <div className="py-16">
        <Typography variant={"h2"} className="text-center text-3xl font-bold mb-12 border-none">
          About Us
        </Typography>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          <Card className="p-6 shadow-lg rounded-lg bg-white">
            <CardHeader>
              <Typography variant={"h3"} className="text-xl font-semibold mb-2">
                Our Mission
              </Typography>
            </CardHeader>
            <CardContent>
              <CardDescription>
                At our company, we strive to deliver exceptional products and services that meet the highest standards of quality and innovation. Our mission is to empower our customers by providing them with solutions that enhance their lives and businesses.
              </CardDescription>
            </CardContent>
          </Card>
  
          <Card className="p-6 shadow-lg rounded-lg bg-white">
            <CardHeader>
              <Typography variant={"h3"} className="text-xl font-semibold mb-2">
                Our Vision
              </Typography>
            </CardHeader>
            <CardContent>
              <CardDescription>
                We envision a world where our products and services are integral to everyday life, driving progress and creating meaningful impact. Our vision is to be a global leader in our industry, recognized for our commitment to excellence and customer satisfaction.
              </CardDescription>
            </CardContent>
          </Card>
  
          <Card className="p-6 shadow-lg rounded-lg bg-white">
            <CardHeader>
              <Typography variant={"h3"} className="text-xl font-semibold mb-2">
                Our Values
              </Typography>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Integrity, innovation, and customer-centricity are at the core of everything we do. We value transparency, creativity, and teamwork, and we are dedicated to fostering a culture of continuous improvement and excellence.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
