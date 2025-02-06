import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs-extra";  // Import fs-extra to handle file system operations
import { fileURLToPath } from "url";

// Define __dirname manually for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Storage configuration for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the destination folder for uploaded files
    cb(null, path.join(__dirname, "../public/images/"));
  },
  filename: function (req, file, cb) {
    // Generate a unique filename
    const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniquesuffix + ".jpeg");
  },
});

// File filter for Multer (only allow image files)
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

// Multer upload configuration
const uploadPhoto = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
});

// Product image resizing function
// const productImgResize = async (req, res, next) => {
//   if (!req.files) return next(); // If no files are uploaded, skip resizing

//   await Promise.all(
//     req.files.map(async (file) => {
//       try {
//         // Resize and save the image
//         await sharp(file.path)
//           .resize(300, 300)  // Resize to 300x300 pixels
//           .toFormat("jpeg")  // Convert to JPEG
//           .jpeg({ quality: 90 })  // Set quality to 90%
//           .toFile(`public/images/products/${file.filename}`);  // Save resized file

//         // Delay before deleting the original file to ensure it's no longer in use
//         await new Promise((resolve) => setTimeout(resolve, 200));  // 200ms delay

//         // Remove the original uploaded file
//         await fs.remove(file.path);  // Use fs-extra's remove() for file deletion

//       } catch (error) {
//         console.error(`Error processing file ${file.filename}:`, error);
//       }
//     })
//   );

//   next(); // Continue to next middleware
// };


// Blog image resizing function (similar to product image resizing)
const blogImgResize = async (req, res, next) => {
  if (!req.files) return next();  // If no files are uploaded, skip resizing

  await Promise.all(
    req.files.map(async (file) => {
      // Resize and save the image
      await sharp(file.path)
        .resize(300, 300)  // Resize to 300x300 pixels
        .toFormat("jpeg")  // Convert to JPEG
        .jpeg({ quality: 90 })  // Set quality to 90%
        .toFile(`public/images/blogs/${file.filename}`);  // Save resized file

      // Remove the original uploaded file
      await fs.remove(file.path);  // Use fs-extra's remove() for file deletion
    })
  );

  next(); // Continue to next middleware
};

// Export functions for use in routes
export { uploadPhoto, blogImgResize };
