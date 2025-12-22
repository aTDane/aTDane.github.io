// Custom scroll-triggered animation handler
// Replaces webcake.js functionality for local file viewing

(function() {
  'use strict';

  // Initialize animations on page load
  function initScrollAnimations() {
    // Find all elements that should have scroll-triggered animations
    const animatedElements = document.querySelectorAll('.animation');
    
    // Create an Intersection Observer to detect when elements enter viewport
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 // Trigger when 10% of element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animation class when element enters viewport
          entry.target.classList.add('animate-trigger');
          
          // Optional: stop observing after animation triggers once
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all animated elements
    animatedElements.forEach(element => {
      // Remove the animation class temporarily
      element.classList.remove('animation');
      element.classList.add('animation-ready');
      
      observer.observe(element);
    });

    // Re-add animation class when triggered
    const style = document.createElement('style');
    style.textContent = `
      .animation-ready.animate-trigger {
        /* Re-apply animation styles */
      }
    `;
    document.head.appendChild(style);
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
  } else {
    initScrollAnimations();
  }
})();
