/* popup.js - Logic for the Voice AI Assistant */

// Check if the browser supports the Web Speech API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    document.getElementById('status').textContent = "Speech recognition not supported";
    document.getElementById('mic-btn').disabled = true;
} else {
    const recognition = new SpeechRecognition();
    recognition.continuous = false; // Stop after one command
    recognition.lang = 'en-US'; // Set language
    recognition.interimResults = false; // Only final results

    const micBtn = document.getElementById('mic-btn');
    const status = document.getElementById('status');
    const transcriptDisplay = document.getElementById('transcript');

    // When the microphone button is clicked
    micBtn.addEventListener('click', () => {
        try {
            recognition.start();
            status.textContent = "Listening...";
            micBtn.classList.add('listening');
        } catch (e) {
            console.log("Recognition already started or error:", e);
        }
    });

    // When speech is successfully recognized
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        transcriptDisplay.textContent = `"${transcript}"`;
        micBtn.classList.remove('listening');
        status.textContent = "Processing...";

        handleCommand(transcript);
    };

    // Handle errors
    recognition.onerror = (event) => {
        status.textContent = "Error occurred: " + event.error;
        micBtn.classList.remove('listening');
    };

    // When recognition ends
    recognition.onend = () => {
        micBtn.classList.remove('listening');
        if (status.textContent === "Listening...") {
            status.textContent = "Ready";
        }
    };

    // Logic to handle specific voice commands
    function handleCommand(command) {
        if (command.includes('open youtube')) {
            status.textContent = "Opening YouTube...";
            chrome.tabs.create({ url: "https://www.youtube.com" });
        } 
        else if (command.includes('open google')) {
            status.textContent = "Opening Google...";
            chrome.tabs.create({ url: "https://www.google.com" });
        } 
        else if (command.startsWith('search for')) {
            const query = command.replace('search for', '').trim();
            status.textContent = `Searching for "${query}"...`;
            chrome.search.query({ text: query });
        } 
        else {
            status.textContent = "Command not recognized.";
        }
        
        // Reset status after a short delay
        setTimeout(() => {
            status.textContent = "Ready";
        }, 3000);
    }
}
