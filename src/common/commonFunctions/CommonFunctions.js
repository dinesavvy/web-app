export const handleKeyPressSpace = (event) => {
  // Prevent typing a space at the beginning
  if (event.key === ' ' && event.target.selectionStart === 0) {
    event.preventDefault();
  }
};
// Handle Product Code validation
export const handleKeyPress = (event) => {
  const regex = /^[a-zA-Z0-9-_]*$/;
  if (!regex.test(event.key)) {
    event.preventDefault();
  }
};

// Handle Copy Paste functionality for blank space
export const handlePaste = (e) => {
  // Get the pasted text
  const pastedText = (e.clipboardData || window.clipboardData).getData('text');

  // Allow only alphanumeric characters, hyphens (-), and underscores (_)
  const sanitizedText = pastedText.replace(/[^a-zA-Z0-9-_]/g, '').replace(/"/g, '');

  if (pastedText !== sanitizedText) {
    e.preventDefault(); // Prevent the default paste action
    const input = e.target;
    const selectionStart = input.selectionStart;
    const selectionEnd = input.selectionEnd;

    // Insert sanitized text manually
    const newValue =
      input.value.slice(0, selectionStart) +
      sanitizedText +
      input.value.slice(selectionEnd);
    input.value = newValue;

    // Optionally trigger change event
    const event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
  }
};


export const handleInputChange = (e) => {
  const { value, maxLength } = e.target;
  if (value.length > maxLength) {
    e.target.value = value.slice(0, maxLength);
  }
};

export const handleInputChangeNumber = (event) => {
  event.target.value = event.target.value.replace(/[^0-9+]/g, ''); // Replace all non-numeric characters
};

// Handle up and down arrow
export const handleKeyDown = (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    e.preventDefault();
  }
}