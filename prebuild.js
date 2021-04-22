const imagemin = require("imagemin");
const imageminWebp = require("imagemin-webp");

const destination = "src/assets/images/optimized";

(async () => {
  console.log(`Converting images to WebP. This could take a few minutes...`);

  await imagemin(["src/assets/images/**/*.{jpg,png}"], destination, {
    use: [imageminWebp({ quality: 70, method: 6 })],
  });

  console.log(`Images saved as WebP in ${destination}.`);
})();
