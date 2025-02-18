"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const locations = ["Earth", "Mars", "Venus"];

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
  image: string;
  created: string;
  assignedLocation: string | null; // Allow null for unassigned characters
}

export default function CharacterByLocation() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const fetchCharactersByLocation = (location: string) => {
    const assignedCharacters = Object.keys(localStorage)
      .filter((key) => key.startsWith("character-"))
      .map((key) => JSON.parse(localStorage.getItem(key)!))
      .filter((character: Character) => character.assignedLocation === location);
    setCharacters(assignedCharacters);
  };

  useEffect(() => {
    if (selectedLocation) {
      fetchCharactersByLocation(selectedLocation);
    }
  }, [selectedLocation]);

  return (
    <section className="container mx-auto p-8 flex flex-col gap-8 max-w-screen-lg">
      <h1 className="text-3xl font-bold text-center flex items-center justify-center">
        Characters by Location
      </h1>
      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
        className="w-full lg:w-1/2 self-center bg-black text-white py-2 px-4 rounded-lg border-2 border-white font-bold cursor-pointer">
        <option value="">Select a location</option>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {characters.length > 0 ? (
          characters.map((character) => (
            <div key={character.id} className="p-4 border-2 border-white rounded-lg">
              <h2 className="text-xl font-bold">{character.name}</h2>
              <p>Status: {character.status}</p>
              <p>Species: {character.species}</p>
              <p>Gender: {character.gender}</p>
              <p>Assigned Location: {character.assignedLocation}</p>
            </div>
          ))
        ) : (
          <p>No characters assigned to this location.</p>
        )}
      </div>

      <button
        onClick={() => router.push("/character-list")}
        className="w-full lg:w-1/2 self-center px-4 py-2 font-bold bg-white border-2 border-white text-black hover:bg-gray-500 hover:text-white transition-all duration-150 rounded-lg">
        Return
      </button>
    </section>
  );
}
