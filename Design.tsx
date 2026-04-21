const InquiryView = () => (
  <div className="animate-fade-in bg-[#F5F1EC]">
    <div className="flex flex-col lg:flex-row min-h-screen">
      
      {/* Left Col - Image Background */}
      <div className="w-full lg:w-5/12 relative min-h-[50vh] lg:min-h-screen">
        <img 
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200" 
          alt="Consultation" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F3F5B] via-[#1F3F5B]/80 to-transparent flex flex-col justify-end p-10 md:p-16">
          <div className="w-12 h-[2px] bg-[#C8A97E] mb-6"></div>
          <H1 className="text-[#F5F1EC] mb-4">Let’s Design Your Home.</H1>
          <p className="font-inter font-light text-[#E6D6C5] text-lg mb-8 max-w-sm leading-relaxed">
            Get expert guidance on layout, materials, budget, and timelines—before you commit to anything.
          </p>
          <div className="space-y-4 pt-6 border-t border-[#F5F1EC]/20">
            <p className="flex items-start font-inter font-light text-[#F5F1EC]">
              <MapPin size={18} className="mr-4 text-[#C8A97E] mt-1 flex-shrink-0" /> 
              <span className="leading-relaxed">Office No. 817, Solitaire Business Hub,<br/>Baner, Pune, MH 411045</span>
            </p>
            <p className="flex items-center font-inter font-light text-[#F5F1EC]"><Phone size={18} className="mr-4 text-[#C8A97E]" /> +91 98765 43210</p>
            <p className="flex items-center font-inter font-light text-[#F5F1EC]"><Mail size={18} className="mr-4 text-[#C8A97E]" /> design@livora.com</p>
          </div>
        </div>
      </div>

      {/* Right Col - Form */}
      <div className="w-full lg:w-7/12 p-8 md:p-16 lg:p-24 bg-[#F5F1EC] flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white p-10 md:p-14 shadow-sm rounded-sm">
          <H3 className="mb-2 text-[#B9926B]">Project Inquiry</H3>
          <H2 className="mb-8 pb-6 border-b border-[#E6D6C5]">Tell us about your space</H2>
          
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block font-montserrat tracking-wide-premium text-xs font-medium text-[#8A8A8A] uppercase mb-3">Project Requirements</label>
              <textarea rows="3" className="w-full border-b border-[#E6D6C5] py-2 focus:outline-none focus:border-[#B9926B] font-inter bg-transparent resize-none" placeholder="Briefly describe what you are looking for..."></textarea>
            </div>

            <Button type="submit" className="w-full mt-4">Schedule My Consultation</Button>
          </form>
        </div>
      </div>
    </div>

    {/* NEW Google Map Section */}
    <section className="py-24 px-6 md:px-12 bg-white border-t border-[#E6D6C5]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-[1px] bg-[#C8A97E] mr-4"></div>
            <H3 className="text-[#C8A97E] mb-0">Our Location</H3>
            <div className="w-12 h-[1px] bg-[#C8A97E] ml-4"></div>
          </div>
          <H2 className="text-[#1F3F5B]">Visit Our Studio</H2>
        </div>

        <div className="w-full h-[450px] lg:h-[550px] rounded-sm overflow-hidden shadow-xl border-4 border-[#F5F1EC] relative z-10 bg-[#F5F1EC]">
          <iframe 
            src="https://maps.google.com/maps?q=Solitaire%20Business%20Hub,%20Baner,%20Pune&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Livora Studio Location"
          ></iframe>
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-6 text-[#1F3F5B]">
          <div className="w-14 h-14 bg-[#1F3F5B] rounded-full flex items-center justify-center shadow-lg transform -translate-y-2">
             <MapPin className="text-[#C8A97E]" size={28} />
          </div>
          <p className="font-inter font-light text-lg text-[#2B2B2B] text-center md:text-left">
            <strong className="font-montserrat font-medium text-[13px] tracking-wide-premium uppercase text-[#1F3F5B] block mb-2">Livora Headquarters</strong>
            Office No. 817, Solitaire Business Hub, Baner, Pune, MH 411045
          </p>
        </div>
      </div>
    </section>
  </div>
);