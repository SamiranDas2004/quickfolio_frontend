"use client";
import Image from "next/image";
import { SharedBackground, getTextColor, getSecondaryTextColor } from "@/components/SharedBackground";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { useState, useEffect } from "react";
import { User } from "@/types/user";
import { useParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import { LoaderFive } from "@/components/ui/loader";

export default function UserPortfolio() {
  const params = useParams();
  const username = params.username as string;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [backgroundType, setBackgroundType] = useState<"ripple" | "beams" | "lines" | "blackpanther" | "evil_linux" | "linux" | "windows_xp">("ripple");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/users/${username}`);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setBackgroundType(userData.background_preference);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUser();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <LoaderFive text="Loading Portfolio" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Portfolio Not Found</h1>
          <p className="text-zinc-400">The username "{username}" doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center font-sans overflow-hidden">
      <SharedBackground backgroundType={backgroundType} />

      <main className="relative z-10 flex min-h-screen w-full max-w-4xl flex-col items-center justify-center px-8 bg-transparent">
        <div className="text-center space-y-6">
          {/* Avatar Section */}
          <div className="mb-8">
            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <Image
                src={user.avatar_url || "/avatar.png"}
                alt={user.name}
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="h-40 flex items-center justify-center">
            <TextHoverEffect text={user.name} />
          </div>
          <p className={`text-xl md:text-2xl ${getTextColor(backgroundType)}`}>
            {user.title}
          </p>
          <p className={`text-lg max-w-2xl mx-auto ${getSecondaryTextColor(backgroundType)}`}>
            {user.bio}
          </p>
          <Navigation username={username} />
        </div>
      </main>
    </div>
  );
}