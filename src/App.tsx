import React from 'react';
import { 
  Rocket, 
  Leaf, 
  Zap, 
  Shield, 
  Clock, 
  Star, 
  CheckCircle, 
  Users, 
  Home,
  TrendingUp,
  Store
} from 'lucide-react';
import AnimatedCounter from './components/AnimatedCounter';
import WaitlistForm from './components/WaitlistForm';
import VendorWaitlistForm from './components/VendorWaitlistForm';
import BenefitCard from './components/BenefitCard';

function App() {
  const [activeForm, setActiveForm] = React.useState<'student' | 'vendor'>('student');

  const benefits = [
    {
      icon: Leaf,
      title: "100% Eco-Friendly",
      description: "Electric bikes and carbon-neutral operations. Every delivery helps reduce environmental impact while keeping costs low.",
    },
    {
      icon: Zap,
      title: "Lightning Fast Delivery",
      description: "30-minute average delivery time within halls. Our optimized routes and dedicated student riders ensure quick service.",
    },
    {
      icon: Shield,
      title: "Student-Safe Network",
      description: "All riders are verified students from your halls. Secure, reliable, and built by students, for students.",
    },
    {
      icon: Clock,
      title: "24/7 Hall Service",
      description: "Late-night study sessions? We've got you covered. Food, supplies, and essentials delivered around the clock.",
    },
  ];

  const foundingMemberPerks = [
    "50% off delivery fees for your first 6 months",
    "Priority delivery during peak hours",
    "Exclusive access to new features before general release",
    "Monthly sustainability impact reports",
    "Direct line to our founders for feedback and suggestions",
    "Founding Member badge and special recognition in the app",
  ];

  const halls = [
    "Kuti Hall", "Zik Hall", "Bello Hall", "Indi Hall", "Idia Hall", 
    "Awo Hall", "Queens Hall", "Tedder Hall", "Mellanby Hall"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary-light">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary-light opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-light text-primary border border-primary/20 text-sm font-semibold font-clash mb-8 animate-bounce-gentle">
              <Rocket className="w-4 h-4 mr-2" />
              Launching Soon
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold font-clash mb-6 animate-slide-up">
              <span className="gradient-text">
                Join the Future of
              </span>
              <br />
              <span className="gradient-text">
                Sustainable Delivery
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground font-clash max-w-4xl mx-auto mb-12 animate-slide-up leading-relaxed" style={{animationDelay: '200ms'}}>
              Be the first to experience Nigeria's most innovative eco-friendly delivery platform. 
              <br className="hidden md:block" />
              Zero emissions, maximum convenience, built for students.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up" style={{animationDelay: '400ms'}}>
              <button 
                onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({behavior: 'smooth'})}
                className="btn-primary text-lg px-8 py-4"
              >
                Join Waitlist Now
              </button>
              <button className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold py-4 px-8 rounded-lg transition-all duration-200 font-clash">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-slide-up">
              <div className="text-3xl font-bold text-primary font-clash mb-2">
                <AnimatedCounter end={2847} suffix="+" />
              </div>
              <div className="text-sm text-muted-foreground font-clash">Students Already Joined</div>
            </div>
            <div className="animate-slide-up" style={{animationDelay: '100ms'}}>
              <div className="text-3xl font-bold text-primary font-clash mb-2">
                <AnimatedCounter end={9} suffix="" />
              </div>
              <div className="text-sm text-muted-foreground font-clash">Halls Partnered</div>
            </div>
            <div className="animate-slide-up" style={{animationDelay: '200ms'}}>
              <div className="text-3xl font-bold text-primary font-clash mb-2">
                <AnimatedCounter end={95} suffix="%" />
              </div>
              <div className="text-sm text-muted-foreground font-clash">Carbon Footprint Reduction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-primary-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-clash mb-6">Why Choose Cydex?</h2>
            <p className="text-xl text-muted-foreground font-clash max-w-3xl mx-auto">
              We're not just another delivery app. We're building the future of sustainable, student-focused logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={benefit.title}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Founding Member Perks */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-light text-primary border border-primary/20 text-sm font-semibold font-clash mb-6">
                <Star className="w-4 h-4 mr-2" />
                Exclusive Founding Member Benefits
              </div>
              <h2 className="text-4xl font-bold font-clash mb-4">Join the First 5,000</h2>
              <p className="text-xl text-muted-foreground font-clash">
                Early supporters get lifetime perks and exclusive access to shape Cydex's future.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-r from-primary/5 to-primary-light border border-primary/10 animate-slide-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {foundingMemberPerks.map((perk, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground font-clash">{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Form */}
      <section id="waitlist-form" className="py-20 bg-primary-light/20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Form Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-card border border-border/50 rounded-lg p-1 inline-flex">
              <button
                onClick={() => setActiveForm('student')}
                className={`px-6 py-3 rounded-md font-semibold font-clash transition-all duration-200 ${
                  activeForm === 'student'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Users className="w-4 h-4 mr-2 inline" />
                Students
              </button>
              <button
                onClick={() => setActiveForm('vendor')}
                className={`px-6 py-3 rounded-md font-semibold font-clash transition-all duration-200 ${
                  activeForm === 'vendor'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Store className="w-4 h-4 mr-2 inline" />
                Vendors
              </button>
            </div>
          </div>

          {/* Forms */}
          <div className="max-w-2xl mx-auto">
            {activeForm === 'student' ? <WaitlistForm /> : <VendorWaitlistForm />}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-primary-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold font-clash mb-4">Partnering with Top University Halls</h3>
            <p className="text-muted-foreground font-clash">
              We're working closely with leading halls of residence to bring sustainable delivery to every student.
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-center">
            {halls.map((hall, index) => (
              <div 
                key={hall} 
                className="p-4 bg-background/60 rounded-lg border border-border/30 hover:border-primary/30 transition-colors duration-300 animate-fade-in"
                style={{animationDelay: `${index * 50}ms`}}
              >
                <Home className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-sm text-muted-foreground font-medium font-clash">
                  {hall}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-background border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Leaf className="w-8 h-8 text-primary mr-3" />
              <span className="text-2xl font-bold font-clash">Cydex</span>
            </div>
            <p className="text-muted-foreground font-clash mb-8 max-w-2xl mx-auto">
              Building Nigeria's most sustainable delivery network, one hall at a time. 
              Join us in creating a greener future for student communities.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-muted-foreground font-clash">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span>Student-Built Platform</span>
              </div>
              <div className="flex items-center">
                <Leaf className="w-4 h-4 mr-2" />
                <span>100% Carbon Neutral</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                <span>Nigerian Innovation</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;