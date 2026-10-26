// Netarhat Betla Tourism - Master Data Source

export const siteConfig = {
  name: "Netarhat Betla Tourism",
  domain: "netarhat.in",
  tagline: "Discover Jharkhand’s Hidden Gems",
  phone: "+91 62050 87480",
  phoneRaw: "+916205087480",
  whatsapp: "+916205087480",
  email: "info@netarhat.in",
  address: {
    street: "Railway Station Road",
    city: "Latehar",
    region: "Jharkhand",
    postalCode: "829207",
    country: "India",
  },
  openingHours: "Mo-Su 08:00-20:00",
  social: {
    facebook: "https://facebook.com/NetarhatBetlaTourism",
    instagram: "https://instagram.com/netarhatbetlatourism",
    youtube: "https://youtube.com/@NetarhatBetlaTourism",
  },
  certifications: [
    "Jharkhand Govt. Approved Tour Operator",
    "TAAI Allied Member",
    "Eco-Tourism Certified Leader",
    "Safe Travels Certified",
  ],
};

export const tourPackages = [
  {
    id: "ranchi-netarhat-2n3d",
    slug: "ranchi-netarhat-2n3d",
    title: "Ranchi – Netarhat – Ranchi (2N/3D)",
    subtitle: "The Queen of Chotanagpur Nature Retreat",
    duration: "2 Nights / 3 Days",
    destination: "Netarhat",
    startingPrice: 15399,
    rating: 4.9,
    reviewsCount: 142,
    badge: "Most Popular",
    image: "/images/netarhat_sunrise.jpg",
    alt: "Sunrise view over misty hills of Netarhat",
    overview:
      "Escape into the misty pine forests and rolling hills of Netarhat, the beloved 'Queen of Chotanagpur'. Perched at 1,128 meters above sea level, this 3-day guided retreat covers legendary sunrises, the breathtaking sunset at Magnolia Point, crystal cascading waterfalls at Upper Ghaghri and Lodh Falls, and colonial heritage.",
    highlights: [
      "Witness mesmerizing sunrise over Chotanagpur valley at sunrise point",
      "Sunset spectacle at Magnolia Point with sunset amber valley views",
      "Trek through fragrant pine forests and Netarhat Dam",
      "Visit Upper Ghaghri Waterfall & Koel View Point",
      "Explore historic Netarhat Residential School & heritage orchards",
      "Private sanitized AC SUV with experienced local driver-guide",
    ],
    itinerary: [
      {
        day: 1,
        title: "Departure from Ranchi – Scenic Ghats to Netarhat & Sunset Point",
        activities: [
          "08:00 AM: Pick-up from Ranchi Airport or Railway Station in private AC SUV.",
          "Scenic mountain drive through rolling tribal plateaus and Sal forests.",
          "En route photo stop at Kathautia Dam with refreshing local snacks.",
          "01:30 PM: Check-in at Netarhat resort / Dak Bungalow. Enjoy warm traditional welcome lunch.",
          "04:30 PM: Drive to Magnolia Sunset Point. Watch the dramatic sunset turn the valley into shades of amber and gold.",
          "Evening bonfire, tea, and local tribal folk culture stories. Dinner & overnight stay.",
        ],
      },
      {
        day: 2,
        title: "Sunrise at Sunrise Point, Waterfalls & Pine Woods Exploration",
        activities: [
          "05:30 AM: Early morning drive to Netarhat Sunrise Point to witness the golden sun emerging from a sea of morning clouds.",
          "08:30 AM: Wholesome breakfast amidst pine gardens.",
          "10:00 AM: Excursion to Upper Ghaghri Waterfall surrounded by untouched natural rock pools.",
          "01:00 PM: Traditional lunch featuring regional delicacies.",
          "03:00 PM: Walk through the British-era Pine Forest and visit the famous Koel River Viewpoint.",
          "Visit pear and apple research orchards and Netarhat Residential School campus.",
          "07:30 PM: Star-gazing session under pollution-free mountain skies. Gourmet dinner.",
        ],
      },
      {
        day: 3,
        title: "Lower Ghaghri Excursion & Return Drive to Ranchi",
        activities: [
          "07:30 AM: Relaxed breakfast overlooking the valley.",
          "09:00 AM: Visit Lower Ghaghri Falls viewpoint nestled deep in sal canopies.",
          "11:00 AM: Check-out and start return journey towards Ranchi.",
          "01:30 PM: Lunch en route at a local highway dhaba.",
          "04:30 PM: Drop-off at Ranchi Airport or Railway Station with cherished memories.",
        ],
      },
    ],
    pricing: [
      { pax: "2 Travelers", pricePerPerson: "₹15,399", note: "Deluxe Room (Twin Sharing) + Dedicated Sedan/SUV" },
      { pax: "4 Travelers", pricePerPerson: "₹11,499", note: "2 Deluxe Rooms + Spacious Innova/Ertiga" },
      { pax: "6+ Travelers", pricePerPerson: "₹9,299", note: "3 Deluxe Rooms + Premium Group Vehicle" },
    ],
    inclusions: [
      "2 Nights deluxe accommodation in Netarhat (hotel/bungalow)",
      "Daily breakfast, lunch, and dinner (authentic local & multi-cuisine)",
      "Pick-up and drop from Ranchi in private sanitized vehicle",
      "All fuel, toll taxes, parking fees, and driver allowances",
      "Guided excursions with English/Hindi speaking local expert",
      "All entry permits and viewpoint entry tickets",
    ],
    exclusions: [
      "Train or flight tickets to/from Ranchi",
      "Personal expenses (laundry, room service, extra snacks)",
      "Optional adventure activities not mentioned in itinerary",
      "GST (5%)",
    ],
  },
  {
    id: "ranchi-betla-3n4d",
    slug: "ranchi-betla-3n4d",
    title: "Ranchi – Betla National Park – Netarhat (3N/4D)",
    subtitle: "Wild Safari, Palamau Forts & Hill Retreat Combo",
    duration: "3 Nights / 4 Days",
    destination: "Betla & Netarhat",
    startingPrice: 19899,
    rating: 5.0,
    reviewsCount: 98,
    badge: "Wildlife & Hills",
    image: "/images/betla_safari.jpg",
    alt: "Elephant herd walking along jungle path in Betla National Park",
    overview:
      "The ultimate Jharkhand expedition combining the dense tropical biodiversity of Betla National Park (Palamau Tiger Reserve) with the serene misty heights of Netarhat. Encounter wild Asian elephants, leopards, gaur, and the iconic 16th-century Palamau Fort ruins before unwinding at Magnolia Sunset Point.",
    highlights: [
      "Morning jungle jeep safari & elephant trail inside Betla National Park",
      "Explore 16th-century ruins of Purana and Naya Palamau Fort deep inside jungle",
      "Spot herds of spotted deer, sambar, wild boar, langurs, and rare birdlife",
      "2 nights in Netarhat with Sunrise Point, waterfalls & pine forests",
      "Stay in eco-lodge nestled near Betla forest and Netarhat hills",
      "Comprehensive guided experience with forest department certified naturalist",
    ],
    itinerary: [
      {
        day: 1,
        title: "Ranchi to Betla National Park & Palamau Forts",
        activities: [
          "07:30 AM: Pick-up from Ranchi. 165 km scenic drive via Kuru and Latehar to Betla.",
          "12:30 PM: Check-in at forest eco-lodge near Betla Park. Welcome lunch.",
          "03:00 PM: Visit the historic ruins of Palamau Forts (Purana Kila & Naya Kila) built by Chero kings amidst dense forest vines.",
          "06:30 PM: Wildlife documentary screening and interactive Q&A with forest naturalist.",
          "08:00 PM: Campfire dinner & overnight stay.",
        ],
      },
      {
        day: 2,
        title: "Betla Jungle Safari & Journey to Netarhat Hills",
        activities: [
          "05:45 AM: Early morning Open Jeep Safari into Core Zone of Betla National Park.",
          "Spot wild Asian elephants, deer, gaur (Indian bison), and exotic birds in their natural habitat.",
          "09:30 AM: Return to lodge for hearty hot breakfast.",
          "11:00 AM: Scenic ascending drive (95 km) through winding ghats towards Netarhat plateau.",
          "02:00 PM: Check-in at Netarhat resort. Lunch with pine forest view.",
          "04:45 PM: Evening sunset witness at Magnolia Point.",
          "08:00 PM: Delicious dinner & peaceful mountain sleep.",
        ],
      },
      {
        day: 3,
        title: "Full Day Netarhat: Sunrise, Falls & Heritage",
        activities: [
          "05:30 AM: Golden sunrise view from Netarhat Sunrise Point.",
          "08:30 AM: Valley breakfast. Visit Koel Viewpoint & dense Pine Forest trail.",
          "11:30 AM: Excursion to Upper Ghaghri Waterfall.",
          "01:30 PM: Farm-fresh tribal lunch.",
          "03:30 PM: Visit Netarhat Residential School and Governor's Chalet grounds.",
          "07:30 PM: Traditional Jharkhand cultural evening with local flute music & dinner.",
        ],
      },
      {
        day: 4,
        title: "Lower Ghaghri & Return Journey to Ranchi",
        activities: [
          "08:00 AM: Breakfast and visit Netarhat Lake & Lower Ghaghri view.",
          "10:30 AM: Check-out and begin descend towards Ranchi.",
          "03:30 PM: Drop at Ranchi Airport or Railway Station.",
        ],
      },
    ],
    pricing: [
      { pax: "2 Travelers", pricePerPerson: "₹19,899", note: "1N Betla + 2N Netarhat Deluxe Stays" },
      { pax: "4 Travelers", pricePerPerson: "₹14,999", note: "Includes 1 Jungle Safari Permit + Private SUV" },
      { pax: "6+ Travelers", pricePerPerson: "₹11,999", note: "Group Discount + Dedicated Naturalist Guide" },
    ],
    inclusions: [
      "1 Night stay in Betla forest lodge + 2 Nights in Netarhat",
      "All meals: 3 breakfasts, 4 lunches, 3 dinners",
      "1 Open Jeep Safari into Betla National Park with forest guide & permits",
      "All transfers & sightseeing in private AC SUV",
      "All entry fees, monument taxes, driver allowances",
    ],
    exclusions: [
      "Camera fees inside National Park",
      "Personal tips and alcoholic beverages",
      "GST (5%)",
    ],
  },
  {
    id: "jharkhand-wildlife-netarhat-4n5d",
    slug: "jharkhand-wildlife-netarhat-4n5d",
    title: "Grand Jharkhand Nature & Safari Expedition (4N/5D)",
    subtitle: "Ranchi, Betla Safari, Lodh Falls & Netarhat Complete Circuit",
    duration: "4 Nights / 5 Days",
    destination: "Netarhat, Betla & Lodh",
    startingPrice: 24999,
    rating: 4.95,
    reviewsCount: 64,
    badge: "Complete Expedition",
    image: "/images/magnolia_sunset.jpg",
    alt: "Sunset over valleys from Magnolia point",
    overview:
      "The definitive deep-nature experience of western Jharkhand. Discover the thunderous Lodh Falls (Jharkhand's highest waterfall dropping 143 meters), twin safaris in Betla National Park, tribal village cultural walks, and unhurried days atop the misty Netarhat plateau.",
    highlights: [
      "Visit Lodh Falls (Burha Ghagh) – the majestic highest waterfall in Jharkhand",
      "2 wildlife safaris in Betla (morning jeep safari + evening nature drive)",
      "Palamau Forts archaeological exploration with photography expert",
      "2 nights in Netarhat with sunrise, sunset, pine trails and orchards",
      "Cultural interaction with Asur and Oraon tribal artisans",
      "Luxury eco-stay arrangements with local organic cuisine",
    ],
    itinerary: [
      {
        day: 1,
        title: "Ranchi Arrival & Transfer to Betla National Park",
        activities: [
          "Arrival in Ranchi. Scenic drive to Betla forest fringe.",
          "Evening nature walk around Kechki confluence of Auranga and Koel rivers.",
          "Dinner and briefing about Palamau Tiger Reserve.",
        ],
      },
      {
        day: 2,
        title: "Twin Safari & Historic Palamau Forts",
        activities: [
          "Dawn jeep safari inside Betla core forest.",
          "Afternoon exploration of 16th century Palamau Fort ruins.",
          "Evening bird-watching session by Kamaldah Lake.",
        ],
      },
      {
        day: 3,
        title: "Betla to Lodh Falls & Ascend to Netarhat",
        activities: [
          "Excursion to the breathtaking Lodh Falls (143 m drop) in Mahuadanr valley.",
          "Picnic lunch near the mist of Lodh falls.",
          "Scenic mountain drive ascending to Netarhat plateau.",
          "Sunset celebration at Magnolia Sunset Point.",
        ],
      },
      {
        day: 4,
        title: "Complete Netarhat Exploration",
        activities: [
          "Early morning sunrise at Sunrise Point.",
          "Trek through Pine Forest and visit Upper & Lower Ghaghri falls.",
          "Visit Netarhat Vidyalaya and Netarhat Dam.",
          "Cultural tribal dance performance by evening bonfire.",
        ],
      },
      {
        day: 5,
        title: "Koel Viewpoint & Departure to Ranchi",
        activities: [
          "Morning photography session at Koel river viewpoint.",
          "Breakfast, souvenir shopping for local tribal handicrafts & honey.",
          "Drive back to Ranchi airport/station by 04:00 PM.",
        ],
      },
    ],
    pricing: [
      { pax: "2 Travelers", pricePerPerson: "₹24,999", note: "Luxury Room Stays + All Safari Bookings" },
      { pax: "4 Travelers", pricePerPerson: "₹18,999", note: "Includes Lodh Falls Special Excursion" },
      { pax: "6+ Travelers", pricePerPerson: "₹14,999", note: "Dedicated Naturalist + Full Vehicle" },
    ],
    inclusions: [
      "4 Nights accommodation (2N Betla + 2N Netarhat)",
      "All meals included from Day 1 lunch to Day 5 lunch",
      "2 Jeep safaris in Betla with permits and naturalist",
      "Excursion to Lodh Falls & Palamau Forts",
      "Private AC vehicle with expert mountain driver",
    ],
    exclusions: ["Airfare/train fare", "Personal porterage", "GST (5%)"],
  },
];

export const destinations = {
  netarhat: {
    slug: "netarhat",
    name: "Netarhat",
    title: "Netarhat, Jharkhand — The Queen of Chotanagpur",
    tagline: "Misty pine forests, dramatic sunrises & timeless colonial serenity",
    elevation: "1,128 meters (3,700 ft)",
    bestTime: "October to April (Pleasant summers, crisp winters with morning frost)",
    heroImage: "/images/netarhat_sunrise.jpg",
    heroAlt: "Sunrise over Netarhat hills",
    description:
      "Perched on the highest plateau of Jharkhand, Netarhat is reverently known as the 'Queen of Chotanagpur'. Blessed with cool mountain breezes, fragrant pine groves, crystalline streams, and unforgettable sunrises and sunsets, it remains one of Eastern India's most pristine hill sanctuaries. Netarhat is also celebrated for its educational heritage, home to the prestigious Netarhat Vidyalaya.",
    attractions: [
      {
        name: "Magnolia Sunset Point",
        description:
          "The crowning jewel of Netarhat, offering a sweeping 180-degree vista of deep valleys and forested horizons bathed in glowing sunset amber hues. Named after a British maiden Magnolia who fell in love with a local shepherd, this viewpoint is an emotional and visual wonder.",
        image: "/images/magnolia_sunset.jpg",
        alt: "Tourists watching sunset at Magnolia Point Netarhat",
      },
      {
        name: "Netarhat Sunrise Point",
        description:
          "Located near Hotel Prabhat Vihar, this vantage point presents an awe-inspiring dawn spectacle as the golden sun breaks through misty cloud layers rolling across the distant Chotanagpur hills.",
        image: "/images/netarhat_sunrise.jpg",
        alt: "Sunrise view over Netarhat hills",
      },
      {
        name: "Upper Ghaghri Waterfall",
        description:
          "A picturesque 4 km woodland drive leads to Upper Ghaghri, where crystal mountain waters cascade down natural stone terraces into a tranquil pool surrounded by lush flora.",
        image: "/images/ghaghri_waterfalls.jpg",
        alt: "Cascading waters of Upper Ghaghri falls",
      },
      {
        name: "Netarhat Pine Forest",
        description:
          "Planted during the British colonial era, these tall and dense pine trees cast dappled shadows along cool walking paths. The pine scent and crisp mountain air offer a European hill-station atmosphere.",
        image: "/images/netarhat_stay.jpg",
        alt: "Pine forest trail and heritage cottage in Netarhat",
      },
      {
        name: "Koel View Point",
        description:
          "Located about 11 km from town, Koel View Point overlooks the snaking Koel River shimmering far below the dense forested gorge, especially captivating under afternoon sunlight.",
        image: "/images/ghaghri_waterfalls.jpg",
        alt: "Koel river valley view from Netarhat",
      },
      {
        name: "Netarhat Vidyalaya (Residential School)",
        description:
          "Established in 1954 on the Gurukul model, this world-renowned institution has produced top civil servants, scientists, doctors, and engineers of India, preserving inspiring architectural and academic traditions.",
        image: "/images/netarhat_stay.jpg",
        alt: "Netarhat heritage campus",
      },
    ],
    howToReach: [
      {
        mode: "By Air",
        details:
          "Nearest airport is Birsa Munda Airport in Ranchi (IXR), located approximately 156 km away. Direct flights operate from Delhi, Mumbai, Kolkata, Bengaluru, and Patna. We provide direct private SUV transfers from the airport.",
      },
      {
        mode: "By Train",
        details:
          "Ranchi Railway Station (156 km) and Latehar Railway Station (115 km) are the most convenient railheads with trains from all major Indian cities. Private cabs meet guests upon arrival.",
      },
      {
        mode: "By Road",
        details:
          "Well connected by NH 75 and state highways from Ranchi via Bero, Kuru, and Ghaghra. The final 35 km ascent through dense forests and serpentine ghats is one of Eastern India's most scenic drives.",
      },
    ],
    facts: [
      { label: "Altitude", value: "1,128 meters above sea level" },
      { label: "District", value: "Latehar, Jharkhand" },
      { label: "Ideal Trip Length", value: "2 Nights / 3 Days" },
      { label: "Known For", value: "Sunsets, Pine Forest, Waterfalls" },
    ],
  },
  betla: {
    slug: "betla",
    name: "Betla",
    title: "Betla National Park & Palamau Tiger Reserve, Jharkhand",
    tagline: "Wild elephant herds, elusive tigers & ancient forest fortresses",
    elevation: "350 meters above sea level",
    bestTime: "November to May (Forest safaris open, peak wildlife sightings by waterholes)",
    heroImage: "/images/betla_safari.jpg",
    heroAlt: "Wild elephants in Betla National Park",
    description:
      "Betla National Park, spanning the lush valleys of the Palamau Tiger Reserve, is one of India's earliest national parks and Project Tiger reserves. Dominated by dense Sal, bamboo, and teak groves, Betla is sanctuary to wild elephant herds, tigers, leopards, gaur, chital, sambar, and over 170 species of birds. Hidden deep within the canopies stand the haunting stone ramparts of the 16th-century Palamau Forts.",
    attractions: [
      {
        name: "Betla Jungle Safari (Jeep & Elephant)",
        description:
          "Guided morning and afternoon 4x4 open safari drives penetrate deep into the sanctuary. Watch wild elephant families grazing, herds of spotted deer leaping across bamboo thickets, and rare gaurs.",
        image: "/images/betla_safari.jpg",
        alt: "Safari vehicle tracking elephants in Betla",
      },
      {
        name: "Historic Palamau Forts (Purana & Naya Kila)",
        description:
          "Dating back to the 16th and 17th centuries, these twin stone fortresses were constructed by the Chero kings Medini Ray and Pratap Ray. Encircled by banyan roots and tropical forests, the carved 'Nagpuri Gate' is an architectural masterpiece.",
        image: "/images/palamau_fort.jpg",
        alt: "Palamau Fort ruins deep inside jungle",
      },
      {
        name: "Kamaldah Lake",
        description:
          "A serene waterbody inside the sanctuary where waterbirds gather and wild elephants arrive at sundown for mud baths and drinking.",
        image: "/images/betla_safari.jpg",
        alt: "Kamaldah lake wildlife spot",
      },
      {
        name: "Mahuadanr Wolf Sanctuary (Nearby)",
        description:
          "India's only dedicated wolf sanctuary, protecting the endangered Indian gray wolf across the scrublands and sal forests of Latehar district.",
        image: "/images/betla_safari.jpg",
        alt: "Latehar wildlife wilderness",
      },
    ],
    howToReach: [
      {
        mode: "By Air",
        details:
          "Birsa Munda Airport Ranchi (175 km) is the primary gateway airport with daily flights connecting all major metros. Private taxi transfers take roughly 4 hours.",
      },
      {
        mode: "By Train",
        details:
          "Daltonganj Railway Station (25 km away) is the closest main station on the Barkakana-Son Nagar line. Barwadih Junction (15 km) also serves local trains. Ranchi Station (170 km) is the best hub.",
      },
      {
        mode: "By Road",
        details:
          "Located off the Ranchi-Daltonganj highway. Roads are scenic, passing through green rural valleys and Sal forests.",
      },
    ],
    facts: [
      { label: "Park Area", value: "226 sq km (Core Area)" },
      { label: "Key Wildlife", value: "Asian Elephants, Gaur, Leopards, Tigers, Chital" },
      { label: "Safari Timings", value: "06:00 - 10:00 AM & 02:30 - 05:30 PM" },
      { label: "Historic Highlight", value: "Palamau Forts (16th Century)" },
    ],
  },
};

export const stays = [
  {
    id: "dak-bungalow-netarhat",
    name: "Dak Bungalow, Netarhat",
    location: "Netarhat Hills",
    type: "Colonial Heritage Bungalow",
    rating: 4.8,
    reviews: 86,
    pricePerNight: "₹3,499",
    image: "/images/netarhat_stay.jpg",
    alt: "Exterior view of heritage Dak Bungalow in Netarhat",
    description:
      "A charming British colonial-era stone bungalow perched amidst soaring pine trees and blooming hillside gardens. Offers sprawling verandahs, vintage fireplace rooms, wooden ceilings, and attentive caretaker service.",
    amenities: ["Fireplace Rooms", "Heritage Verandah", "Pine Forest Views", "Home-Cooked Food", "Spacious Lawns"],
  },
  {
    id: "hotel-dreamdays-netarhat",
    name: "Hotel Dreamdays, Netarhat",
    location: "Near Bus Stand, Netarhat",
    type: "Deluxe Resort & Suites",
    rating: 4.7,
    reviews: 112,
    pricePerNight: "₹2,999",
    image: "/images/netarhat_stay.jpg",
    alt: "Deluxe resort cottages in Netarhat",
    description:
      "A modern eco-friendly resort designed with warm wooden interiors and private balconies overlooking the rolling valley. Convenient access to Magnolia Sunset Point and local markets.",
    amenities: ["Free High-speed Wi-Fi", "Multi-Cuisine Restaurant", "Private Balconies", "24/7 Power Backup", "Tour Desk"],
  },
  {
    id: "van-vihar-betla",
    name: "Hotel Van Vihar (JTDC), Betla",
    location: "Betla National Park Gate",
    type: "Govt. Tourism Forest Lodge",
    rating: 4.6,
    reviews: 94,
    pricePerNight: "₹2,499",
    image: "/images/netarhat_stay.jpg",
    alt: "Van Vihar forest lodge in Betla",
    description:
      "Run by Jharkhand Tourism Development Corporation, located right at the edge of Betla National Park. Perfect base for early morning safaris with monkeys and deer often roaming the boundary fence.",
    amenities: ["Direct Safari Access", "JTDC Dining Hall", "Spacious AC Rooms", "Garden Seating", "Parking Space"],
  },
  {
    id: "prabhat-vihar-netarhat",
    name: "Hotel Prabhat Vihar (JTDC), Netarhat",
    location: "Sunrise Point, Netarhat",
    type: "Hilltop Panorama Lodge",
    rating: 4.7,
    reviews: 130,
    pricePerNight: "₹2,799",
    image: "/images/netarhat_stay.jpg",
    alt: "Prabhat Vihar lodge at Sunrise Point Netarhat",
    description:
      "Legendary hilltop property situated right beside the Sunrise Point. Step out onto your balcony at 5:30 AM to watch the morning mist and sun rising over the distant valley without leaving your lodge.",
    amenities: ["Sunrise View Balcony", "On-site Dining", "Observation Deck", "Family Suites", "Warm Blankets & Heaters"],
  },
];

export const galleryItems = [
  {
    id: 1,
    title: "Golden Sunrise over Netarhat Plateau",
    location: "Netarhat",
    category: "Netarhat",
    image: "/images/netarhat_sunrise.jpg",
    alt: "Sunrise view from Netarhat viewpoint overlooking misty valleys",
    caption: "Early morning mist dissipating under golden rays across the Chotanagpur mountain range.",
  },
  {
    id: 2,
    title: "Elephant Herd on Betla Safari Trail",
    location: "Betla National Park",
    category: "Betla",
    image: "/images/betla_safari.jpg",
    alt: "Wild Asian elephant family in Betla National Park jungle",
    caption: "Mother elephant with baby elephant 'Rakhi' grazing near the bamboo grove during morning jeep safari.",
  },
  {
    id: 3,
    title: "Magnolia Sunset Point Vista",
    location: "Netarhat",
    category: "Netarhat",
    image: "/images/magnolia_sunset.jpg",
    alt: "Tourists witnessing sunset over mountain horizon at Magnolia Point",
    caption: "The world-famous sunset amber sky spreading across the boundless Chotanagpur horizon.",
  },
  {
    id: 4,
    title: "Upper Ghaghri & Lodh Waterfalls",
    location: "Netarhat Region",
    category: "Waterfalls",
    image: "/images/ghaghri_waterfalls.jpg",
    alt: "Cascading waterfall plunging through subtropical forest rocks in Jharkhand",
    caption: "Pristine mountain stream descending into natural rock pools enveloped by sal and pine woods.",
  },
  {
    id: 5,
    title: "16th-Century Palamau Fort Ramparts",
    location: "Betla Forest",
    category: "Heritage",
    image: "/images/palamau_fort.jpg",
    alt: "Ancient stone fort ruins surrounded by banyan trees and jungle vines",
    caption: "Historical ruins of Chero dynasty forts hidden deep inside the Palamau Tiger Reserve.",
  },
  {
    id: 6,
    title: "Colonial Pine Cottages & Dak Bungalow",
    location: "Netarhat",
    category: "Stays",
    image: "/images/netarhat_stay.jpg",
    alt: "Heritage Dak Bungalow with flower garden and tall pine trees in Netarhat",
    caption: "Historic retreats surrounded by pine groves offering tranquility and fresh mountain air.",
  },
];

export const blogPosts = [
  {
    slug: "10-must-see-spots-in-netarhat",
    title: "10 Must-See Spots in Netarhat: The Queen of Chotanagpur",
    excerpt:
      "From the romantic legend of Magnolia Sunset Point to the hidden cascades of Ghaghri, here is your essential guide to Netarhat's most scenic destinations.",
    date: "February 15, 2026",
    author: "Netarhat Travel Desk",
    readTime: "6 min read",
    category: "Travel Guide",
    image: "/images/netarhat_sunrise.jpg",
    alt: "Netarhat morning vista",
    content: `
Netarhat, elevated at 1,128 meters above sea level in the Latehar district of Jharkhand, is affectionately known as the "Queen of Chotanagpur". A haven of dense pine groves, sal woods, rolling hills, and pleasant mountain breezes, it offers a refreshing respite from busy city life.

### 1. Magnolia Sunset Point
The crown jewel of Netarhat. Perched on a high ridge overlooking boundless valleys, this point is famed for sunsets that ignite the sky in dramatic sunset amber, orange, and crimson tones. The tragic colonial love story between the British maiden Magnolia and a local tribal youth lends an enduring poetic charm to this spot.

### 2. Sunrise Point at Prabhat Vihar
Greet the dawn at Sunrise Point, where the sun rises above rolling layers of misty blue mountains. Watching the fog drift across the valleys below as the morning light turns warm and golden is an experience that stays with you forever.

### 3. Upper Ghaghri Waterfall
Located about 4 km from Netarhat town, this charming waterfall cascades down rock terraces surrounded by lush subtropical foliage. It's a favorite spot for serene picnics and nature walks.

### 4. British-Era Pine Forest
Planted over a century ago, the tall pines of Netarhat offer cool walking tracks with fragrant needles underfoot. The play of morning sunlight filtering through towering branches feels straight out of a classic mountain storybook.

### 5. Koel River Viewpoint
A sweeping viewpoint where visitors can look down upon the silvery bends of the Koel River traversing lush valley bottoms.

Plan your journey with Netarhat Betla Tourism to experience these wondrous spots with comfortable stays, expert local guides, and seamless transport.
    `,
  },
  {
    slug: "wildlife-safari-guide-betla-national-park",
    title: "Wildlife Safari in Betla National Park: Elephants, Forts & Forest Trails",
    excerpt:
      "Everything you need to know about planning an unforgettable safari in Betla National Park, from jeep permits to elephant tracking and visiting the ancient Palamau Forts.",
    date: "February 22, 2026",
    author: "Chief Wildlife Naturalist",
    readTime: "7 min read",
    category: "Wildlife & Safari",
    image: "/images/betla_safari.jpg",
    alt: "Elephant safari in Betla National Park",
    content: `
Betla National Park, spanning 226 square kilometers in the Palamau Tiger Reserve of Jharkhand, is one of India's earliest protected wilderness reserves. Famous for wild elephant herds, rich bird diversity, and ancient history, Betla provides an immersive jungle adventure.

### The Safari Experience
Betla offers two safari shifts daily:
- **Morning Safari:** 06:00 AM to 10:00 AM (Ideal for active wildlife movements and birdwatching)
- **Afternoon Safari:** 02:30 PM to 05:30 PM (Great for seeing elephant herds heading to waterholes)

### Wildlife to Spot
Visitors frequently encounter wild Asian elephants, including the park's beloved younger elephants like "Rakhi", herds of spotted deer (chital), sambar, Indian bison (gaur), wild boars, and the elusive Indian leopard. Over 170 species of resident and migratory birds inhabit the sal and bamboo canopies.

### The Historic Palamau Forts
Deep inside the forested sanctuary stand the 16th-century Palamau Forts built by the Chero rulers. Overgrown with fig and banyan roots, the carved stone gates like the famed Nagpuri Gate offer an unforgettable intersection of archaeology and wild nature.

Book your Betla safari package with our certified guides who know every trail and waterhole in the reserve.
    `,
  },
  {
    slug: "best-time-to-visit-netarhat-betla",
    title: "Best Time to Visit Netarhat and Betla: Weather, Seasons & Packing Tips",
    excerpt:
      "Understand the seasonal weather across Netarhat's cool highlands and Betla's wildlife sanctuary to choose the perfect time for your Jharkhand holiday.",
    date: "March 02, 2026",
    author: "Tour Operations Team",
    readTime: "5 min read",
    category: "Travel Tips",
    image: "/images/magnolia_sunset.jpg",
    alt: "Magnolia point sunset view",
    content: `
When planning a trip to Netarhat and Betla, timing your visit enhances the experience significantly. Because Netarhat is an elevated hill station (1,128m) while Betla lies in lower forested valleys (350m), the two offer complementary weather profiles.

### October to February (Autumn & Winter) - Peak Season
- **Weather:** Crisp, cool days (12°C to 24°C) with chilly nights in Netarhat dropping to 4°C to 8°C. Morning mist and dew carpet the valleys.
- **Highlights:** Mesmerizing clear sunrises and sunsets at Magnolia Point; pleasant safari conditions in Betla.
- **Packing:** Light woolens for the day and heavy jackets or thermal wear for early mornings and late evenings.

### March to May (Spring & Summer) - Best for Wildlife Sightings
- **Weather:** Warm days (28°C to 36°C) in Betla, but pleasantly temperate in Netarhat.
- **Highlights:** Deciduous trees shed leaves and water sources dry up, making wildlife congregating around waterholes in Betla very easy to spot.
- **Packing:** Cotton clothes, sun hats, polarized sunglasses, and safari binoculars.

### June to September (Monsoon) - Lush Greenery & Roaring Waterfalls
- **Weather:** Abundant rainfall, misty fog rolling across pine woods.
- **Highlights:** Waterfalls like Upper Ghaghri and Lodh Falls are in full thunderous roar. The entire plateau turns emerald green.
    `,
  },
];

export const testimonials = [
  {
    name: "Dr. Anirban Mukherjee",
    location: "Kolkata, West Bengal",
    rating: 5,
    tour: "Ranchi – Netarhat – Ranchi (2N/3D)",
    comment:
      "Our 3-day family trip to Netarhat organized by Netarhat Betla Tourism was extraordinary. The sunrise from Prabhat Vihar and sunset at Magnolia Point took our breath away. The driver-guide was polite, knowledgeable, and the stay at the Dak Bungalow was nostalgic and peaceful.",
  },
  {
    name: "Sneha & Rohit Verma",
    location: "Patna, Bihar",
    rating: 5,
    tour: "Ranchi – Betla – Netarhat (3N/4D)",
    comment:
      "Spotting a herd of wild elephants in Betla National Park was a dream come true for our kids! Combining that with the cool pine woods of Netarhat was the best decision. Everything was pre-arranged seamlessly. Highly recommend Netarhat Betla Tourism!",
  },
  {
    name: "Vikramaditya Sahay",
    location: "Ranchi, Jharkhand",
    rating: 5,
    tour: "Grand Jharkhand Nature Expedition",
    comment:
      "Being from Jharkhand, I had no idea our state had such pristine and well-managed eco-tourism experiences. Lodh Falls was magnificent, and the local tribal lunch was delicious. 10/10 service and transparent pricing.",
  },
];

export const whyChooseUs = [
  {
    icon: "ShieldCheck",
    title: "Govt. Approved & Certified",
    description: "Official tour operator with certified forest naturalists and expert local hill drivers.",
  },
  {
    icon: "Compass",
    title: "Curated Eco-Tourism",
    description: "Responsible travel honoring tribal heritage, preserving forests, and supporting local communities.",
  },
  {
    icon: "BedDouble",
    title: "Handpicked Clean Stays",
    description: "Verified comfortable resorts, heritage Dak bungalows, and forest eco-lodges with hot water & good food.",
  },
  {
    icon: "PhoneCall",
    title: "24/7 On-Ground Support",
    description: "Dedicated trip coordinator on WhatsApp and phone from arrival in Ranchi until departure.",
  },
];
