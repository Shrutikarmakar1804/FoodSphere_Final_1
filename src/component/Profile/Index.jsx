import {
  Bell,
  ClipboardList,
  MessageSquare,
  Repeat,
  Shield,
  Star,
  Trash,
  User,
  X
} from "lucide-react";
import { useState } from "react";

import { Drawer, IconButton } from "@mui/material";
import Favourites from "./Sections/Favourites";
import Feedback from "./Sections/Feedback";
import Order from "./Sections/Order";
import Refunds from "./Sections/Refunds";
import SidebarItem from "./SidebarItem";
import Privacy from "./sections/Privacy";
import Subscription from "./sections/Subscription";
import UserInfo from "./sections/UserInfo";
import Notification from "./Sections/Notification";


export default function SettingsDrawer() {
  const [open, setOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("User Info");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const confirmDelete = () => {
    window.location.href = "/";
  };

  const sections = {
    "User Info": <UserInfo />,
    Refunds: <Refunds />,
    Notification: <Notification />,
    Privacy: <Privacy />,
    Subscription: <Subscription />,
    Feedback: <Feedback />,
    Favourites: <Favourites />,
    Orders: <Order />,
  };

  return (
    <>
      {/* Avatar Icon (trigger button)
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hidden md:block"
      >
        <User className="w-5 h-5 text-gray-700 dark:text-white" />
      </button> */}

      {/* MUI Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          className: "w-1/2 bg-white dark:bg-black-900 p-5 overflow-y-auto",
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Settings</h1>
          <IconButton
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </IconButton>
        </div>

        {/* Sidebar and Section Content */}
        <div className="flex gap-6">
          <aside className="w-48 space-y-2">
            <SidebarItem
              icon={User}
              label="User Info"
              selected={selectedSection === "User Info"}
              onClick={() => setSelectedSection("User Info")}
            />
            <SidebarItem
              icon={Repeat}
              label="Refunds"
              selected={selectedSection === "Refunds"}
              onClick={() => setSelectedSection("Refunds")}
            />
            <SidebarItem
              icon={Bell}
              label="Notifications"
              selected={selectedSection === "Notifications"}
              onClick={() => setSelectedSection("Notifications")}
            />
            <SidebarItem
              icon={Shield}
              label="Privacy"
              selected={selectedSection === "Privacy"}
              onClick={() => setSelectedSection("Privacy")}
            />
            <SidebarItem
              icon={ClipboardList}
              label="Subscription"
              selected={selectedSection === "Subscription"}
              onClick={() => setSelectedSection("Subscription")}
            />
            <SidebarItem
              icon={ClipboardList}
              label="Orders"
              selected={selectedSection === "Orders"}
              onClick={() => setSelectedSection("Orders")}
            />
            <SidebarItem
              icon={Star}
              label="Favourites"
              selected={selectedSection === "Favourites"}
              onClick={() => setSelectedSection("Favourites")}
            />
            <SidebarItem
              icon={MessageSquare}
              label="Feedback"
              selected={selectedSection === "Feedback"}
              onClick={() => setSelectedSection("Feedback")}
            />

            <button
              onClick={() => setShowConfirmModal(true)}
              className="flex items-center gap-2 text-red-600 hover:text-red-800 mt-4"
            >
              <Trash className="w-4 h-4" /> Delete Account
            </button>
          </aside>

          <main className="flex-1 max-w-2xl w-full">
            {sections[selectedSection]}
          </main>
        </div>
      </Drawer>

      {/* Delete Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full space-y-4">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
