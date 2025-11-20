/**
 * Responsive Background Image Upgrader
 * Dynamically swaps background images to 5x variants on high-DPI displays or zoom
 * Handles both album images and section backgrounds
 */

(function() {
  'use strict';
  
  // Album images (background-image in .image-background divs)
  const ALBUM_IMAGES = [
    'w-m5kl7537', 'w-ns3mr77n', 'w-kfq74cgn', 'w-9zzw4318', 'w-9qtr8q2f',
    'w-yfzpfx5f', 'w-lifvdaux', 'w-vciisdes', 'w-ttqitk3f', 'w-ifrkyp8t',
    'w-narsvau9', 'w-tw6ar7zq', 'w-5ev6ur6c', 'w-cj7xg9j3', 'w-tb87vzct',
    'w-dramm9ng', 'w-z8j4xodv', 'w-gywbfbwz', 'w-newimg001', 'w-newimg002',
    'w-newimg003', 'w-newimg004', 'w-newimg005', 'w-newimg006', 'w-newimg007',
    'w-newimg008', 'w-newimg009'
  ];
  
  // Section backgrounds (background on .section-background divs)
  const SECTION_BACKGROUNDS = [
    'w-fsy5qb2r',  // Section with 1862.jpg background
    'w-s0tzmrbo'   // Hero image with DSC_7541.jpg background
  ];
  
  function upgradeBgImage(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const bgDiv = element.querySelector('.image-background');
    if (!bgDiv) return;
    
    const currentStyle = window.getComputedStyle(bgDiv);
    const bgImage = currentStyle.backgroundImage;
    
    // Extract current URL from background-image: url("...")
    const urlMatch = bgImage.match(/url\(["']?([^"')]+)["']?\)/);
    if (!urlMatch) return;
    
    const currentUrl = urlMatch[1];
    
    // Check if we should use 5x variant
    const dpr = window.devicePixelRatio || 1;
    const zoomLevel = Math.round(window.outerWidth / window.innerWidth * 100) / 100;
    
    // Use 5x if high-DPI display (retina) or zoomed in
    if (dpr >= 1.5 || zoomLevel > 1.2) {
      // Generate 5x URL by inserting "-5x" before extension
      const url5x = currentUrl.replace(/(\.[^.]+)$/, '-5x$1');
      
      // Preload 5x image
      const img = new Image();
      img.onload = function() {
        bgDiv.style.backgroundImage = `url("${url5x}")`;
        console.log(`Upgraded ${elementId} to 5x variant`);
      };
      img.onerror = function() {
        console.warn(`5x variant not found for ${elementId}, keeping 1x`);
      };
      img.src = url5x;
    }
  }
  
  function upgradeSectionBg(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const bgDiv = element.querySelector('.section-background');
    if (!bgDiv) return;
    
    const currentStyle = window.getComputedStyle(bgDiv);
    const bgImage = currentStyle.backgroundImage;
    
    // Extract current URL
    const urlMatch = bgImage.match(/url\(["']?([^"')]+)["']?\)/);
    if (!urlMatch) return;
    
    const currentUrl = urlMatch[1];
    
    // Check if we should use 5x variant
    const dpr = window.devicePixelRatio || 1;
    const zoomLevel = Math.round(window.outerWidth / window.innerWidth * 100) / 100;
    
    if (dpr >= 1.5 || zoomLevel > 1.2) {
      const url5x = currentUrl.replace(/(\.[^.]+)$/, '-5x$1');
      
      const img = new Image();
      img.onload = function() {
        bgDiv.style.backgroundImage = `url("${url5x}")`;
        console.log(`Upgraded section ${elementId} to 5x variant`);
      };
      img.onerror = function() {
        console.warn(`5x variant not found for section ${elementId}, keeping 1x`);
      };
      img.src = url5x;
    }
  }
  
  function upgradeAllBackgrounds() {
    ALBUM_IMAGES.forEach(upgradeBgImage);
    SECTION_BACKGROUNDS.forEach(upgradeSectionBg);
  }
  
  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', upgradeAllBackgrounds);
  } else {
    upgradeAllBackgrounds();
  }
  
  // Re-run on zoom/resize (debounced)
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(upgradeAllBackgrounds, 300);
  });
  
  console.log('Responsive background image upgrader initialized');
})();
