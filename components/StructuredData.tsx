export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Quickfolio",
    "url": "https://quickfolio.in",
    "logo": "https://quickfolio.in/logo.png",
    "description": "AI-powered portfolio builder that helps professionals create stunning portfolios in minutes",
    "foundingDate": "2024",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hello@quickfolio.in",
      "contactType": "Customer Service"
    },
    "sameAs": [
      "https://www.linkedin.com/in/samiran-das-dev/",
      "https://x.com/SamiranDas2004",
      "https://github.com/SamiranDas2004"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Quickfolio",
    "url": "https://quickfolio.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://quickfolio.in/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Quickfolio",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does quickfolio work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply upload your resume or LinkedIn profile, and our AI will analyze your information to create a stunning, interactive portfolio website. The entire process takes just a few minutes."
        }
      },
      {
        "@type": "Question",
        "name": "Can I customize my portfolio?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! While our AI creates the initial design, you can customize colors, layouts, and content to match your personal brand and style."
        }
      },
      {
        "@type": "Question",
        "name": "Do I get a custom domain?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Every portfolio comes with a custom quickfolio.in subdomain, and you can also connect your own custom domain if you prefer."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
