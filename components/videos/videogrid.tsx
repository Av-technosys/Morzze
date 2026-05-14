"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

type VideoType = {
  id: string;
  link: string;
  title: string;
  thumbnail: string | null;
  videoDescription: string | null;
  videoCategory: string | null;
  isVisible: boolean;
  createdAt?: string;
};

const tabs = [
  "All",
  "Product Demos",
  "Brand Films",
  "Installation Guides",
  "Customer Testimonials",
];

function getEmbedUrl(url: string) {
  if (!url) return "";

  if (url.includes("youtube.com/watch?v=")) {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }

  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }

  if (url.includes("youtube.com/embed/")) {
    return `${url}?autoplay=1`;
  }

  return url;
}

export default function VideoLibraryGrid() {
  const [activeTab, setActiveTab] = useState("All");
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch("/api/videos", {
          cache: "no-store",
        });

        const data = await res.json();

        if (data.success) {
          setVideos(data.data.filter((video: VideoType) => video.isVisible));
        }
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    }

    fetchVideos();
  }, []);

  const filtered =
    activeTab === "All"
      ? videos
      : videos.filter((video) => video.videoCategory === activeTab);

  return (
    <section className="w-full bg-black text-white">
      <div className="px-4 md:px-8 lg:px-10 py-10 md:py-14 max-w-7xl mx-auto">
        <div className="overflow-x-auto scrollbar-hide border-b border-[#1d1d1d] pb-5 mb-12">
          <div className="flex gap-5 min-w-max">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(tab)}
                className={`px-7 h-10 rounded-full text-[13px] whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? "bg-[#e6aa12] text-black"
                    : "text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10"
          >
            {filtered.length === 0 ? (
              <p className="text-[#777777] text-sm col-span-full">
                No videos found.
              </p>
            ) : (
              filtered.map((video, i) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="relative w-full h-[150px] overflow-hidden rounded-[4px] mb-4">
                    <Image
                      src={video.thumbnail || "/video.png"}
                      alt={video.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-700"
                      unoptimized
                    />

                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-black">
                        <Play size={18} className="fill-black ml-1" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-[16px] font-medium leading-7 text-[#f5f2ea] mb-2">
                    {video.title}
                  </h3>

                  <p className="text-[13px] leading-6 text-[#777777] mb-4 line-clamp-2">
                    {video.videoDescription}
                  </p>

                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="px-2 py-[3px] bg-[#e6aa12] text-black rounded-[2px]">
                      {video.videoCategory || "Video"}
                    </span>

                    {video.createdAt && (
                      <span className="text-[#7a7a7a]">
                        {new Date(video.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl bg-[#111] rounded-lg overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/70 flex items-center justify-center text-white hover:bg-black"
              >
                <X size={20} />
              </button>

              <div className="relative w-full aspect-video bg-black">
                <iframe
                  src={getEmbedUrl(selectedVideo.link)}
                  title={selectedVideo.title}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {selectedVideo.title}
                </h3>

                <p className="text-sm text-[#8a8a8a] leading-6">
                  {selectedVideo.videoDescription}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-[#121212] px-4 md:px-8 py-16 md:py-20 text-center">
        <h3 className="text-[34px] md:text-[46px] font-semibold mb-4">
          Subscribe to Our Channel
        </h3>

        <p className="max-w-2xl mx-auto text-[14px] leading-7 text-[#7a7a7a] mb-8">
          Get notified about new bathroom and kitchen product videos,
          installation tips, and exclusive content.
        </p>

        <button className="px-8 h-11 bg-[#e3342f] rounded-[4px] text-white text-[13px] font-medium">
          ▶ Subscribe on YouTube
        </button>
      </div>
    </section>
  );
}