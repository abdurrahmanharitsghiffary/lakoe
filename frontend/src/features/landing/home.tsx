import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Typography } from "@/components/ui/typography";
  import { motion } from "framer-motion";
  
  export function Home() {
    const homeData = [
      {
        title: "Welcome to Our Store",
        description:
          "Discover a variety of products tailored to your needs. Enjoy exclusive discounts, free shipping, and more!",
        image:
          "https://abeautifulmess.typepad.com/.a/6a00d8358081ff69e201b7c76bf40b970b-800wi", // Ganti dengan gambar yang relevan
      },
      {
        title: "Exclusive Offers",
        description:
          "Take advantage of our limited-time offers and discounts on a wide range of products.",
        image:
          "https://png.pngtree.com/png-clipart/20220915/original/pngtree-transparent-exclusive-offer-banner-png-image_8618621.png", // Ganti dengan gambar yang relevan
      },
      {
        title: "Easy Payment Options",
        description:
          "Choose from multiple payment methods and enjoy a smooth shopping experience.",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJFZTUP8QubQSREgCdJ5tr2tBz2Gkmz8YL_Q&s", // Ganti dengan gambar yang relevan
      },
    ];
  
    return (
      <div className="mt-20">
        <Typography variant="h2" className="text-2xl font-bold mb-4 flex justify-center items-center border-none">
          Welcome to Our Store
        </Typography>
  
        <motion.div whileHover={{ scale: 1.05 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-[1200px] m-auto">
          {homeData.map((item, index) => (
            <Card key={index} className="p-6 shadow-lg rounded-lg bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold mb-2">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{item.description}</CardDescription>
                <img src={item.image} alt={item.title} className="w-full h-auto rounded-lg" />
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    );
  }
  