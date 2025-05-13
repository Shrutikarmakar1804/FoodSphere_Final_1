import { useRef, useState } from "react";

export default function UserInfo() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    bio: "A passionate developer who loves to build web apps.",
    profilePicture: "",
    address: "123 Main Street, Springfield",
    landmark: "Near Central Park",
  });

  const [tempUser, setTempUser] = useState({ ...user });
  const [isEditing, setIsEditing] = useState(true);
  const [previewImage, setPreviewImage] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setTempUser((prev) => ({ ...prev, profilePicture: imageUrl }));
    }
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    if (!tempUser.address || !tempUser.landmark) {
      alert("Please fill out all required fields including address and landmark.");
      return;
    }
    setUser({ ...tempUser });
    setIsEditing(false);
  };

  return (
    <div className="max-w-md mx-auto p-2 border rounded-xl shadow space-y-4">
      {isEditing ? (
        <>
          <h2 className="text-xl font-bold">Edit Your Information</h2>
          <div className="space-y-2">
            <label className="block">
              Name:
              <input
                name="name"
                className="mt-1 block w-full p-2 rounded border"
                value={tempUser.name}
                onChange={handleChange}
              />
            </label>
            <label className="block">
              Email:
              <input
                name="email"
                className="mt-1 block w-full p-2 rounded border"
                value={tempUser.email}
                onChange={handleChange}
              />
            </label>
            <label className="block">
              Phone Number:
              <input
                name="phone"
                className="mt-1 block w-full p-2 rounded border"
                value={tempUser.phone}
                onChange={handleChange}
              />
            </label>
            <label className="block">
              Bio:
              <textarea
                name="bio"
                className="mt-1 block w-full p-2 rounded border"
                rows={3}
                value={tempUser.bio}
                onChange={handleChange}
              />
            </label>
            <label className="block">
              Address:
              <input
                name="address"
                className="mt-1 block w-full p-2 rounded border"
                value={tempUser.address}
                onChange={handleChange}
                required
              />
            </label>
            <label className="block">
              Landmark:
              <input
                name="landmark"
                className="mt-1 block w-full p-2 rounded border"
                value={tempUser.landmark}
                onChange={handleChange}
                required
              />
            </label>
            <label className="block">
              Profile Picture:
              <button
                type="button"
                onClick={openFilePicker}
                className="mt-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Choose Picture
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageChange}
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="mt-2 w-24 h-24 object-cover rounded-full"
                />
              )}
            </label>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Your Profile</h2>
          {user.profilePicture && (
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          )}
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Bio:</strong> {user.bio}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Landmark:</strong> {user.landmark}</p>
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
