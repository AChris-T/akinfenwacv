export type Project = {
  url: string;
  category: string;
  title?: string;
  description?: string;
};
export const projects: Project[] = [
  { url: "https://app.meetviro.com/signin", category: "Web Apps" },
  { url: "https://meetviro.com", category: "Websites" },
  { url: "https://sparkpay.ng", category: "Web Apps" }, 
  { url: "http://everlastinghills.church", category: "Web Apps" },
  { url: "https://www.osmosiscoaching.org/", category: "Websites" },
  { url: "https://www.viridisgreen.co.uk", category: "Websites" },
  { url: "https://fojoglobal.co.uk", category: "Websites" },
  { url: "https://www.omojolagbegeriaticcare.org", category: "Websites" },
  { url: "https://www.lushcorporate.co.uk/", category: "Websites" },
  { url: "https://www.coterieexperience.co.uk/", category: "Websites" },
  { url: "https://www.kqacademy.ng", category: "Websites" },
  { url: "https://www.superoagrobase.com", category: "Websites" },
  { url: "https://www.ayodejianifowose.com/home", category: "Websites" },
  { url: "https://petigrity.com", category: "Websites" },
  { url: "https://myvaultly.app", category: "Mobile Apps" }, 
  { url: "https://vaultlyadmin.vercel.app/login?from=%2F", category: "Websites" }, 
];

export function projectSlug(url: string) {
  const { hostname, pathname } = new URL(url);
  return `${hostname}${pathname}`
    .replace(/^www\./, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}
