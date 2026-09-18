// Image Modal Functionality for pype.dev
document.addEventListener('DOMContentLoaded', function() {
  // Create modal elements
  const modal = document.createElement('div');
  modal.className = 'image-modal fade-in';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <img class="modal-image" src="" alt="Full size image">
    </div>
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector('.modal-image');
  const closeBtn = modal.querySelector('.close-modal');

  // Add click event to all article images (excluding audio/video sources)
  document.querySelectorAll('.article-content img, .post-terminal__body img').forEach(img => {
    // Skip images that are actually audio/video files
    const src = img.src.toLowerCase();
    const audioVideoExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.mp4', '.avi', '.webm'];
    const isMediaFile = audioVideoExtensions.some(ext => src.endsWith(ext));
    
    if (isMediaFile) {
      return; // Skip this image
    }
    
    img.classList.add('clickable-image');
    
    // Add click event
    img.addEventListener('click', function() {
      modal.style.display = 'flex';
      modalImg.src = this.src;
      modalImg.alt = this.alt;
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
      
      // Add animation class
      setTimeout(() => {
        modal.classList.add('show');
      }, 10);
    });
  });

  // Close modal when clicking the close button
  closeBtn.addEventListener('click', closeModal);

  // Close modal when clicking outside the image
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = ''; // Re-enable scrolling
    }, 300); // Match transition duration
  }
});
