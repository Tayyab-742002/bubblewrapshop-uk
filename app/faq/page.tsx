import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://bubblewrapshop.co.uk";

export const metadata: Metadata = {
  title: "Packaging Supplies UK FAQs: Bubble Wrap Wholesale",
  description:
    "Find answers about packaging supplies UK, buying bubble wrap online UK, wholesale bubble wrap rolls, shipping, and bulk pricing at Bubble Wrap Shop.",
    keywords:[
      "Packaging supplies UK",
      "Buy bubble wrap online UK",
      "Wholesale bubble wrap supplier UK",
      "Bubble wrap rolls wholesale UK",
      "Anti-static bubble wrap UK",
      "Foam packaging rolls UK",
      "Stretch film wrap UK",
      "Edge protection packaging UK",
      "Mailing bags wholesale UK"
    ],

  openGraph: {
    title: "FAQ - Frequently Asked Questions | Bubble Wrap Shop",
    description:
      "Find answers to common questions about our packaging supplies, shipping, returns, bulk orders, and more.",
    url: `${siteUrl}/faq`,
  },
  alternates: {
    canonical: `${siteUrl}/faq`,
  },
};

const faqData = [
  {
    category: "Ordering & Shipping",
    questions: [
      {
        question: "What are your shipping options?",
        answer:
          "Our speedy and dependable delivery throughout the UK covers any packaging supplies UK, on which companies depend on. The majority of orders are shipped fast, and many products can be delivered within a day, such as bubble wrap, boxes and mailing bags. At checkout, delivery time and price are clearly shown to be able to make plans.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "We are currently concentrating on serving customers in the UK, where we are able to deliver fast and consistent services to customers. This will enable us to be a reliable wholesale bubble wrap supplier UK on which companies can rely.",
      },
      {
        question: "Can I track my order?",
        answer:
          "Yes. After your order has been shipped out, you will get tracking information in the form of an email, which can be used to track your shipment in real time, warehouse to your doorstep.",
      },
      {
        question: "What is your return policy?",
        answer:
          "In case you have any problems with your order, our customer service is on call. The returns are processed justly and effectively according to the UK consumer and business buying regulations. We would appreciate being of help to you immediately.",
      },
    ],
  },
  {
    category: "Pricing & Discounts",
    questions: [
      {
        question: "How does bulk pricing work?",
        answer:
          "We have automatic bulk pricing on most products, and UK clients make frequent orders for bubble wrap rolls. The larger the purchase, the better the unit price- no account establishments is necessary.",
      },
      {
        question: "Are there volume discounts for large orders?",
        answer:
          "Yes. Companies that purchase large quantities of packaging to protect their goods, such as postal bags, foam roll wraps, or stretch wrappers, can use wholesale pricing. We also provide customized pricing when applied to the ongoing requirements.",
      },
      {
        question: "Do you offer business accounts?",
        answer:
          "Absolutely. Our B2B accounts are best suited to companies that regularly buy bubble wrap online in the UK or require regular access to wholesale prices, priority stock, and fast ordering.",
      },
    ],
  },
  {
    category: "Products & Quality",
    questions: [
      {
        question: "What materials do you use?",
        answer:
          "We provide durable, quality materials that are used in shipping and storage in the real world. We have an assortment of bubble wrap, anti-static bubble wrap UK, foam packaging rolls UK, stretch film and edge protection packaging, which are all chosen on the basis of their performance and dependability.",
      },
      {
        question: "Do you offer eco-friendly options?",
        answer:
          "Yes. We care about sustainability. Our ability to reduce the environmental footprint of businesses helps us to sell recyclable and environmentally friendly bubble wrap UK and environmentally friendly packaging material to businesses.",
      },
      {
        question: "Can products be customized?",
        answer:
          "Products can be packaged in various formats, thicknesses and sizes based on availability. Our team will be glad to recommend in case you are particularly in need.",
      },
      {
        question: "What sizes are available?",
        answer:
          "Our sizes in all of our lineups of packaging are broad, such as small and industrial-sized rolls and bags. This ensures that it is easy to find the correct solution in case of shipping of individual or loads of pallets.",
      },
    ],
  },
  {
    category: "Account & Support",
    questions: [
      {
        question: "Do I need to create an account to order?",
        answer:
          "No. It is possible to make an order as a visitor. But when you have created an account, it will be quicker to reorder and will enable you to monitor what you have bought before.",
      },
      {
        question: "How can I contact customer support?",
        answer:
          "Our support team may be contacted by phone, email or by the support Contact Form on our site. You can reach out to us on product selection, order and product enquiry with or without hesitation.",
      },
      {
        question: "Can I cancel or modify my order?",
        answer:
          "If you have not received your order yet, we will help you. Contact us to make changes as early as possible.",
      },
      {
        question: "How do I download an invoice?",
        answer:
          "You can view invoices in your account dashboard or request them using our support team in case of necessity.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Breadcrumbs */}
      <div className="relative z-10 border-b border-emerald-200 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] py-6">
          <Breadcrumbs items={[{ label: "FAQ", href: "/faq" }]} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl">
          {/* Back Button */}
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="mb-8 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 -ml-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" strokeWidth={2} />
              Back to Home
            </Button>
          </Link>

          {/* Page Header */}
          <div className="mb-16 md:mb-20 text-center">
            <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900">
              Frequently Asked
              <span className="block bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mt-2">
                Questions
              </span>
            </h1>
            <p className="text-base text-gray-600 md:text-lg max-w-2xl mx-auto">
              Find answers to common questions about our products and services
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-12 md:space-y-16">
            {faqData.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-300"
              >
                <h2 className="mb-8 text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="h-1 w-8 bg-linear-to-r from-emerald-600 to-teal-600 rounded-full"></div>
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`${categoryIndex}-${faqIndex}`}
                      className="border-b border-gray-200 last:border-0"
                    >
                      <AccordionTrigger className="py-5 text-left text-base font-semibold text-gray-900 hover:text-emerald-600 transition-colors data-[state=open]:text-emerald-600">
                        <div className="flex items-center gap-3">
                          <div className="w-1 h-1 rounded-full bg-emerald-500 shrink-0"></div>
                          <span>{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-6 pt-2 pl-5">
                        <p className="text-sm md:text-base leading-relaxed text-gray-600">
                          {faq.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          <section className="relative rounded-xl mt-10 border-t bg-linear-to-br from-emerald-600  to-teal-600 py-20 md:py-28 lg:py-32 overflow-hidden">
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
              <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                {/* Heading */}
                <h2 className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Still have questions?
                  <span className="block mt-2 text-white">Contact Us</span>
                </h2>

                {/* Description */}
                <p className="mb-10 text-base md:text-lg lg:text-xl text-white/80 max-w-2xl leading-relaxed lg:mb-12">
                  We are easy to reach, and in case you need additional information on our products or services, just Contact Us. Our customer care team is at your service and ready to assist you in locating the appropriate packaging supplies UK companies rely on day in day out.
                </p>

                {/* CTA Button */}
                <Button asChild variant="ghost" className="w-fit group">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 px-8 py-4 mt-4 text-base font-semibold border border-white/20 text-white bg-white/20 rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    Contact Us
                    <ArrowRight
                      className="h-5 w-5 transition-transform group-hover:translate-x-1"
                      strokeWidth={2.5}
                    />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
