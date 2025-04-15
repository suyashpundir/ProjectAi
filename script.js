// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transition = 'opacity 0.5s ease-in-out';
    observer.observe(section);
});

// Add fade-in class to CSS
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1 !important;
    }
`;
document.head.appendChild(style);

// Timeline functionality
const timelineData = [
    {
        year: '~3000 BCE - 500 BCE',
        title: 'Ancient Civilizations',
        description: 'Rise of Mesopotamia, Egypt, Indus Valley, and Chinese dynasties; invention of writing, early cities, and polytheistic religions.',
        region: 'Middle East, Asia'
    },
    {
        year: '27 BCE - 476 CE',
        title: 'Roman Empire',
        description: 'Augustus becomes the first emperor; Pax Romana; spread of Roman law, roads, and culture; fall of the Western Roman Empire.',
        region: 'Europe, North Africa, Asia'
    },
    {
        year: '500 CE - 1500 CE',
        title: 'Middle Ages',
        description: 'Feudalism dominates Europe; rise of Christianity and Islam; Crusades; Black Death; formation of medieval kingdoms.',
        region: 'Europe, Middle East'
    },
    {
        year: '1300 - 1600 CE',
        title: 'Renaissance',
        description: 'Revival of classical art and learning; major advancements in science, exploration, and humanism; printing press revolution.',
        region: 'Europe'
    },
    {
        year: '1760 - 1840 CE',
        title: 'Industrial Revolution',
        description: 'Steam engine, mechanized factories, mass production; urbanization; rise of capitalist economies and labor movements.',
        region: 'Global'
    },
    {
        year: '1914 - 1945 CE',
        title: 'World Wars',
        description: 'WWI reshapes Europe; WWII ends with Allied victory, Holocaust, atomic bombings, and rise of the U.S. and USSR as superpowers.',
        region: 'Global'
    }
];

function createTimeline() {
    const timelineContainer = document.querySelector('.timeline-container');
    timelineContainer.innerHTML = ''; // Clear existing content
    
    timelineData.forEach((event, index) => {
        const eventElement = document.createElement('div');
        eventElement.className = 'timeline-event';
        eventElement.innerHTML = `
            <div class="timeline-year">${event.year}</div>
            <div class="timeline-content">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <div class="timeline-meta">
                    <span class="timeline-region">${event.region}</span>
                </div>
            </div>
        `;
        timelineContainer.appendChild(eventElement);
    });
}

// Initialize timeline when DOM is loaded
document.addEventListener('DOMContentLoaded', createTimeline);

// Add hover effect to timeline events
document.addEventListener('DOMContentLoaded', () => {
    const timelineEvents = document.querySelectorAll('.timeline-event');
    timelineEvents.forEach(event => {
        event.addEventListener('mouseenter', () => {
            event.style.transform = 'scale(1.05)';
        });
        event.addEventListener('mouseleave', () => {
            event.style.transform = 'scale(1)';
        });
    });
});

// Chatbot functionality
const chatbotContainer = document.querySelector('.chatbot-container');
const chatbotToggle = document.querySelector('.chatbot-toggle');
const closeChatbot = document.querySelector('.close-chatbot');
const clearChat = document.querySelector('.clear-chat');
const chatbotMessages = document.querySelector('.chatbot-messages');
const chatbotInput = document.querySelector('.chatbot-text-input');
const chatbotSend = document.querySelector('.chatbot-send');

// Initialize chatbot with greeting
let isFirstInteraction = true;

// Clear chat messages
clearChat.addEventListener('click', () => {
    chatbotMessages.innerHTML = '';
    isFirstInteraction = true;
    addMessage("Hello! I'm your history assistant. I can tell you about various historical periods and events. Try asking me about Ancient Egypt, Greek Mythology, the Roman Empire, the Middle Ages, the Renaissance, the French Revolution, the Industrial Revolution, World Wars, the Cold War, the Civil Rights Movement, the Space Race, the Mughal Empire, Samurai & Feudal Japan, or the American Revolution!", false);
});

// Toggle chatbot visibility
chatbotToggle.addEventListener('click', () => {
    chatbotContainer.classList.add('active');
    if (isFirstInteraction) {
        setTimeout(() => {
            addMessage("Hello! I'm your history assistant. I can tell you about various historical periods and events. Try asking me about Ancient Egypt, Greek Mythology, the Roman Empire, the Middle Ages, the Renaissance, the French Revolution, the Industrial Revolution, World Wars, the Cold War, the Civil Rights Movement, the Space Race, the Mughal Empire, Samurai & Feudal Japan, or the American Revolution!", false);
        }, 500);
        isFirstInteraction = false;
    }
});

closeChatbot.addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
});

// Historical knowledge base
const historicalKnowledge = {
    'ancient egypt': 'Explore the mysterious world of pharaohs, pyramids, and mummification. Discover how the Nile shaped one of the most advanced early civilizations.',
    'greek mythology': 'Dive into the legendary stories of gods, heroes, and monsters that shaped ancient Greek culture and Western storytelling.',
    'roman empire': 'Learn how Rome expanded across continents, built architectural wonders, and influenced law, language, and military strategy.',
    'middle ages': 'Uncover the age of knights, castles, plagues, and Crusades. A complex era of religion, war, and the seeds of modern Europe.',
    'renaissance': 'Witness the rebirth of art, science, and philosophy as Europe emerged from the Middle Ages into a golden era of creativity and thought.',
    'french revolution': 'Follow the dramatic upheaval that overthrew the monarchy, sparked democratic ideals, and led to the rise of Napoleon.',
    'industrial revolution': 'Discover how steam, steel, and factories transformed society—ushering in modern cities, labor movements, and mass production.',
    'world war i': 'Understand the causes and consequences of "The Great War," with trench warfare, alliances, and the reshaping of Europe.',
    'world war ii': 'A global conflict that changed the world—covering Hitler\'s rise, the Holocaust, atomic bombs, and the birth of the United Nations.',
    'cold war': 'A decades-long standoff between the U.S. and USSR filled with nuclear tension, espionage, and ideological battles across the globe.',
    'civil rights movement': 'Follow the courageous struggle of African Americans for equality, led by figures like Martin Luther King Jr. and Rosa Parks.',
    'space race': 'Relive the race to the Moon between the USA and USSR, a symbol of Cold War competition and human innovation.',
    'mughal empire': 'Explore the grandeur of the Mughal dynasty, known for its architecture (like the Taj Mahal), arts, and religious tolerance.',
    'samurai': 'Discover the world of the samurai, bushido code, and the rise and fall of shogunates in Japan\'s feudal era.',
    'american revolution': 'Trace the path from British colonies to the birth of the United States, with battles, ideals, and a new democracy.',
    'hello': 'Hello! I can tell you about various historical periods and events. Try asking me about Ancient Egypt, Greek Mythology, the Roman Empire, the Middle Ages, the Renaissance, the French Revolution, the Industrial Revolution, World Wars, the Cold War, the Civil Rights Movement, the Space Race, the Mughal Empire, Samurai & Feudal Japan, or the American Revolution!',
    'hi': 'Hi there! What historical topic interests you? I can tell you about many fascinating periods in history.',
    'help': 'I can tell you about various historical periods and events. Try asking me about Ancient Egypt, Greek Mythology, the Roman Empire, the Middle Ages, the Renaissance, the French Revolution, the Industrial Revolution, World Wars, the Cold War, the Civil Rights Movement, the Space Race, the Mughal Empire, Samurai & Feudal Japan, or the American Revolution!'
};

// Add message to chat
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${isUser ? 'user' : 'bot'}`;
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Process user input
function processUserInput(input) {
    input = input.toLowerCase();
    let response = "I'm sorry, I don't have information about that specific topic. Could you try asking about something else? You can ask me about Ancient Egypt, Greek Mythology, the Roman Empire, the Middle Ages, the Renaissance, the French Revolution, the Industrial Revolution, World Wars, the Cold War, the Civil Rights Movement, the Space Race, the Mughal Empire, Samurai & Feudal Japan, or the American Revolution!";
    
    // Check for keywords in the knowledge base
    for (const [keyword, answer] of Object.entries(historicalKnowledge)) {
        if (input.includes(keyword)) {
            response = answer;
            break;
        }
    }
    
    // Add a small delay to simulate thinking
    setTimeout(() => {
        addMessage(response);
    }, 500);
}

// Handle send button click
chatbotSend.addEventListener('click', () => {
    const message = chatbotInput.value.trim();
    if (message) {
        addMessage(message, true);
        processUserInput(message);
        chatbotInput.value = '';
    }
});

// Handle enter key press
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const message = chatbotInput.value.trim();
        if (message) {
            addMessage(message, true);
            processUserInput(message);
            chatbotInput.value = '';
        }
    }
});
