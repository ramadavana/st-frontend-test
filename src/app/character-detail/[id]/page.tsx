"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { FormatDate } from "@/utils/FormatDate";

interface CharacterDetail {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
  image: string;
  created: string;
  assignedLocation: string | null;
}

export default function CharacterDetail() {
  const router = useRouter();
  const { id } = useParams();
  const [character, setCharacter] = useState<CharacterDetail | null>(null);
  const [location, setLocation] = useState<string>("");

  const fetchCharacterDetail = async (id: string) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const data: CharacterDetail = await response.json();
    setCharacter(data);
  };

  useEffect(() => {
    if (id) {
      fetchCharacterDetail(id as string);
    }
  }, [id]);

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "Dead":
        return "text-red-600";
      case "unknown":
        return "text-yellow-600";
      default:
        return "";
    }
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(event.target.value);
  };

  const assignLocation = () => {
    if (character) {
      const updatedCharacter = { ...character, assignedLocation: location };
      setCharacter(updatedCharacter);
      localStorage.setItem(`character-${character.id}`, JSON.stringify(updatedCharacter));
    }
  };

  useEffect(() => {
    const storedCharacter = localStorage.getItem(`character-${id}`);
    if (storedCharacter) {
      setCharacter(JSON.parse(storedCharacter));
    }
  }, [id]);

  if (!character)
    return <div className="flex items-center justify-center p-8 min-h-screen">Loading...</div>;

  return (
    <section className="container mx-auto items-center justify-center min-h-screen flex flex-col gap-8 p-8">
      <h1 className="text-3xl font-bold">{character.name}</h1>

      <div className="flex flex-col items-center gap-8 lg:flex-row">
        <Image
          src={character.image}
          alt={character.name}
          width={500}
          height={500}
          className="rounded-2xl"
        />

        <div className="flex flex-col gap-8 w-full lg:w-fit">
          <div className="flex flex-col gap-2 p-4 border-2 border-white rounded-2xl w-full">
            <div className="grid grid-cols-5 md:grid-cols-6">
              <p>Status</p>
              <span className="text-center">:</span>
              <p
                className={`col-span-3 lg:col-span-4 font-semibold ${getStatusClasses(
                  character.status
                )}`}>
                {character.status}
              </p>
            </div>
            <div className="grid grid-cols-5 md:grid-cols-6">
              <p>Species</p>
              <span className="text-center">:</span>
              <p className="col-span-3 lg:col-span-4 font-semibold">{character.species}</p>
            </div>
            <div className="grid grid-cols-5 md:grid-cols-6">
              <p>Gender</p>
              <span className="text-center">:</span>
              <p className="col-span-3 lg:col-span-4 font-semibold">{character.gender}</p>
            </div>
            <div className="grid grid-cols-5 md:grid-cols-6">
              <p>Origin</p>
              <span className="text-center">:</span>
              <p className="col-span-3 lg:col-span-4 font-semibold">{character.origin.name}</p>
            </div>
            <div className="grid grid-cols-5 md:grid-cols-6">
              <p>Location</p>
              <span className="text-center">:</span>
              <p className="col-span-3 lg:col-span-4 font-semibold">{character.location.name}</p>
            </div>
            <div className="grid grid-cols-5 md:grid-cols-6">
              <p>Assigned Location</p>
              <span className="text-center">:</span>
              <p
                className={`col-span-3 lg:col-span-4 font-semibold ${
                  localStorage.getItem(`character-${id}`) ? "text-green-500" : "text-red-500"
                }`}>
                {character.assignedLocation || localStorage.getItem(`character-${id}`)
                  ? "Already assigned"
                  : "Not assigned yet"}
              </p>
            </div>
            <div className="grid grid-cols-5 md:grid-cols-6">
              <p>Created</p>
              <span className="text-center">:</span>
              <p className="col-span-3 lg:col-span-4 font-semibold">
                {FormatDate(character.created)}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-8">
            <select
              name="location"
              id="location"
              value={location}
              onChange={handleLocationChange}
              className="bg-black text-white py-2 px-4 w-full rounded-lg border-2 border-white font-bold cursor-pointer">
              <option value="">Select a location</option>
              <option value="Earth">Earth</option>
              <option value="Mars">Mars</option>
              <option value="Venus">Venus</option>
            </select>

            <button
              onClick={
                character.status === "Alive"
                  ? () => assignLocation()
                  : character.status === "unknown"
                  ? () => alert("You need to find this character first!")
                  : () => {
                      alert("You can't assign a dead character.");
                    }
              }
              className="px-4 py-2 font-bold bg-white border-2 border-white text-black hover:bg-gray-500 hover:text-white transition-all duration-150 rounded-lg">
              Assign
            </button>
          </div>

          <button
            onClick={() => router.push("/character-list")}
            className="flex items-center gap-2 justify-center py-3 px-6 rounded-2xl bg-white text-black font-bold border-2 border-white hover:bg-gray-500 hover:text-white transition-all duration-100 w-full">
            Return
          </button>
        </div>
      </div>
    </section>
  );
}
