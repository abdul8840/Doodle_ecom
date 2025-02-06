import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs-extra";  // Import fs-extra

// Storage configuration for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/"));
  },
  filename: function (req, file, cb) {
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
const productImgResize = async (req, res, next) => {
  if (!req.files) return next(); // If no files are uploaded, skip resizing

  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)  // Resize to 300x300 pixels
        .toFormat("jpeg")  // Convert to JPEG
        .jpeg({ quality: 90 })  // Set quality to 90%
        .toFile(`public/images/products/${file.filename}`);  // Save resized file

      // Remove the original uploaded file
      await fs.remove(file.path); // Use fs-extra's remove() for file deletion
    })
  );

  next(); // Continue to next middleware
};

// Blog image resizing function (similar to product image resizing)
const blogImgResize = async (req, res, next) => {
  if (!req.files) return next();  // If no files are uploaded, skip resizing

  await Promise.all(
    req.files.map(async (file) => {
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

// Export functions
export { uploadPhoto, productImgResize, blogImgResize };
