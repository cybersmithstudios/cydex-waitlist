import React, { useState } from 'react';
import { Mail, User, Home, Loader2, CheckCircle } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  hall: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  hall?: string;
}

const WaitlistForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    hall: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.hall.trim()) {
      newErrors.hall = 'Hall is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to Zapier webhook for Excel integration
      const response = await fetch('YOUR_ZAPIER_WEBHOOK_URL_HERE', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: 'student',
          timestamp: new Date().toISOString(),
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-card border border-border/50 shadow-xl rounded-2xl p-8 text-center animate-fade-in">
        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-bold font-clash mb-4">Welcome to Cydex!</h3>
        <p className="text-muted-foreground font-clash mb-6">
          You're now on our exclusive waitlist. We'll notify you as soon as Cydex launches in your area.
        </p>
        <div className="bg-primary-light/50 border border-primary/20 rounded-lg p-4">
          <p className="text-sm text-primary font-semibold font-clash">
            🎉 Founding Member Status: Activated
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border/50 shadow-xl rounded-2xl p-8 animate-slide-up">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold font-clash mb-2">Join the Waitlist</h3>
        <p className="text-muted-foreground font-clash">
          Be among the first 5,000 founding members and unlock exclusive benefits.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-foreground font-clash mb-2">
              First Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`input-field pl-10 ${errors.firstName ? 'border-destructive' : ''}`}
                placeholder="Enter your first name"
              />
            </div>
            {errors.firstName && (
              <p className="mt-1 text-sm text-destructive font-clash">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-foreground font-clash mb-2">
              Last Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`input-field pl-10 ${errors.lastName ? 'border-destructive' : ''}`}
                placeholder="Enter your last name"
              />
            </div>
            {errors.lastName && (
              <p className="mt-1 text-sm text-destructive font-clash">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground font-clash mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input-field pl-10 ${errors.email ? 'border-destructive' : ''}`}
              placeholder="Enter your email address"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-destructive font-clash">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="hall" className="block text-sm font-medium text-foreground font-clash mb-2">
            Hall of Residence
          </label>
          <div className="relative">
            <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <select
              id="hall"
              name="hall"
              value={formData.hall}
              onChange={handleChange}
              className={`input-field pl-10 ${errors.hall ? 'border-destructive' : ''}`}
            >
              <option value="">Select your hall</option>
              <option value="Kuti Hall">Kuti Hall</option>
              <option value="Zik Hall">Zik Hall</option>
              <option value="Bello Hall">Bello Hall</option>
              <option value="Indi Hall">Indi Hall</option>
              <option value="Idia Hall">Idia Hall</option>
              <option value="Awo Hall">Awo Hall</option>
              <option value="Queens Hall">Queens Hall</option>
              <option value="Tedder Hall">Tedder Hall</option>
              <option value="Mellanby Hall">Mellanby Hall</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {errors.hall && (
            <p className="mt-1 text-sm text-destructive font-clash">{errors.hall}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary-hover text-primary-foreground font-clash rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin w-5 h-5 mr-2" />
              Joining Waitlist...
            </>
          ) : (
            'Secure My Founding Member Spot'
          )}
        </button>

        <p className="text-xs text-muted-foreground text-center font-clash">
          By joining, you agree to receive updates about Cydex. No spam, unsubscribe anytime.
        </p>
      </form>
    </div>
  );
};

export default WaitlistForm;