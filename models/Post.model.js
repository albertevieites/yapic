const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  postPhotoUrl: {
    type: String,
    default: "https://easterntradelinks.com/front/images/default.png",
  },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String },
  description: { type: String, required: true, maxlength: 300 },
  tags: {
    type: [String],
    required: false,
    enum: [
      "3D printing",
      "Amateur radio",
      "Scrapbook",
      "Acting",
      "Baton twirling",
      "Board games",
      "Book restoration",
      "Cabaret",
      "Calligraphy",
      "Candle making",
      "Computer programming",
      "Coffee roasting",
      "Cooking",
      "Colouring",
      "Cosplaying",
      "Couponing",
      "Creative writing",
      "Crocheting",
      "Cryptography",
      "Dance",
      "Digital arts",
      "Drama",
      "Drawing",
      "Do it yourself",
      "Electronics",
      "Embroidery",
      "Fashion",
      "Flower arranging",
      "Foreign language learning",
      "Gaming",
      "Tabletop games",
      "Role-playing games",
      "Gambling",
      "Genealogy",
      "Glassblowing",
      "Gunsmithing",
      "Homebrewing",
      "Ice skating",
      "Jewelry making",
      "Jigsaw puzzles",
      "Juggling",
      "Knapping",
      "Knitting",
      "Kabaddi",
      "Knife making",
      "Lacemaking",
      "Lapidary",
      "Leather crafting",
      "Lego building",
      "Lockpicking",
      "Machining",
      "Macrame",
      "Metalworking",
      "Magic",
      "Model building",
      "Listening to music",
      "Origami",
      "Painting",
      "Playing musical instruments",
      "Pet",
      "Poi",
      "Pottery",
      "Puzzles",
      "Quilting",
      "Reading",
      "Scrapbooking",
      "Sculpting",
      "Sewing",
      "Singing",
      "Sketching",
      "Soapmaking",
      "Sports",
      "Stand-up comedy",
      "Sudoku",
      "Table tennis",
      "Taxidermy",
      "Video gaming",
      "Watching movies",
      "Web surfing",
      "Whittling",
      "Wood carving",
      "Woodworking",
      "World Building",
      "Writing",
      "Yoga",
      "Yo-yoing",
      "Air sports",
      "Archery",
      "Architecture",
      "Astronomy",
      "Backpacking",
      "Base jumping",
      "Baseball",
      "Basketball",
      "Beekeeping",
      "Bird watching",
      "Blacksmithing",
      "Board sports",
      "Bodybuilding",
      "Brazilian jiu-jitsu",
      "Community",
      "Cycling",
      "Dowsing",
      "Driving",
      "Fishing",
      "Football",
      "Flying",
      "Flying disc",
      "Foraging",
      "Gardening",
      "Geocaching",
      "Ghost hunting",
      "Graffiti",
      "Handball",
      "Hiking",
      "Hooping",
      "Horseback riding",
      "Hunting",
      "Inline skating",
      "Jogging",
      "Kayaking",
      "Kite flying",
      "Kitesurfing",
      "Larping",
      "Letterboxing",
      "Metal detecting",
      "Motor sports",
      "Mountain biking",
      "Mountaineering",
      "Mushroom hunting",
      "Mycology",
      "Netball",
      "Nordic skating",
      "Orienteering",
      "Paintball",
      "Parkour",
      "Photography",
      "Polo",
      "Rafting",
      "Rappelling",
      "Rock climbing",
      "Roller skating",
      "Rugby",
      "Running",
      "Sailing",
      "Sand art",
      "Scouting",
      "Scuba diving",
      "Sculling",
      "Rowing",
      "Shooting",
      "Shopping",
      "Skateboarding",
      "Skiing",
      "Skim Boarding",
      "Skydiving",
      "Slacklining",
      "Snowboarding",
      "Stone skipping",
      "Surfing",
      "Swimming",
      "Taekwondo",
      "Tai chi",
      "Urban exploration",
      "Vacation",
      "Vehicle restoration",
      "Water sports",
    ],
  },
  date: {
    type: Date,
    default: () => Date.now()
  },
});

const Post = model("Post", postSchema);

module.exports = Post;


