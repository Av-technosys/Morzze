import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MailIcon, MapPin, PhoneIcon, PinIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <section className="relative w-full  bg-black text-white">
      <div>
        <Image
          src="/footer-bg.png"
          alt="contact"
          width={10000}
          height={500}
          className="object-fill z-0"
        />
        <div className=" lg:absolute lg:top-30  lg:right-90 left-90 text-center z-40 space-y-4">
          <p className="text-xl text-yellow-600">Get in Touch</p>
          <h1 className="text-5xl font-bold">Contact Us</h1>
          <p className="text-xl">
            We'd love to hear from you. Reach out for inquiries, support, or
            partnership <br /> opportunities.
          </p>
        </div>
      </div>

      <div className="lg:flex grid grid-cols-1   justify-center lg:-mt-16 gap-10  w-full ">
        {/* Card 1 */}
        <div
          className="w-80 h-72 rounded-xl p-6 
    bg-white/10 backdrop-blur-xl 
    border border-white/20 
    shadow-lg shadow-black/30"
        >
          <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
            <MapPin className="text-[#D97706]" />
          </div>

          <h3 className="text-white font-semibold mb-2">Visit Us</h3>
          <p className="text-gray-300 text-sm leading-6">
            Morzze India Pvt. Ltd.
            <br />
            12th Floor, Tower B,
            <br />
            DLF Cyber City, Phase III,
            <br />
            Gurugram, Haryana 12200
            <br />
            India
          </p>
        </div>

        {/* Card 2 */}
        <div
          className="w-80 h-72   rounded-xl p-6 
    bg-white/10 backdrop-blur-xl 
    border border-white/20 
    shadow-lg shadow-black/30"
        >
          <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
            <PhoneIcon className="text-[#D97706]" />
          </div>

          <h3 className="text-white font-semibold mb-2">Call Us</h3>
          <p className="text-gray-300 text-sm leading-6">
            Toll Free: <br />
            <span className="text-yellow-400">1800-123-4567</span>
            <br />
            Sales: <br />
            <span className="text-yellow-400">+91-98765-43210</span>
            <br />
            Support: <br />
            <span className="text-yellow-400">+91-98765-43211</span>
          </p>
        </div>

        {/* Card 3 */}
        <div
          className="w-80 h-72   rounded-xl p-6 
    bg-white/10 backdrop-blur-xl 
    border border-white/20 
    shadow-lg shadow-black/30"
        >
          <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
            <MailIcon className="text-[#D97706]" />
          </div>

          <h3 className="text-white font-semibold ">Email Us</h3>
          <p className="text-gray-300 text-sm leading-6">
            General: <br />
            <span className="text-yellow-400">info@morzze.com</span>
            <br />
            Sales: <br />
            <span className="text-yellow-400">sales@morzze.com</span>
            <br />
            Support: <br />
            <span className="text-yellow-400">support@morzze.com</span>
          </p>
        </div>
      </div>
      <div className="py-20 lg:flex grid grid-cols-1 justify-center gap-10">
        <div className="lg:w-1/2 lg:px-20 px-4  ">
          <p>SEND A MESSAGE</p>
          <p>Get In Touch</p>
          <FieldGroup className="grid lg:max-w-sm grid-cols-2">
            <Field>
              <FieldLabel htmlFor="first-name">First Name</FieldLabel>
              <Input id="first-name" placeholder="Jordan" />
            </Field>
            <Field>
              <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
              <Input id="last-name" placeholder="Lee" />
            </Field>
            <Field>
              <FieldLabel htmlFor="first-name">First Name</FieldLabel>
              <Input id="first-name" placeholder="Jordan" />
            </Field>
            <Field>
              <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
              <Input id="last-name" placeholder="Lee" />
            </Field>
          </FieldGroup>
          <Field>
            <FieldLabel htmlFor="form-name">Name</FieldLabel>
            <Input
              id="form-name"
              type="text"
              placeholder="Evil Rabbit"
              required
            />
          </Field>
          <FieldLabel htmlFor="form-name">Name</FieldLabel>
          <Textarea placeholder="Type your message here." />
          <Button className="bg-yellow-400 text-black hover:bg-yellow-500 mt-4">
            Submit
          </Button>
        </div>
        <div className="w-1/2 ">
          <Image
            src="/map.png"
            alt="contact"
            width={400}
            height={500}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default page;
