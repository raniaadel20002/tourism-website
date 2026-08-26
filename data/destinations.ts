export interface DestinationItem {
  id: string;
  name: string;
  tripCount: number;
  image: string;
  href: string;
}

export const allDestinations: DestinationItem[] = [
  {
    id: "hurghada",
    name: "Hurghada",
    tripCount: 10,
    image: "/images/home/PopularDestinations/hurghada.png",
    href: "/trips?destination=Hurghada",
  },
  {
    id: "giza",
    name: "Giza",
    tripCount: 10,
    image: "/images/home/PopularDestinations/giza.png",
    href: "/trips?destination=Giza",
  },
  {
    id: "aswan",
    name: "Aswan",
    tripCount: 10,
    image: "/images/home/PopularDestinations/aswan.png",
    href: "/trips?destination=Aswan",
  },
  {
    id: "luxor",
    name: "Luxor",
    tripCount: 10,
    image: "/images/home/bestselling/LuxorDayTour.jpg",
    href: "/trips?destination=Luxor",
  },
  {
    id: "sharm-el-sheikh",
    name: "Sharm El Sheikh",
    tripCount: 10,
    image: "/images/home/Gallery/Frame1171276590.png",
    href: "/trips?destination=Sharm%20El%20Sheikh",
  },
  {
    id: "dahab",
    name: "Dahab",
    tripCount: 10,
    image: "/images/home/Gallery/Frame1171276587.png",
    href: "/trips?destination=Dahab",
  },
];
