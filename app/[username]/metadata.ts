import { Metadata } from 'next'

type Props = {
  params: { username: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = params.username
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${username}`, {
      next: { revalidate: 3600 } // Revalidate every hour
    })
    
    if (!response.ok) {
      return {
        title: 'Portfolio Not Found | Quickfolio',
        description: 'This portfolio does not exist on Quickfolio.',
      }
    }
    
    const user = await response.json()
    
    return {
      title: `${user.name} - ${user.title || 'Portfolio'} | Quickfolio`,
      description: user.bio || `Check out ${user.name}'s professional portfolio on Quickfolio. View projects, skills, and experience.`,
      keywords: [
        user.name,
        user.title,
        'portfolio',
        'professional portfolio',
        username,
        ...(user.skills?.map((s: any) => s.name) || [])
      ],
      authors: [{ name: user.name }],
      openGraph: {
        title: `${user.name} - ${user.title || 'Portfolio'}`,
        description: user.bio || `Check out ${user.name}'s professional portfolio`,
        url: `https://quickfolio.in/${username}`,
        siteName: 'Quickfolio',
        images: [
          {
            url: user.avatar_url || '/avatar.png',
            width: 1200,
            height: 630,
            alt: `${user.name}'s Portfolio`,
          },
        ],
        type: 'profile',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${user.name} - ${user.title || 'Portfolio'}`,
        description: user.bio || `Check out ${user.name}'s professional portfolio`,
        images: [user.avatar_url || '/avatar.png'],
      },
      alternates: {
        canonical: `https://quickfolio.in/${username}`,
      },
    }
  } catch (error) {
    return {
      title: 'Portfolio | Quickfolio',
      description: 'Professional portfolio on Quickfolio',
    }
  }
}
