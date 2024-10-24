import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export default function JobCard() {
  return (
    <Card className="py-4 mr-8 backdrop-blur-md bg-gray-200 bg-opacity-30 border border-gray-300 rounded-md ">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Job role</p>
        <small className="text-default-500">Payment</small>
        <h4 className="font-bold text-large">Company Name</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://th.bing.com/th/id/OIP.4TpY4VFw2ou7d7tLh4g9ZAHaEn?rs=1&pid=ImgDetMain"
          width={270}
        />
      </CardBody>
    </Card>
  );
}