export type EnglishServicePageContent = {
  slug: string;
  frenchPath: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  lead: string;
  heroImage: string;
  presentationTitle: string;
  presentationBody: string;
  benefits: { title: string; body: string }[];
  visualImage: string;
  steps: { title: string; body: string }[];
  usefulInfo: string[];
  reassuranceTitle: string;
  reassuranceBody: string;
  relatedLinks: { href: string; label: string }[];
};

export const englishServicePages: EnglishServicePageContent[] = [
  {
    slug: "airport-transfer",
    frenchPath: "/transfert-aeroport",
    navLabel: "Airport transfers",
    eyebrow: "Lyon Airport transfer",
    title: "A smooth journey to or from Lyon Airport.",
    lead: "Pre-book a private driver between Lyon Saint-Exupéry Airport, central Lyon, your hotel or any destination in the region.",
    heroImage: "/images/site/kdrive-transfert-aeroport-lyon-saint-exupery.webp",
    presentationTitle: "Your arrival is planned before you land",
    presentationBody: "Share your flight number when requesting your ride. The KDRIVE team prepares your pickup, confirms the meeting details and remains directly reachable if your journey changes.",
    benefits: [
      { title: "Flight details", body: "Your flight number helps us prepare the pickup and adapt when necessary." },
      { title: "The right vehicle", body: "Tell us how many passengers and bags you have so we can confirm a suitable category." },
      { title: "Price confirmed in advance", body: "Your fare is reviewed and confirmed with you before the journey." },
    ],
    visualImage: "/images/site/kdrive-voyageur-affaires-aeroport-lyon.webp",
    steps: [
      { title: "Send your itinerary", body: "Tell us your pickup, destination, date, time and flight number." },
      { title: "Receive confirmation", body: "KDRIVE checks availability and confirms the fare directly with you." },
      { title: "Meet your driver", body: "Your pickup instructions are agreed before your arrival or departure." },
    ],
    usefulInfo: ["Lyon Saint-Exupéry Airport (LYS)", "One-way and return journeys", "Transfers to Lyon, hotels, ski resorts and long-distance destinations"],
    reassuranceTitle: "A personal service from booking to drop-off",
    reassuranceBody: "Every airport transfer is reviewed by the KDRIVE team. You receive clear pickup details, a confirmed vehicle category and direct contact before travelling.",
    relatedLinks: [
      { href: "/en/vehicles", label: "Explore our vehicles" },
      { href: "/en/rates", label: "View rate information" },
      { href: "/en/long-distance-transfers", label: "Long-distance transfers" },
    ],
  },
  {
    slug: "train-station-transfer",
    frenchPath: "/transfert-gare",
    navLabel: "Train station transfers",
    eyebrow: "Lyon station transfer",
    title: "Your private driver for Lyon Part-Dieu and Perrache.",
    lead: "Arrange a private pickup from Lyon’s main railway stations, with clear meeting details and room for your luggage.",
    heroImage: "/images/site/kdrive-transfert-gare-lyon-part-dieu.webp",
    presentationTitle: "From platform to destination, without the rush",
    presentationBody: "Whether you arrive at Part-Dieu or Perrache, KDRIVE organises your transfer to a hotel, business address, airport or private destination in and around Lyon.",
    benefits: [
      { title: "Main Lyon stations", body: "Pre-booked pickups at Lyon Part-Dieu and Lyon Perrache." },
      { title: "Clear meeting point", body: "Pickup information is agreed with you before the journey." },
      { title: "Price confirmed in advance", body: "The fare is communicated before your booking is confirmed." },
    ],
    visualImage: "/images/site/kdrive-arrivee-business-gare-lyon.webp",
    steps: [
      { title: "Share your train details", body: "Send the station, arrival or departure time, destination and passenger details." },
      { title: "Confirm the journey", body: "KDRIVE checks availability and contacts you with the fare." },
      { title: "Meet your driver", body: "Travel directly to your hotel, meeting, airport or onward destination." },
    ],
    usefulInfo: ["Lyon Part-Dieu station", "Lyon Perrache station", "One-way or return transfers with luggage"],
    reassuranceTitle: "A station pickup organised around your journey",
    reassuranceBody: "Train time, luggage and destination are reviewed with you so your transfer is clear before you reach Lyon.",
    relatedLinks: [
      { href: "/en/airport-transfer", label: "Airport transfers" },
      { href: "/en/corporate-chauffeur", label: "Corporate travel" },
      { href: "/en/vehicles", label: "Explore our vehicles" },
    ],
  },
  {
    slug: "corporate-chauffeur",
    frenchPath: "/chauffeur-entreprise",
    navLabel: "Business driver service",
    eyebrow: "Business travel in Lyon",
    title: "Professional journeys, handled with discretion.",
    lead: "A reliable private driver service for executives, teams, visiting clients, conferences and business appointments in Lyon.",
    heroImage: "/images/service-affaires.jpg",
    presentationTitle: "A local private driver for your business schedule",
    presentationBody: "KDRIVE coordinates airport and station pickups, hotel transfers, meetings and event travel for companies that value punctuality, discretion and direct communication.",
    benefits: [
      { title: "Professional discretion", body: "A composed service suited to executives, clients and confidential schedules." },
      { title: "Punctual planning", body: "Pickup times are organised around flights, trains and fixed appointments." },
      { title: "Direct coordination", body: "A single contact helps organise individual journeys or multi-stop programmes." },
    ],
    visualImage: "/images/corporate.jpg",
    steps: [
      { title: "Describe the schedule", body: "Share the travellers, timings, addresses and any intermediate stops." },
      { title: "Review the arrangement", body: "KDRIVE confirms the vehicle, availability and quotation." },
      { title: "Travel as planned", body: "Your driver follows the agreed itinerary and remains directly reachable." },
    ],
    usefulInfo: ["Executive and employee transfers", "Airport, station, hotel and conference travel", "Bookings can be made for another traveller"],
    reassuranceTitle: "Business travel coordinated with care",
    reassuranceBody: "Each corporate request is confirmed directly, including journeys booked for a colleague, executive, guest or international visitor.",
    relatedLinks: [
      { href: "/en/chauffeur-service", label: "Private driver by the hour" },
      { href: "/en/airport-transfer", label: "Airport transfers" },
      { href: "/en/train-station-transfer", label: "Station transfers" },
    ],
  },
  {
    slug: "chauffeur-service",
    frenchPath: "/mise-a-disposition",
    navLabel: "Private driver by the hour",
    eyebrow: "Private driver at your disposal",
    title: "A dedicated private driver, at your pace.",
    lead: "Book a private driver by the hour or for the day for business programmes, private events, dinners and multi-stop journeys.",
    heroImage: "/images/site/kdrive-travail-arriere-berline-lyon.webp",
    presentationTitle: "One private driver for the whole programme",
    presentationBody: "Instead of booking separate rides, keep the same driver for an agreed period. Multiple stops, waiting time and schedule adjustments can be included in the arrangement.",
    benefits: [
      { title: "Continuous availability", body: "Your driver remains assigned for the duration agreed with KDRIVE." },
      { title: "Multiple stops", body: "Build the service around your meetings, event or evening programme." },
      { title: "Quotation in advance", body: "The duration, vehicle and price are confirmed before the service." },
    ],
    visualImage: "/images/service-disposition.jpg",
    steps: [
      { title: "Share your programme", body: "Tell us the date, starting time, expected duration and principal stops." },
      { title: "Receive a quotation", body: "KDRIVE reviews the request and confirms availability and price." },
      { title: "Keep your driver", body: "Travel through the programme with one dedicated point of contact." },
    ],
    usefulInfo: ["Hourly or full-day service", "Suitable for business and private events", "Programme adjustments can be discussed during the service"],
    reassuranceTitle: "A tailored arrangement confirmed beforehand",
    reassuranceBody: "Duration, schedule, vehicle and programme are reviewed before KDRIVE confirms your private driver service.",
    relatedLinks: [
      { href: "/en/corporate-chauffeur", label: "Business driver service" },
      { href: "/en/long-distance-transfers", label: "Long-distance private transfers" },
      { href: "/en/contact", label: "Contact KDRIVE" },
    ],
  },
  {
    slug: "long-distance-transfers",
    frenchPath: "/longues-distances",
    navLabel: "Long-distance private transfers",
    eyebrow: "Long-distance private transfers",
    title: "Beyond Lyon, with the same private driver.",
    lead: "Travel privately from Lyon to destinations across France and neighbouring countries with a quotation confirmed before departure.",
    heroImage: "/images/hero-longues-distances.jpg",
    presentationTitle: "A long journey prepared around your needs",
    presentationBody: "For journeys outside Greater Lyon, KDRIVE prepares a personalised quotation based on the itinerary, timing, passenger count, luggage and vehicle category.",
    benefits: [
      { title: "Personal quotation", body: "Pricing reflects the actual distance and requirements of your journey." },
      { title: "Door-to-door travel", body: "Avoid connections and travel directly between the addresses you choose." },
      { title: "Direct confirmation", body: "Vehicle, availability and fare are confirmed before you commit." },
    ],
    visualImage: "/images/about-lyon.jpg",
    steps: [
      { title: "Send your itinerary", body: "Provide pickup, destination, date, time, passengers and luggage." },
      { title: "Receive your quotation", body: "KDRIVE reviews the complete request and contacts you directly." },
      { title: "Confirm the transfer", body: "Once approved, your driver and vehicle are secured." },
    ],
    usefulInfo: ["One-way and return journeys", "Transfers across France and neighbouring countries", "Popular destinations include Geneva, Annecy, Grenoble and Alpine resorts"],
    reassuranceTitle: "One journey, one clear arrangement",
    reassuranceBody: "Long-distance transfers are reviewed individually so you know the vehicle, organisation and price before departure.",
    relatedLinks: [
      { href: "/en/airport-transfer", label: "Lyon Airport transfers" },
      { href: "/en/vehicles", label: "Explore our vehicles" },
      { href: "/en/contact", label: "Request a quotation" },
    ],
  },
];

export function findEnglishServicePage(slug: string): EnglishServicePageContent {
  const page = englishServicePages.find((item) => item.slug === slug);
  if (!page) throw new Error(`Unknown English service page: ${slug}`);
  return page;
}
