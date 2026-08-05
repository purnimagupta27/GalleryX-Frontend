
const Footer = () => {
  return (
    <footer className='max-w-7xl mx-auto px-6 sm:px-10 py-10 sm:py-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left'>
        <h2 className='text-xl sm:text-2xl font-medium tracking-wider uppercase text-white/90'>Gallery X</h2>
        <p className='text-xs sm:text-sm font-normal tracking-widest uppercase text-white/40' style={{fontFamily: "'Outfit', sans-serif"}}>Share your creativity with the world.</p>
        <p className='text-xs font-normal tracking-wide text-white/30' style={{fontFamily: "'Outfit', sans-serif"}}>© 2026 GalleryX. All rights reserved.</p>
    </footer>
  )
}

export default Footer