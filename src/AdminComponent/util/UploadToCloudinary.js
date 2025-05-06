const upload_preset = "FoodSphere"; // Make sure this preset exists in Cloudinary!
const cloud_name = "dcconejjp";
const api_url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

export const uploadImageToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", upload_preset);

  try {
    const res = await fetch(api_url, {
      method: "POST",
      body: data
    });

    const result = await res.json();

    if (result.secure_url) {
      console.log("Cloudinary URL:", result.secure_url);
      return result.secure_url;
    } else {
      console.error("Cloudinary error:", result);
      return null;
    }
  } catch (error) {
    console.error("Upload failed:", error);
    return null;
  }
};
