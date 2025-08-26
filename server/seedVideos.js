import mongoose from "mongoose";
import dotenv from "dotenv";
import Video from "./models/video.model.js";
import User from "./models/user.model.js";

dotenv.config();

async function seedVideos() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Optional: ensure a user exists as uploader
    const uploaderEmail = "anshika.skj@gmail.com";
    let uploader = await User.findOne({ email: uploaderEmail });
    if (!uploader) {
      // create a minimal uploader user if not exists
      uploader = await User.create({
        username: "Anshika",
        email: uploaderEmail,
        password: "seeded", // placeholder - not used for login here
        avatar: "https://i.pravatar.cc/150?u=anshika"
      });
    }

    const sampleVideos = [
      {
        title: "Learn React in 30 Minutes",
        thumbnailUrl: "https://via.placeholder.com/480x270.png?text=React+30+Min",
        description: "Quick tutorial for beginners.",
        channelId: null,
        uploader: uploader._id || uploader,
        views: 15200,
        likes: 1023,
        dislikes: 45,
        uploadDate: new Date(),
      },
      {
        title: "Node.js Crash Course",
        thumbnailUrl: "https://via.placeholder.com/480x270.png?text=Node+Crash+Course",
        description: "Backend basics in Node.js.",
        channelId: null,
        uploader: uploader._id || uploader,
        views: 8500,
        likes: 420,
        dislikes: 12,
        uploadDate: new Date(),
      }
    ];

    await Video.deleteMany({});
    await Video.insertMany(sampleVideos);

    console.log("✅ Videos seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding videos:", err);
    process.exit(1);
  }
}

seedVideos();
