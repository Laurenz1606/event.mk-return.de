import React from "react";

export default function InstaButton() {
  return (
    <a href="https://www.instagram.com/mk_return/" target="_blank" rel="noreferrer">
      <div
        className="mx-4 p-4 rounded-full text-white text-center text-xl font-bold"
        style={{
          background:
            "linear-gradient(149deg, rgb(81, 91, 212) 0%, rgb(221, 42, 123) 50%, rgb(245, 133, 41) 100%)",
        }}
      >
        Folge uns auf Instagram
      </div>
    </a>
  );
}
