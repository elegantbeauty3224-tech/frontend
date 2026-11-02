import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { MetaPixel } from "@/components/MetaPixel";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.elegant-beauty.xyz'),
  title: {
    default: "Elegant Beauty | প্রিমিয়াম এক্সক্লুসিভ কালেকশন - ক্যাশ অন ডেলিভারি বাংলাদেশ",
    template: "%s | Elegant Beauty Official Store",
  },
  description: "Elegant Beauty - Quality Products ❤️ Trusted Service. ১৮-ইঞ্চি কেবিন লাগেজ (18-Inch Cabin Luggage), লাক্সারি লেডিস হ্যান্ডব্যাগ, প্রিমিয়াম জর্জেট পার্টি থ্রি-পিস ও বিউটি কেয়ার। কোনো অগ্রিম পেমেন্ট ছাড়া সারা বাংলাদেশে ক্যাশ অন ডেলিভারি ও দ্রুত হোম ডেলিভারি।",
  applicationName: "Elegant Beauty",
  authors: [{ name: "Elegant Beauty", url: "https://www.elegant-beauty.xyz" }],
  generator: "Next.js",
  keywords: [
    // Top Brand & Platform Keywords
    "Elegant Beauty",
    "Elegant Beauty BD",
    "elegant-beauty.xyz",
    "এলিগেন্ট বিউটি",
    "অনলাইন শপ বাংলাদেশ",
    "বিশ্বস্ত অনলাইন শপ",
    "অনলাইন শপিং বাংলাদেশ",
    "online shopping bangladesh",
    "online shopping bd cash on delivery",

    // 18-Inch Cabin Luggage & Travel Gear (Top Google Searches)
    "18 inch cabin luggage",
    "18 inch luggage bag",
    "cabin luggage price in bangladesh",
    "hand luggage bangladesh",
    "travel bag price in bangladesh",
    "spinner wheels luggage bd",
    "lightweight cabin luggage bag",
    "১৮ ইঞ্চি লাগেজ ব্যাগের দাম",
    "১৮ ইঞ্চি কেবিন লাগেজ",
    "কেবিন লাগেজ এর দাম কত",
    "বিমানের হ্যান্ড লাগেজ সাইজ",
    "ট্রাভেল লাগেজ বাংলাদেশ",
    "হ্যান্ড লাগেজ ট্রাভেল ব্যাগ",
    "লাগেজ ব্যাগ এর দাম বাংলাদেশ",

    // Women's Handbags & Fashion Bags
    "ladies handbag price in bd",
    "luxury ladies bag bangladesh",
    "women shoulder bag online shopping bd",
    "ladies party bag bangladesh",
    "waterproof pu leather bag bd",
    "লেডিস হ্যান্ডব্যাগ কালেকশন",
    "মহিলাদের পার্টি ব্যাগ",
    "মেয়েদের ফ্যাশনেবল ব্যাগ",
    "লেডিস শোল্ডার ব্যাগ",
    "হ্যান্ডব্যাগ এর দাম",

    // Women's Clothing, Three-Pieces & Sarees
    "exclusive party three piece collection",
    "georgette party three piece bd",
    "katan benaroshi silk saree bd",
    "pakistani three piece bangladesh",
    "প্রিমিয়াম থ্রি পিস",
    "জর্জেট পার্টি ড্রেস",
    "বেনারসি সিল্ক শাড়ি",
    "পার্টি থ্রি পিস কালেকশন",
    "কাত্তান শাড়ির দাম",

    // Beauty, Cosmetics & Skincare
    "organic skin care combo bd",
    "skin brightening cream bd",
    "face serum and night cream bd",
    "ত্বকের যত্ন বিউটি কেয়ার",
    "অর্গানিক স্কিন গ্লো কম্বো",
    "ফেস সিরাম ও নাইট ক্রিম",

    // Baby & Kids Care
    "baby care combo gift set",
    "cute teddy bear gift bd",
    "বাচ্চাদের টেডি বেয়ার ও গিফট আইটেম",

    // High-Intent Buying & Delivery Keywords
    "cash on delivery online shopping bangladesh",
    "ক্যাশ অন ডেলিভারি অনলাইন শপিং",
    "সারা দেশে হোম ডেলিভারি",
    "পণ্য হাতে পেয়ে পেমেন্ট",
    "স্টেডফাস্ট কুরিয়ার হোম ডেলিভারি"
  ],
  creator: "HeroStack",
  publisher: "Elegant Beauty",
  category: "ecommerce",
  classification: "Shopping, Lifestyle, Fashion, Luggage & Travel, Beauty",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: 'https://www.elegant-beauty.xyz/',
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Elegant Beauty | প্রিমিয়াম এক্সক্লুসিভ কালেকশন - ক্যাশ অন ডেলিভারি বাংলাদেশ",
    description: "১৮-ইঞ্চি কেবিন লাগেজ, লাক্সারি লেডিস হ্যান্ডব্যাগ, প্রিমিয়াম থ্রি-পিস ও বিউটি কেয়ার। কোনো অগ্রিম পেমেন্ট ছাড়াই সারা বাংলাদেশে ক্যাশ অন ডেলিভারি ও দ্রুত হোম ডেলিভারি।",
    url: 'https://www.elegant-beauty.xyz/',
    siteName: 'Elegant Beauty',
    locale: 'bn_BD',
    alternateLocale: ['en_US'],
    type: 'website',
    images: [
      {
        url: 'https://www.elegant-beauty.xyz/banner.jpeg',
        width: 1200,
        height: 800,
        alt: 'Elegant Beauty Official Marketing Banner - 18-Inch Cabin Luggage & Fashion',
      },
      {
        url: 'https://www.elegant-beauty.xyz/product-luggage.jpg',
        width: 800,
        height: 800,
        alt: '18-Inch Cabin Luggage with 360 Spinner Wheels',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Elegant Beauty | প্রিমিয়াম এক্সক্লুসিভ কালেকশন - ক্যাশ অন ডেলিভারি বাংলাদেশ",
    description: "১৮-ইঞ্চি কেবিন লাগেজ, লাক্সারি লেডিস হ্যান্ডব্যাগ, প্রিমিয়াম থ্রি-পিস ও বিউটি কেয়ার। কোনো অগ্রিম পেমেন্ট ছাড়াই ক্যাশ অন ডেলিভারি।",
    images: ['https://www.elegant-beauty.xyz/banner.jpeg'],
    creator: '@ElegantBeauty',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "RFvi1-GGJ3pAV9dTClNaXX3Sc5jq9zIKXioz0i2WHf4",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#12372A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["OnlineStore", "Organization"],
        "@id": "https://www.elegant-beauty.xyz/#organization",
        "name": "Elegant Beauty",
        "alternateName": ["Elegant Beauty BD", "Elegant Beauty Official Store", "এলিগেন্ট বিউটি"],
        "url": "https://www.elegant-beauty.xyz/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.elegant-beauty.xyz/logo-light.jpeg",
          "caption": "Elegant Beauty Logo"
        },
        "image": "https://www.elegant-beauty.xyz/banner.jpeg",
        "description": "Elegant Beauty - Quality Products ❤️ Trusted Service. ১৮-ইঞ্চি কেবিন লাগেজ, লাক্সারি লেডিস হ্যান্ডব্যাগ, প্রিমিয়াম থ্রি-পিস ও বিউটি কেয়ার। কোনো অগ্রিম পেমেন্ট ছাড়া সারা বাংলাদেশে ক্যাশ অন ডেলিভারি।",
        "currenciesAccepted": "BDT",
        "paymentAccepted": ["Cash on Delivery (COD)", "bKash"],
        "priceRange": "৳1350 - ৳4500",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dhaka",
          "addressRegion": "Dhaka Division",
          "addressCountry": "BD"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+8801648439277",
          "contactType": "customer service",
          "areaServed": "BD",
          "availableLanguage": ["bn", "en"]
        },
        "sameAs": [
          "https://www.facebook.com/HeroStack"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.elegant-beauty.xyz/#website",
        "url": "https://www.elegant-beauty.xyz/",
        "name": "Elegant Beauty",
        "description": "Elegant Beauty - Quality Products ❤️ Trusted Service. সারা বাংলাদেশে ক্যাশ অন ডেলিভারি।",
        "publisher": {
          "@id": "https://www.elegant-beauty.xyz/#organization"
        },
        "inLanguage": "bn-BD",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.elegant-beauty.xyz/?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.elegant-beauty.xyz/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "হোম (Home)",
            "item": "https://www.elegant-beauty.xyz/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "সকল পণ্য (All Products)",
            "item": "https://www.elegant-beauty.xyz/#products-grid"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "১৮-ইঞ্চি কেবিন লাগেজ (Cabin Luggage)",
            "item": "https://www.elegant-beauty.xyz/?category=Luggage"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.elegant-beauty.xyz/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Elegant Beauty-তে কি ক্যাশ অন ডেলিভারি (Cash on Delivery) সুবিধা আছে?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "হ্যাঁ, সারা বাংলাদেশে কোনো ধরনের অগ্রিম পেমেন্ট বা বিকাশ চার্জ ছাড়াই শতভাগ ক্যাশ অন ডেলিভারিতে অর্ডার করতে পারবেন। পণ্যটি ডেলিভারি ম্যানের সামনে খুলে চেক করে তারপর মূল্য পরিশোধ করার পূর্ণ নিশ্চয়তা রয়েছে।"
            }
          },
          {
            "@type": "Question",
            "name": "১৮-ইঞ্চি কেবিন লাগেজ (18-Inch Cabin Luggage) কি বিমানে হ্যান্ড লাগেজ হিসেবে নেওয়া যাবে?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "হ্যাঁ, আমাদের ১৮-ইঞ্চি কেবিন লাগেজটি আন্তর্জাতিক ও অভ্যন্তরীণ সব এয়ারলাইন্সের অনুমোদিত কেবিন সাইজ ডাইমেনশন মেনে তৈরি। এটি প্রায় ২ কেজি হালকা ওজনের এবং ৭ কেজি পর্যন্ত মালামাল বহনে সক্ষম। সাথে রয়েছে স্মুথ ৩৬০° স্পিনার হুইল এবং ইন-বিল্ট নাম্বার লক সিস্টেম।"
            }
          },
          {
            "@type": "Question",
            "name": "ঢাকা ও সারা বাংলাদেশে হোম ডেলিভারি পেতে কত সময় লাগে?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ঢাকার ভেতরে সাধারণত ২৪ থেকে ৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে ৪৮ থেকে ৭২ ঘণ্টার মধ্যে আমাদের অফিসিয়াল পার্টনার স্টেডফাস্ট কুরিয়ারের মাধ্যমে সরাসরি আপনার দেওয়া ঠিকানায় হোম ডেলিভারি পৌঁছে দেওয়া হয়।"
            }
          },
          {
            "@type": "Question",
            "name": "পণ্য হাতে পেয়ে চেক করার পর কোনো ত্রুটি পেলে রিটার্ন বা পরিবর্তনের নিয়ম কী?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "আমরা প্রতিটি পণ্য প্রেরণের পূর্বে কোয়ালিটি নিশ্চিত করি। তবুও ডেলিভারির সময় কোনো অমিল বা সমস্যা পেলে ডেলিভারি ম্যানকে সরাসরি জানিয়ে তাৎক্ষণিক রিটার্ন করতে পারবেন অথবা আমাদের অফিসিয়াল সাপোর্ট নম্বর 01648-439277 এ যোগাযোগ করে সহজে এক্সচেঞ্জ নিতে পারবেন।"
            }
          },
          {
            "@type": "Question",
            "name": "অর্ডারের লাইভ স্ট্যাটাস বা পার্সেল ট্র্যাকিং কীভাবে করব?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ওয়েবসাইটের উপরে থাকা 'অর্ডার ট্র্যাক' বাটনে ক্লিক করে আপনার ১১ ডিজিটের মোবাইল নম্বর অথবা অর্ডার নম্বর লিখে সার্চ করলেই রিয়েল-টাইম কুরিয়ার ও ডিসপ্যাচ আপডেট দেখতে পাবেন।"
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="bn" data-theme="light" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="RFvi1-GGJ3pAV9dTClNaXX3Sc5jq9zIKXioz0i2WHf4" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap"
          media="print"
          // @ts-expect-error - standard browser non-render-blocking font pattern
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap"
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-amber-100 selection:text-amber-900"
        suppressHydrationWarning
      >
        <MetaPixel />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
