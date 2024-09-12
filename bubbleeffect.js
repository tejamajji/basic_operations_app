// Listen for mouse movement to create water bubbles
document.addEventListener('mousemove', function(e) {
    // Create a new div element for the bubble
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    // Set bubble's position to follow the cursor
    bubble.style.left = `${e.clientX}px`;
    bubble.style.top = `${e.clientY}px`;

    // Append the bubble to the body
    document.body.appendChild(bubble);

    // Remove the bubble after the animation completes
    setTimeout(() => {
        bubble.remove();
    }, 3000); // Adjust this to match the animation duration
});
