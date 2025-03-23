
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassMorphismCard } from "@/components/ui/GlassMorphismCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Users, CalendarDays, BookOpen, Heart } from "lucide-react";

const Community = () => {
  // Sample community events
  const events = [
    {
      id: 1,
      title: "Urban Farming Workshop",
      date: "November 15, 2023",
      time: "10:00 AM - 2:00 PM",
      location: "Community Garden, San Francisco",
      image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=400&h=300",
      organizer: "Thomas Rodriguez",
      attendees: 42
    },
    {
      id: 2,
      title: "Natural Pest Management",
      date: "November 18, 2023",
      time: "3:00 PM - 5:00 PM",
      location: "Virtual Workshop (Zoom)",
      image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=400&h=300",
      organizer: "Maya Patel",
      attendees: 76
    },
    {
      id: 3,
      title: "Seed Saving Exchange",
      date: "November 25, 2023",
      time: "11:00 AM - 4:00 PM",
      location: "Farmers Market, Portland",
      image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=400&h=300",
      organizer: "Green Earth Collective",
      attendees: 28
    }
  ];
  
  // Sample discussion topics
  const discussions = [
    {
      id: 1,
      title: "Water conservation techniques for small plots",
      author: "Thomas Rodriguez",
      authorImage: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=100&h=100",
      date: "2 days ago",
      replies: 24,
      likes: 37,
      tags: ["Water Conservation", "Small Scale"]
    },
    {
      id: 2,
      title: "Has anyone tried companion planting with marigolds?",
      author: "Maya Patel",
      authorImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=100&h=100",
      date: "1 week ago",
      replies: 42,
      likes: 53,
      tags: ["Pest Control", "Companion Planting"]
    },
    {
      id: 3,
      title: "Best natural fertilizers for citrus trees?",
      author: "Leila Nguyen",
      authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=100&h=100",
      date: "3 days ago",
      replies: 31,
      likes: 28,
      tags: ["Fertilizers", "Citrus"]
    },
    {
      id: 4,
      title: "Seeking advice on vertical gardening systems",
      author: "Carlos Mendoza",
      authorImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=100&h=100",
      date: "5 days ago",
      replies: 18,
      likes: 22,
      tags: ["Vertical Farming", "Space Saving"]
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative bg-agri-primary/5 py-16">
          <div className="bg-grain"></div>
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-agri-dark">
                Community Hub
              </h1>
              <p className="text-lg text-agri-dark/80 mb-6 text-pretty">
                Connect with farmers and conscious consumers. Share knowledge, attend events, and collaborate on sustainable food initiatives.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button className="rounded-full px-6 bg-agri-primary hover:bg-agri-primary/90 text-white">
                  Join the Community
                </Button>
                <Button className="rounded-full px-6 bg-transparent border border-agri-primary/20 text-agri-dark hover:bg-agri-primary/5" variant="outline">
                  Explore Discussions
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Upcoming Events */}
        <section className="py-16 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10">
              <div>
                <div className="inline-block px-4 py-1.5 bg-agri-primary/10 rounded-full text-agri-primary text-sm font-medium mb-4">
                  Community Events
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-agri-dark">
                  Upcoming Events
                </h2>
                <p className="text-lg text-agri-dark/80 mt-2 max-w-xl text-pretty">
                  Join workshops, meetups, and skill-sharing sessions with farmers and food enthusiasts.
                </p>
              </div>
              <Button className="rounded-full px-6 bg-agri-primary hover:bg-agri-primary/90 text-white mt-4 md:mt-0">
                View All Events
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <GlassMorphismCard 
                  key={event.id} 
                  className="animate-fade-up" 
                  style={{ animationDelay: `${index * 100}ms` }}
                  hoverEffect
                >
                  <div>
                    <div className="aspect-video rounded-lg overflow-hidden mb-4">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <CalendarDays className="h-4 w-4 text-agri-primary" />
                      <span className="text-sm font-medium">{event.date}</span>
                      <span className="text-xs text-agri-dark/60">• {event.time}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    
                    <p className="text-agri-dark/70 mb-3">{event.location}</p>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-agri-dark/10">
                      <div className="text-sm">
                        <span className="text-agri-dark/60">Organized by </span>
                        <span className="font-medium">{event.organizer}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-1 text-agri-secondary" />
                        <span>{event.attendees} attending</span>
                      </div>
                    </div>
                  </div>
                </GlassMorphismCard>
              ))}
            </div>
          </div>
        </section>
        
        {/* Discussion Forum */}
        <section className="py-16 bg-agri-primary/5 relative">
          <div className="bg-grain"></div>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10">
              <div>
                <div className="inline-block px-4 py-1.5 bg-agri-tertiary/20 rounded-full text-agri-tertiary text-sm font-medium mb-4">
                  Discussion Forum
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-agri-dark">
                  Popular Discussions
                </h2>
                <p className="text-lg text-agri-dark/80 mt-2 max-w-xl text-pretty">
                  Exchange knowledge, ask questions, and connect with a community of sustainable farming enthusiasts.
                </p>
              </div>
              <Button className="rounded-full px-6 bg-agri-tertiary hover:bg-agri-tertiary/90 text-white mt-4 md:mt-0">
                Start a Discussion
                <MessageSquare className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {discussions.map((discussion, index) => (
                <GlassMorphismCard 
                  key={discussion.id} 
                  className="animate-fade-up" 
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={discussion.authorImage}
                        alt={discussion.author}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="font-bold text-lg mb-1">{discussion.title}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                        <span className="text-agri-primary font-medium">{discussion.author}</span>
                        <span className="text-agri-dark/60">{discussion.date}</span>
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1 text-agri-dark/40" />
                          <span>{discussion.replies} replies</span>
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1 text-agri-dark/40" />
                          <span>{discussion.likes} likes</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex flex-wrap gap-2">
                        {discussion.tags.map((tag, i) => (
                          <span key={i} className="px-2 py-0.5 bg-agri-dark/5 rounded-full text-agri-dark/70 text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <Button variant="ghost" className="rounded-full px-4 text-agri-primary hover:bg-agri-primary/5">
                        View Thread
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </GlassMorphismCard>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button className="rounded-full px-6 bg-transparent border border-agri-primary text-agri-primary hover:bg-agri-primary/5" variant="outline">
                View All Discussions
              </Button>
            </div>
          </div>
        </section>
        
        {/* Resources Section */}
        <section className="py-16 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-block px-4 py-1.5 bg-agri-secondary/10 rounded-full text-agri-secondary text-sm font-medium mb-4">
                Knowledge Library
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-agri-dark">
                Community Resources
              </h2>
              <p className="text-lg text-agri-dark/70 text-pretty">
                Access guides, research papers, and educational materials on sustainable farming and conscious consumption.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <GlassMorphismCard className="animate-fade-up" style={{ animationDelay: "100ms" }} hoverEffect>
                <div className="flex flex-col h-full">
                  <div className="p-3 bg-amber-500/10 rounded-lg w-fit mb-4">
                    <BookOpen className="h-6 w-6 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Beginner's Guide to Natural Farming</h3>
                  <p className="text-agri-dark/70 mb-4 text-pretty flex-grow">
                    Learn the fundamentals of chemical-free farming practices, soil health, and natural pest management.
                  </p>
                  <Button className="w-full rounded-full bg-agri-secondary hover:bg-agri-secondary/90 text-white">
                    Download Guide
                  </Button>
                </div>
              </GlassMorphismCard>
              
              <GlassMorphismCard className="animate-fade-up" style={{ animationDelay: "200ms" }} hoverEffect>
                <div className="flex flex-col h-full">
                  <div className="p-3 bg-green-500/10 rounded-lg w-fit mb-4">
                    <BookOpen className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Seasonal Planting Calendar</h3>
                  <p className="text-agri-dark/70 mb-4 text-pretty flex-grow">
                    Region-specific planting schedules to help you plan your garden throughout the year.
                  </p>
                  <Button className="w-full rounded-full bg-agri-secondary hover:bg-agri-secondary/90 text-white">
                    View Calendar
                  </Button>
                </div>
              </GlassMorphismCard>
              
              <GlassMorphismCard className="animate-fade-up" style={{ animationDelay: "300ms" }} hoverEffect>
                <div className="flex flex-col h-full">
                  <div className="p-3 bg-blue-500/10 rounded-lg w-fit mb-4">
                    <BookOpen className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Water Conservation Techniques</h3>
                  <p className="text-agri-dark/70 mb-4 text-pretty flex-grow">
                    Practical methods to reduce water usage while maintaining healthy crop yields.
                  </p>
                  <Button className="w-full rounded-full bg-agri-secondary hover:bg-agri-secondary/90 text-white">
                    Read Article
                  </Button>
                </div>
              </GlassMorphismCard>
            </div>
            
            <div className="mt-10 text-center">
              <Button className="rounded-full px-6 bg-agri-secondary hover:bg-agri-secondary/90 text-white">
                Explore Resource Library
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Community;
