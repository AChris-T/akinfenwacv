import { site } from "@/lib/site";

/**
 * JSON-LD describing this page as a profile of a person, so Google can connect the name,
 * role, employer, education and social profiles. Validate with https://search.google.com/test/rich-results
 */
export default function StructuredData() {
  const person = {
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.fullName,
    alternateName: ["Taiwo Akinfenwa", "Akinfenwa Taiwo"],
    givenName: "Taiwo",
    additionalName: "Christopher",
    familyName: "Akinfenwa",
    jobTitle: "Full-Stack & Mobile Engineer",
    description: site.description,
    url: site.url,
    image: `${site.url}/opengraph-image`,
    email: `mailto:${site.email}`,
    sameAs: [site.linkedin, site.githubProfile],
    worksFor: { "@type": "Organization", name: "Viro", url: "https://meetviro.com" },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Ibadan",
      address: { "@type": "PostalAddress", addressLocality: "Ibadan", addressCountry: "NG" },
    },
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Vue.js",
      "Angular",
      "React Native",
      "Expo",
      "Node.js",
      "NestJS",
      "Python",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "REST API design",
      "Software testing",
      "Full-stack development",
      "Mobile app development",
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.fullName,
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": `${site.url}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${site.url}/#profile`,
        url: site.url,
        name: site.title,
        isPartOf: { "@id": `${site.url}/#website` },
        mainEntity: person,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can never close the script tag early (per Next.js guidance).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }}
    />
  );
}
