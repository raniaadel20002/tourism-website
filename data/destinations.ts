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
    image: "/images/destination/hurghada.png",
    href: "/trips?destination=Hurghada",
  },
  {
    id: "giza",
    name: "Giza",
    tripCount: 10,
    image: "/images/destination/giza.png",
    href: "/trips?destination=Giza",
  },
  {
    id: "aswan",
    name: "Aswan",
    tripCount: 10,
    image: "/images/destination/aswan.png",
    href: "/trips?destination=Aswan",
  },
  {
    id: "luxor",
    name: "Luxor",
    tripCount: 10,
    image: "/images/destination/luxor.png",
    href: "/trips?destination=Luxor",
  },
  {
    id: "sharm-el-sheikh",
    name: "Sharm El Sheikh",
    tripCount: 10,
    image: "/images/destination/Sharm El Sheikh.png",
    href: "/trips?destination=Sharm%20El%20Sheikh",
  },
  {
    id: "dahab",
    name: "Dahab",
    tripCount: 10,
    image: "/images/destination/Dahab.png",
    href: "/trips?destination=Dahab",
  },
];
