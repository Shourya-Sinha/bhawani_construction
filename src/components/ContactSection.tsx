import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Phone, Mail, MapPin } from "lucide-react";
import { GetContactSectionData } from "../constant/Constant";

interface PhoneNumber {
  firstNumberCountryCode: string;
  firstNumber: string;
}

interface ContactSectionData {
  _id: string;

  secTitleFirst: string; // e.g. "Get in"
  secTtileSecond: string; // e.g. "Touch"
  secSubHeading: string; // e.g. "Contact us for a free consultation about your project"

  headAddFirst: string; // e.g. "Mansurchak, Main Road,Begusarai"
  headAddSec: string; // e.g. "Bihar India, 851128"
  officeTtile: string; // e.g. "Head Office Address"

  brAddFirst: string; // e.g. "Near Hare Krishna Land"
  brSecAdd: string; // e.g. "Juhu Mumbai 400049"
  brachTitle: string; // e.g. "Branch Office Address"

  phoneNoFirst: PhoneNumber;
  phoneNoSec: PhoneNumber;

  email: string; // e.g. "support@bhawaniconstruction.in"

  workinghrTitle: string; // e.g. "Working Hours"
  fromWeekName: string; // e.g. "Monday"
  toWeekName: string; // e.g. "Friday"
  fromHour: string; // e.g. "8:00 AM"
  toHour: string; // e.g. "6:00 PM"

  weekendFirst: string; // e.g. "Saturday"
  weekendFirstTimeFrom: string;
  weekendFirstTimeTo: string;

  weekendSecond: string; // e.g. "Closed"
  weekendSecFromHour: string;
  weekendSecToHour: string;

  rightSideTitle: string; // e.g. "Contact Information"
  rightSidePara: string; // e.g. "Feel free to reach out..."

  // Add other optional properties if backend sometimes includes more
  [key: string]: any; // for safe forward-compatibility
}

const ContactSection = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contactData, setContactData] = useState<ContactSectionData | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append(
        "access_key",
        "62087d96-f9f5-40dc-80c4-dec74d4f6c92"
      );
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const json = JSON.stringify(Object.fromEntries(formDataToSend.entries()));

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const res = await response.json();

      if (res.success) {
        toast({ title: "Message sent successfully!" });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        toast({
          title: "Failed to send message.",
          description: res.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        setError(null);
        const response = await GetContactSectionData();
        setContactData(response);
      } catch (error) {
        console.log("error while fetching", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return (
      <section
        id="about"
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="about"
        className="flex items-center justify-center min-h-[400px]"
      >
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  if (!contactData) {
    return null; // nothing to show, but safe
  }
  // console.log("response data", contactData);
  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="section-container">
        <h2 className="section-title">
          {/* Get in  */} {contactData?.secTitleFirst || ""}
          <span className="text-construction-blue">
            {/* Touch */}
            {contactData?.secTtileSecond || ""}
          </span>
        </h2>
        <p className="section-subtitle">
          {/* Contact us for a free consultation about your project */}{" "}
          {contactData?.secSubHeading || ""}
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="contact-input"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="contact-input"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block mb-2 font-medium">
                    Phone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    className="contact-input"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block mb-2 font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="contact-input"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  className="contact-input min-h-[120px]"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-construction-red hover:bg-construction-red/90 text-white"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">
                {/* Contact Information */} {contactData?.rightSideTitle || ""}
              </h3>
              <p className="mb-6">
                {/* Feel free to reach out to us with any questions or inquiries
                about our construction services. Our team is available to
                provide you with the information you need. */}{" "}
                {contactData?.rightSidePara || ""}
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="text-construction-blue mt-1 mr-4 h-5 w-5" />
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p>
                      {contactData?.phoneNoFirst.firstNumberCountryCode}{" "}
                      {contactData?.phoneNoFirst.firstNumber}
                    </p>
                    <p>
                      {/* +91 9905019785 */}
                      {contactData?.phoneNoSec.firstNumberCountryCode}{" "}
                      {contactData?.phoneNoSec.firstNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="text-construction-blue mt-1 mr-4 h-5 w-5" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p>
                      {/* support@bhawaniconstruction.in */}
                      {contactData?.email || ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="text-construction-blue mt-1 mr-4 h-5 w-5" />
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/2">
                      <h4 className="font-medium">
                        {/* Head Office Address */}{" "}
                        {contactData?.officeTtile || ""}
                      </h4>
                      <p>
                        {/* Mansurchak, Main Road,Begusarai */}{" "}
                        {contactData?.headAddFirst || ""}
                        <br />
                        {/* Bihar India, 851128 */}{" "}
                        {contactData?.headAddSec || ""}
                      </p>
                    </div>
                    <div className="w-full md:w-1/2">
                      <h4 className="font-medium">
                        {/* Branch Office Address */}{" "}
                        {contactData?.brachTitle || ""}
                      </h4>
                      <p>
                        {/* Near Hare Krishna Land */}{" "}
                        {contactData?.brAddFirst || ""}
                        <br />
                        {/* Juhu Mumbai 400049 */} {contactData?.brSecAdd || ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">
                {/* Working Hours */} {contactData?.workinghrTitle || ""}
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>
                    {/* Monday - Friday */} {contactData?.fromWeekName || ""} -
                    {contactData?.toWeekName || ""}
                  </span>
                  <span>
                    {/* 8:00 AM - 6:00 PM */} {contactData?.fromHour || ""} -
                    {contactData?.toHour || ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>
                    {/* Saturday: */}
                    {contactData?.weekendFirst || ""}:
                  </span>
                  <span>
                    {/* 9:00 AM - 3:00 PM */}{" "}
                    {contactData?.weekendFirstTimeFrom || ""} -{" "}
                    {contactData?.weekendFirstTimeTo || ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>
                    {/* Closed */} {contactData?.weekendSecond || ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
