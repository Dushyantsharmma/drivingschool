import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  canonical,
  image,
  type = 'website' 
}) => {
  // --- DEFAULT CONFIGURATION ---
  const siteUrl = 'https://rajannrajdrivingschool.com';
  const defaultTitle = 'Raj Ann Raj Driving Training School | #1 Driving School in Mandi';
  const defaultDescription = 'Government approved driving school in Mandi & Karsog. Learn from Pushp Raj (20+ years exp). Dual-control AC cars, RTO test prep, and safety-first training.';
  const defaultKeywords = 'driving school mandi, car driving training karsog, learning license himachal, driving instructor pushp raj, rto test mandi, driving school near me';
  const defaultImage = '/banners/driving-school-karsog-mandi-hp.webp';
  
  // --- MERGE PROPS ---
  const pageTitle = title ? `${title} | Raj Ann Raj` : defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageKeywords = keywords || defaultKeywords;
  const pageCanonical = canonical || siteUrl;
  const pageImage = image ? `${siteUrl}${image}` : `${siteUrl}${defaultImage}`;

  // --- STRUCTURED DATA (JSON-LD) ---
  // This helps Google show your rating, phone, and location in search results
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AutoDrivingSchool",
    "name": "Raj Ann Raj Driving Training School",
    "image": [
      `${siteUrl}/branding/raj-ann-raj-logo.jpeg`,
      `${siteUrl}/banners/driving-school-karsog-mandi-hp.webp`
    ],
    "@id": siteUrl,
    "url": siteUrl,
    "telephone": "+919882034930",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bhanthal",
      "addressLocality": "Karsog",
      "addressRegion": "Himachal Pradesh",
      "postalCode": "175011",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 31.3260, // Approx Karsog coordinates
      "longitude": 77.2030
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:00",
      "closes": "19:00"
    },
    "sameAs": [
      "https://facebook.com/rajannrajdriving", // Add real links if available
      "https://instagram.com/rajannrajdriving"
    ]
  };

  return (
    <Helmet>
      {/* 1. Basic Metadata */}
      <html lang="en" />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <link rel="canonical" href={pageCanonical} />
      
      {/* 2. Robots & Indexing */}
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="googlebot" content="index, follow" />
      
      {/* 3. Mobile UI */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#0f172a" /> {/* Matches your Navy Brand Color */}

      {/* 4. Local SEO Geo-Tagging */}
      <meta name="geo.region" content="IN-HP" />
      <meta name="geo.placename" content="Mandi" />
      <meta name="geo.position" content="31.3260;77.2030" />
      <meta name="ICBM" content="31.3260, 77.2030" />

      {/* 5. Open Graph (Facebook/WhatsApp) */}
      <meta property="og:site_name" content="Raj Ann Raj Driving Training School" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={pageCanonical} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:alt" content="Raj Ann Raj Driving School Training" />

      {/* 6. Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />

      {/* 7. Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default SEO;