import React, { useState } from 'react';
import { Mail, User, Store, Phone, Loader2, CheckCircle, Package } from 'lucide-react';

interface VendorFormData {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  businessType: string;
  description: string;
}

interface VendorFormErrors {
  businessName?: string;
  ownerName?: string;
  email?: string;
  phone?: string;
  businessType?: string;
  description?: string;
}

const VendorWaitlistForm: React.FC = () => {
  const [formData, setFormData] = useState<VendorFormData>({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    businessType: '',
    description: '',
  });
  const [errors, setErrors] = useState<VendorFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: VendorFormErrors = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }

    if (!formData.ownerName.trim()) {
      newErrors.ownerName = 'Owner name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.businessType.trim()) {
      newErrors.businessType = 'Business type is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Business description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Please provide at least 20 characters describing your business';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof VendorFormErrors]) {
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
      const response = await fetch('YOUR_VENDOR_ZAPIER_WEBHOOK_URL_HERE', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: 'vendor',
          timestamp: new Date().toISOString(),
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting vendor form:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-card border border-border/50 shadow-xl rounded-2xl p-8 text-center animate-fade-in">
        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-bold font-clash mb-4">Welcome to Cydex Partners!</h3>
        <p className="text-muted-foreground font-clash mb-6">
          Thank you for your interest in partnering with Cydex. Our team will review your application and contact you within 48 hours.
        </p>
        <div className="bg-primary-light/50 border border-primary/20 rounded-lg p-4">
          <p className="text-sm text-primary font-semibold font-clash">
            🤝 Partner Application: Submitted Successfully
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border/50 shadow-xl rounded-2xl p-8 animate-slide-up">
      <div className="text-center mb-8">
        <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <Store className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold font-clash mb-2">Join as a Vendor Partner</h3>
        <p className="text-muted-foreground font-clash">
          Partner with Cydex to reach thousands of students across university halls. Zero setup fees for early partners.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="businessName" className="block text-sm font-medium text-foreground font-clash mb-2">
              Business Name
            </label>
            <div className="relative">
              <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className={`input-field pl-10 ${errors.businessName ? 'border-destructive' : ''}`}
                placeholder="Enter your business name"
              />
            </div>
            {errors.businessName && (
              <p className="mt-1 text-sm text-destructive font-clash">{errors.businessName}</p>
            )}
          </div>

          <div>
            <label htmlFor="ownerName" className="block text-sm font-medium text-foreground font-clash mb-2">
              Owner/Manager Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                id="ownerName"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                className={`input-field pl-10 ${errors.ownerName ? 'border-destructive' : ''}`}
                placeholder="Enter owner/manager name"
              />
            </div>
            {errors.ownerName && (
              <p className="mt-1 text-sm text-destructive font-clash">{errors.ownerName}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground font-clash mb-2">
              Business Email
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
                placeholder="Enter business email"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-destructive font-clash">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-foreground font-clash mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`input-field pl-10 ${errors.phone ? 'border-destructive' : ''}`}
                placeholder="Enter phone number"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-destructive font-clash">{errors.phone}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="businessType" className="block text-sm font-medium text-foreground font-clash mb-2">
            Business Type
          </label>
          <div className="relative">
            <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <select
              id="businessType"
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              className={`input-field pl-10 ${errors.businessType ? 'border-destructive' : ''}`}
            >
              <option value="">Select business type</option>
              <option value="Restaurant/Food Service">Restaurant/Food Service</option>
              <option value="Grocery Store">Grocery Store</option>
              <option value="Pharmacy">Pharmacy</option>
              <option value="Bookstore/Stationery">Bookstore/Stationery</option>
              <option value="Laundry Service">Laundry Service</option>
              <option value="Electronics/Tech">Electronics/Tech</option>
              <option value="Fashion/Clothing">Fashion/Clothing</option>
              <option value="Beauty/Personal Care">Beauty/Personal Care</option>
              <option value="Printing Services">Printing Services</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {errors.businessType && (
            <p className="mt-1 text-sm text-destructive font-clash">{errors.businessType}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-foreground font-clash mb-2">
            Business Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`input-field resize-none ${errors.description ? 'border-destructive' : ''}`}
            placeholder="Describe your business, products/services, and why you'd like to partner with Cydex..."
          />
          <div className="flex justify-between items-center mt-1">
            {errors.description && (
              <p className="text-sm text-destructive font-clash">{errors.description}</p>
            )}
            <p className="text-xs text-muted-foreground font-clash ml-auto">
              {formData.description.length}/500 characters
            </p>
          </div>
        </div>

        <div className="bg-primary-light/30 border border-primary/20 rounded-lg p-4">
          <h4 className="font-semibold text-primary font-clash mb-2">Early Partner Benefits:</h4>
          <ul className="text-sm text-muted-foreground font-clash space-y-1">
            <li>• Zero setup fees and reduced commission rates</li>
            <li>• Priority listing in the app</li>
            <li>• Dedicated account manager support</li>
            <li>• Marketing co-op opportunities</li>
          </ul>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary-hover text-primary-foreground font-clash rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin w-5 h-5 mr-2" />
              Submitting Application...
            </>
          ) : (
            'Submit Partner Application'
          )}
        </button>

        <p className="text-xs text-muted-foreground text-center font-clash">
          By applying, you agree to Cydex's partner terms. We'll contact you within 48 hours.
        </p>
      </form>
    </div>
  );
};

export default VendorWaitlistForm;