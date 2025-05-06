import React, { useState } from 'react';

export default function CartHoverPopup() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/*  Your Cart Icon */}
      <div className="text-white cursor-pointer relative">
      <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth={2}
  stroke="currentColor"
  className="h-8 w-8"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M2.25 2.25l1.5 1.5m0 0l3 9.75h11.25m-11.25 0a2.25 2.25 0 104.5 0m4.5 0a2.25 2.25 0 104.5 0m-13.5-9.75h14.25l-1.5 9.75H6.75"
  />
</svg>

      </div>

      {/* Popup card */}
      {isHovered && (
        <div className="absolute top-10 right-0 bg-white shadow-lg rounded-md p-6 w-72 z-50">
          {/* Orange notch */}
          <div className="absolute -top-1 right-10 w-3 h-3 bg-orange-500 rotate-45"></div>

          {/* Card Content */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Cart Empty</h2>
          <p className="text-gray-500 text-base">
            Good food is always cooking!<br />
            Go ahead, order some<br />
            yummy items from the menu.
          </p>
        </div>
      )}
    </div>
  );
}
