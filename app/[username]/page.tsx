import Image from "next/image";
import { SharedBackground, getTextColor, getSecondaryTextColor } from "@/components/SharedBackground";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { User } from "@/types/user";
import Navigation from "@/components/Navigation";
import { LoaderFive } from "@/components/ui/loader";
import FullPagePortfolio from "@/components/FullPagePortfolio";
import ProfessionalPortfolio from "@/components/ProfessionalPortfolio";
import ModernPortfolio from "@/components/ModernPortfolio";
import TerminalStyle from "@/components/TerminalStyle";
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${username}`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      return {
        title: 'Portfolio Not Found | Quickfolio',
        description: 'This portfolio does not exist on Quickfolio.',
      };
    }
    
    const user = await response.json();
    
    return {
      title: `${user.name} - ${user.title || 'Portfolio'} | Quickfolio`,
      description: user.bio || `Check out ${user.name}'s professional portfolio on Quickfolio. View projects, skills, and experience.`,
      openGraph: {
        title: `${user.name} - ${user.title || 'Portfolio'}`,
        description: user.bio || `Check out ${user.name}'s professional portfolio`,
        url: `https://quickfolio.in/${username}`,
        siteName: 'Quickfolio',
        images: [{ url: user.avatar_url || '/avatar.png', width: 1200, height: 630, alt: `${user.name}'s Portfolio` }],
        type: 'profile',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${user.name} - ${user.title || 'Portfolio'}`,
        description: user.bio || `Check out ${user.name}'s professional portfolio`,
        images: [user.avatar_url || '/avatar.png'],
      },
      alternates: { canonical: `https://quickfolio.in/${username}` },
    };
  } catch {
    return { title: 'Portfolio | Quickfolio', description: 'Professional portfolio on Quickfolio' };
  }
}

export default async function UserPortfolio({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  let user: User | null = null;
  let loading = false;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${username}`, {
      next: { revalidate: 3600 }
    });
    if (response.ok) {
      user = await response.json();
    }
  } catch (error) {
    console.error("Error fetching user:", error);
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

  // Render full-page template if selected
  if (user?.template_type === "fullpage") {
    return <FullPagePortfolio user={user} />;
  }

  // Render professional template if selected
  if (user?.template_type === "professional") {
    return <ProfessionalPortfolio user={user} />;
  }

  // Render modern template if selected
  if (user?.template_type === "modern") {
    return <ModernPortfolio user={user} />;
  }

  // Render terminal template if selected
  if (user?.template_type === "terminal") {
    return <TerminalStyle user={user} />;
  }

  const backgroundType = user?.background_preference || "ripple";

  // Render conversational template (default)
  return (
    <div className="relative flex min-h-screen items-center justify-center font-sans overflow-hidden">
      <SharedBackground backgroundType={backgroundType} />

      <main className="relative z-10 flex min-h-screen w-full max-w-4xl flex-col items-center justify-center px-8 bg-transparent">
        <div className="text-center space-y-6">
          {/* Avatar Section */}
          <div className="mb-8">
            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <Image
                src={user?.avatar_url || "/avatar.png"}
                alt={user?.name || "User"}
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="h-40 w-full flex items-center justify-center overflow-visible px-8">
            <TextHoverEffect text={user?.name || "User"} />
          </div>
          <p className={`text-xl md:text-2xl ${getTextColor(backgroundType)}`}>
            {user?.title}
          </p>
          <p className={`text-lg max-w-2xl mx-auto ${getSecondaryTextColor(backgroundType)}`}>
            {user?.bio}
          </p>
          <Navigation username={username} currentPage="/" />
        </div>
      </main>
    </div>
  );
}