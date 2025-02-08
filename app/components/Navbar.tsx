"use client"; // Ensure that this component is client-side only in Next.js

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { MovieData } from "./types"; // Assuming you have defined types for Movie data

// WebSocket URL
const ws = new WebSocket("ws://localhost:8090");

// Define proper interface instead of empty one


const Navbar: React.FC = () => {
    const [searchInput, setInput] = useState<string>(""); // Search input
    const [isClient, setIsClient] = useState<boolean>(false); // Flag for client-side rendering
    const [waiting, setWaiting] = useState<boolean>(false); // Flag for waiting state
    const [children, setChildren] = useState<React.ReactNode[]>([]); // JSX for movie suggestions

    const router = useRouter();

    // Effect hook to set client flag
    useEffect(() => {
        setIsClient(true); // Set client-side flag to true
    }, []);

    // WebSocket message handler
    const handleWebSocketMessage = useCallback((msg: MessageEvent) => {
        const data = JSON.parse(msg.data);

        if (data.t === "autocreply" && searchInput.length) {
            // Handle autocomplete reply, create suggestions based on response
            const suggestions = data.data.map((s: MovieData) => (
              <div 
              onClick={() => gotomov(s._id)} 
              id={s._id} 
              className="sugg flex items-center p-2 hover:bg-gray-600 cursor-pointer z-100" 
              key={s._id}
          >
            <img src={s.poster || "/thumb.webp"} alt="poster" width={40} height={56} className="object-cover mr-3" />
             
              <span className="text-sm">{s.title}</span>
          </div>
            ));
            setChildren(suggestions);
        } else if (data.t === "inforeply" && data.data) {
            // Handle movie info reply
            if (waiting) {
                router.push(`/movie/${data.data._id}`);
                setWaiting(false);
            }
        }
    }, [searchInput, waiting, router]);

    // Effect to listen for WebSocket messages
    useEffect(() => {
        ws.onmessage = handleWebSocketMessage;
        return () => {
            ws.onmessage = null; // Cleanup on unmount
        };
    }, [handleWebSocketMessage]);

    // Search input handler
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setInput(query);

        // Send search query if input exists
        if (query) {
            ws.send(JSON.stringify({ t: "autoc", data: query }));
        }
    };

    // Go to movie detail
    const gotomov = (id: string) => {
        ws.send(JSON.stringify({ t: "info", data: id }));
        setWaiting(true);
    };

    // Handle client-side rendering
    if (!isClient) {
        return null; // Return nothing until the component is client-side rendered
    }

    return (
        <div className="bg-dark p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    {/* Logo */}
                    <div className="text-white text-2xl font-semibold">MovieFlix</div>
                </div>

                <div className="relative w-1/2">
                    {/* Search Bar */}
                    <input
                        type="text"
                        value={searchInput}
                        onChange={handleSearch}
                        className="w-full p-2 pl-10 pr-4 rounded bg-gray-800 text-white focus:outline-none"
                        placeholder="Search for a movie..."
                    />
                    {/* Search Icon */}
                    <div className="absolute left-3 top-2.5 text-white">
                        <FaSearch />
                    </div>

                    {/* Suggestion Box */}
                    <div
                        className={`absolute top-full  z-10 left-0 w-full bg-gray-700 text-white rounded mt-1 ${!searchInput ? "hidden" : ""}`}
                        style={{ display: searchInput ? 'block' : 'none' }}
                    >
                        {searchInput && children }
                        
                    </div>
                </div>

                {/* Navbar links */}
                <div className="text-white space-x-4">
                    <button
                        className="hover:text-gray-400"
                        onClick={() => router.push("/home")}
                    >
                        Home
                    </button>
                    <button
                        className="hover:text-gray-400"
                        onClick={() => router.push("/movies")}
                    >
                        Movies
                    </button>
                    <button
                        className="hover:text-gray-400"
                        onClick={() => router.push("/about")}
                    >
                        About
                    </button>
                    <button
                        className="hover:text-gray-400"
                        onClick={() => router.push("/login")}
                    >
                        Log out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
