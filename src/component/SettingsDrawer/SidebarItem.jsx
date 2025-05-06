export default function SidebarItem({ icon: Icon, label, selected, onClick }) {
    return (
      <button
        onClick={onClick}
        className={`flex items-center gap-3 p-2 rounded-md text-sm w-full text-left transition ${
          selected
            ? "bg-black-100 text-white-700 front-bold dark:bg-black-900"
            : "hover:bg-black-100 dark:hover:bg-black-800 text-gray-700 dark:text-gray-200"
        }`}
      >
        <Icon className="w-5 h-5" />
        {label}
      </button>
    );
  }
  