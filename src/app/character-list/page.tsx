"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Pagination from "../components/Pagination";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
}

interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

interface CharacterData {
  info: Info;
  results: Character[];
}

const CharacterList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [info, setInfo] = useState<Info | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();

  const fetchCharacters = async (page: number) => {
    setLoading(true);
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
    const data: CharacterData = await response.json();
    setCharacters(data.results);
    setInfo(data.info);
    setLoading(false);
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Alive":
        return "group-hover:bg-black";
      case "Dead":
        return "group-hover:bg-red-600";
      case "unknown":
        return "group-hover:bg-yellow-600";
      default:
        return "group-hover:bg-black";
    }
  };

  return (
    <section className="container mx-auto p-8 lg:p-12">
      <div className="flex flex-col lg:flex-row mb-8 items-center justify-between gap-8">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex w-full lg:w-auto gap-2 items-center justify-center py-3 px-6 rounded-2xl bg-white text-black font-bold border-2 border-white hover:bg-gray-500 hover:text-white transition-all duration-100">
          <FaArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <input
          type="text"
          placeholder="Search characters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-black lg:w-1/2 text-white py-3 px-6 border rounded-2xl"
        />

        <button
          onClick={() => router.push("/character-by-location")}
          className="flex w-full lg:w-auto gap-2 items-center justify-center py-3 px-6 rounded-2xl bg-white text-black font-bold border-2 border-white hover:bg-gray-500 hover:text-white transition-all duration-100">
          Character by Location
          <FaArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col gap-8 lg:gap-12 items-center justify-center">
        <h1 className="text-3xl font-bold">Character List</h1>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <span className="text-xl">Loading...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {filteredCharacters.map((character) => (
              <div key={character.id} className="relative group">
                <Link href={`/character-detail/${character.id}`}>
                  <Image
                    src={character.image}
                    alt={character.name}
                    width={1000}
                    height={1000}
                    className="rounded-2xl transition-transform duration-300"
                  />
                  <div
                    className={`flex flex-col absolute rounded-2xl inset-0 opacity-0 ${getStatusClass(
                      character.status
                    )} group-hover:bg-opacity-60 group-hover:opacity-100 transition-all duration-300 items-center justify-center`}>
                    <div className="flex flex-col gap-4 items-center justify-center text-center">
                      <span className="text-3xl font-bold">{character.name}</span>
                      <span className="font-bold">{character.status}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          totalPages={info?.pages || 1}
          onPageChange={setCurrentPage}
          hasPrev={!!info?.prev}
          hasNext={!!info?.next}
          displayCount={`Showing ${filteredCharacters.length} of ${info?.count || 0} characters`}
        />
      </div>
    </section>
  );
};

export default CharacterList;
