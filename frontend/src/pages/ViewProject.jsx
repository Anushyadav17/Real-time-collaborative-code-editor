import React from "react";
import Navbar from "../components/Navbar";

const ViewProject = () => {
  // Example Data
  const joinedRooms = [
    { id: 1, name: "Frontend Collaboration", description: "Work on UI designs together." },
    { id: 2, name: "Backend Development", description: "API and server discussions." },
    { id: 3, name: "Project Planning", description: "Brainstorming project ideas." },
  ];

  const createdRooms = [
    { id: 1, name: "Team Management", description: "Assign and track tasks." },
    { id: 2, name: "Design Feedback", description: "Get reviews on designs." },
  ];

  return (
    <div className="bg-richblack-900 text-white min-h-screen font-inter">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <header className="bg-richblue-800 py-8 text-center">
        <h1 className="text-3xl font-bold text-caribbeangreen-200">Your Rooms</h1>
        <p className="text-richblue-100 mt-2">View and manage the rooms you have joined or created.</p>
      </header>

      {/* Rooms Section */}
      <main className="py-10 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Joined Rooms */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-caribbeangreen-100 mb-4">Joined Rooms</h2>
            <div className="space-y-4">
              {joinedRooms.map((room) => (
                <div
                  key={room.id}
                  className="p-4 bg-richblack-800 rounded-md shadow-md hover:bg-richblack-700 transition"
                >
                  <h3 className="text-lg font-bold text-caribbeangreen-100">{room.name}</h3>
                  <p className="text-richblue-100 text-sm mt-1">{room.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Created Rooms */}
          <section>
            <h2 className="text-2xl font-semibold text-caribbeangreen-100 mb-4">Created Rooms</h2>
            <div className="space-y-4">
              {createdRooms.map((room) => (
                <div
                  key={room.id}
                  className="p-4 bg-richblack-800 rounded-md shadow-md hover:bg-richblack-700 transition"
                >
                  <h3 className="text-lg font-bold text-caribbeangreen-100">{room.name}</h3>
                  <p className="text-richblue-100 text-sm mt-1">{room.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-richblack-800 py-4 text-center text-richblue-100 text-sm">
        &copy; 2025 YourAppName. All rights reserved.
      </footer>
    </div>
  );
};

export default ViewProject;
