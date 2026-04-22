// --- NEW 404 NOT FOUND VIEW ---
const NotFoundView = ({ navigate }) => (
  <div className="animate-fade-in bg-[#F5F1EC] min-h-[70vh] flex items-center justify-center px-6 py-20">
    <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      
      {/* Left: Visual Concept */}
      <div className="relative">
        <div className="aspect-[4/5] bg-white shadow-2xl rounded-sm p-8 flex flex-col border border-[#E6D6C5]">
          {/* Decorative Blueprint elements */}
          <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full border-[1px] border-[#1F3F5B]" style={{ backgroundImage: 'linear-gradient(#1F3F5B 1px, transparent 1px), linear-gradient(90deg, #1F3F5B 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          </div>
          
          <div className="flex justify-between items-start mb-12 relative z-10">
            <div className="font-playfair text-[120px] leading-none text-[#C8A97E]/20 font-bold select-none">404</div>
            <Compass className="text-[#B9926B] animate-pulse" size={48} />
          </div>

          <div className="flex-grow flex flex-col justify-center items-center relative z-10">
             <div className="w-48 h-48 border-2 border-dashed border-[#C8A97E] flex items-center justify-center rounded-full mb-8">
                <Search size={40} className="text-[#1F3F5B] opacity-40" />
             </div>
             <H3 className="text-[#1F3F5B] text-center max-w-[200px]">The requested space cannot be found</H3>
          </div>

          <div className="border-t border-[#E6D6C5] pt-8 flex justify-between items-end relative z-10">
            <div>
                <p className="font-montserrat text-[10px] uppercase tracking-widest text-[#8A8A8A] mb-1">Blueprint Ref.</p>
                <p className="font-inter text-xs text-[#1F3F5B]">ERR_PAGE_MISSING_04</p>
            </div>
            <div className="text-right">
                <p className="font-montserrat text-[10px] uppercase tracking-widest text-[#8A8A8A] mb-1">Coordinates</p>
                <p className="font-inter text-xs text-[#1F3F5B]">0.0.0.0 / Unknown</p>
            </div>
          </div>
        </div>
        
        {/* Shadow ornament */}
        <div className="absolute -bottom-6 -right-6 -z-10 w-full h-full bg-[#1F3F5B]/5"></div>
      </div>

      {/* Right: Typography & Navigation */}
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
        <div className="flex items-center mb-6">
          <div className="w-12 h-[1px] bg-[#C8A97E] mr-4"></div>
          <span className="font-montserrat text-[#C8A97E] text-[11px] font-medium uppercase tracking-[0.2em]">Misplaced Space</span>
        </div>
        <H1 className="mb-6">Even great design hits a dead end.</H1>
        <BodyText className="text-[#8A8A8A] mb-12 max-w-md leading-relaxed">
          The page you are looking for has been moved, removed, or never existed in the original floor plan. Let's get you back to the main lobby.
        </BodyText>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button onClick={() => navigate('home')} className="px-12">Return Home</Button>
          <Button onClick={() => navigate('inquiry')} variant="outline">Contact Support</Button>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-8 border-t border-[#E6D6C5] pt-12 w-full">
            <div>
                <h4 className="font-montserrat text-[10px] uppercase tracking-widest text-[#B9926B] mb-4">Start Over</h4>
                <ul className="space-y-3">
                    <li><button onClick={() => navigate('home')} className="text-sm font-inter text-[#1F3F5B] hover:text-[#B9926B] transition-colors">Homepage</button></li>
                    <li><button onClick={() => navigate('brand')} className="text-sm font-inter text-[#1F3F5B] hover:text-[#B9926B] transition-colors">The Brand</button></li>
                </ul>
            </div>
            <div>
                <h4 className="font-montserrat text-[10px] uppercase tracking-widest text-[#B9926B] mb-4">Explore</h4>
                <ul className="space-y-3">
                    <li><button onClick={() => navigate('process')} className="text-sm font-inter text-[#1F3F5B] hover:text-[#B9926B] transition-colors">Our Process</button></li>
                    <li><button onClick={() => navigate('inquiry')} className="text-sm font-inter text-[#1F3F5B] hover:text-[#B9926B] transition-colors">Consultation</button></li>
                </ul>
            </div>
        </div>
      </div>

    </div>
  </div>
);