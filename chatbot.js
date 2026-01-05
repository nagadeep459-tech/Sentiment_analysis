// ReviewBot Chatbot Widget - Premium Professional UI

(function () {
  'use strict';

  // Backend API used everywhere else in the app
  const API_URL = 'http://localhost:8080/predict';

  // Chat history storage (last 30 messages)
  const CHAT_HISTORY_KEY = 'reviewbot_chat_history';
  const MAX_HISTORY = 30;

  // Hold DOM references safely
  const dom = {
    launcher: null,
    chat: null,
    close: null,
    fullscreen: null,
    messages: null,
    input: null,
    send: null,
    typing: null,
    quickReplies: null
  };

  // Chat state
  let chatHistory = [];
  let isFullscreen = false;

  function createElements() {
    // Avoid creating twice
    if (document.getElementById('reviewbot-launcher')) {
      return;
    }

    // Launcher button with improved styling
    const launcher = document.createElement('button');
    launcher.id = 'reviewbot-launcher';
    launcher.type = 'button';
    launcher.className = 'rb-launcher';
    launcher.innerHTML = '<span id="reviewbot-launcher-icon">💬</span>';

    // Chat container with full-screen support
    const chat = document.createElement('div');
    chat.id = 'reviewbot-chat';
    chat.innerHTML =
      '<div class="rb-chat-header">' +
        '<div class="rb-chat-header-left">' +
          '<div class="rb-chat-avatar">🎬</div>' +
          '<div class="rb-chat-header-text">' +
            '<div class="rb-chat-title">ReviewBot 🎬</div>' +
            '<div class="rb-chat-subtitle">AI-Powered Sentiment Analysis</div>' +
          '</div>' +
        '</div>' +
        '<div class="rb-chat-header-actions">' +
          '<button class="rb-chat-fullscreen" type="button" aria-label="Toggle Fullscreen" title="Toggle Fullscreen">⛶</button>' +
          '<button class="rb-chat-close" type="button" aria-label="Close" title="Close">×</button>' +
        '</div>' +
      '</div>' +
      '<div class="rb-chat-body" id="reviewbot-messages"></div>' +
      '<div class="rb-typing" id="reviewbot-typing">' +
        '<div class="rb-typing-text">ReviewBot is typing</div>' +
        '<div class="rb-dots"><span></span><span></span><span></span></div>' +
      '</div>' +
      '<div class="rb-quick-replies" id="reviewbot-quick-replies">' +
        '<button class="rb-quick-reply-btn" data-command="predict">🔍 Analyze this review</button>' +
        '<button class="rb-quick-reply-btn" data-command="summarize">📝 Summarize this</button>' +
        '<button class="rb-quick-reply-btn" data-command="rewrite">✏️ Rewrite this</button>' +
        '<button class="rb-quick-reply-btn" data-command="explain">🧠 Explain sentiment</button>' +
      '</div>' +
      '<div class="rb-chat-footer">' +
        '<textarea id="reviewbot-input" placeholder="Write or paste a movie review..." autocomplete="off" rows="1"></textarea>' +
        '<button id="reviewbot-send" type="button" title="Send message">➤</button>' +
      '</div>';

    document.body.appendChild(launcher);
    document.body.appendChild(chat);

    dom.launcher = launcher;
    dom.chat = chat;
    dom.close = chat.querySelector('.rb-chat-close');
    dom.fullscreen = chat.querySelector('.rb-chat-fullscreen');
    dom.messages = document.getElementById('reviewbot-messages');
    dom.typing = document.getElementById('reviewbot-typing');
    dom.input = document.getElementById('reviewbot-input');
    dom.send = document.getElementById('reviewbot-send');
    dom.quickReplies = document.getElementById('reviewbot-quick-replies');

    bindEvents();
    loadChatHistory();
    
    // Show welcome message if no history
    if (chatHistory.length === 0) {
      addBotMessage('Hi, I am ReviewBot 🎬. Paste a movie review and I will tell you if it is positive or negative.');
    }
  }

  function bindEvents() {
    // Launcher click
    if (dom.launcher) {
      dom.launcher.addEventListener('click', function(e) {
        e.preventDefault();
        toggleChat();
        // Pop animation
        dom.launcher.style.transform = 'scale(0.9)';
        setTimeout(() => {
          dom.launcher.style.transform = '';
        }, 150);
      });
    }

    // Close button
    if (dom.close) {
      dom.close.addEventListener('click', toggleChat);
    }

    // Fullscreen toggle
    if (dom.fullscreen) {
      dom.fullscreen.addEventListener('click', toggleFullscreen);
    }

    // Send button
    if (dom.send) {
      dom.send.addEventListener('click', onSendClicked);
    }

    // Input handling
    if (dom.input) {
      // Auto-resize textarea
      dom.input.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
      });

      // Enter to send (Shift+Enter for new line)
      dom.input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          onSendClicked();
        }
      });

      // Focus input when chat opens
      dom.input.addEventListener('focus', function() {
        if (dom.chat && dom.chat.classList.contains('rb-open')) {
          dom.quickReplies.style.display = 'flex';
        }
      });
    }

    // Quick reply buttons
    if (dom.quickReplies) {
      const buttons = dom.quickReplies.querySelectorAll('.rb-quick-reply-btn');
      buttons.forEach(btn => {
        btn.addEventListener('click', function() {
          const command = this.getAttribute('data-command');
          insertQuickReply(command);
        });
      });
    }
  }

  function toggleChat() {
    if (!dom.chat) return;
    const isOpen = dom.chat.classList.toggle('rb-open');
    
    if (isOpen) {
      // Show quick replies when opening
      if (dom.quickReplies) {
        dom.quickReplies.style.display = 'flex';
      }
      // Focus input
      if (dom.input) {
        setTimeout(() => dom.input.focus(), 100);
      }
    } else {
      // Hide quick replies when closing
      if (dom.quickReplies) {
        dom.quickReplies.style.display = 'none';
      }
    }
  }

  function toggleFullscreen() {
    if (!dom.chat) return;
    isFullscreen = !isFullscreen;
    dom.chat.classList.toggle('rb-fullscreen', isFullscreen);
    
    // Update fullscreen button icon
    if (dom.fullscreen) {
      dom.fullscreen.textContent = isFullscreen ? '⛶' : '⛶';
      dom.fullscreen.title = isFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen';
    }
  }

  function insertQuickReply(command) {
    if (!dom.input) return;
    
    const commands = {
      predict: 'Analyze this review',
      summarize: 'Summarize this',
      rewrite: 'Rewrite this',
      explain: 'Explain sentiment'
    };
    
    const text = commands[command] || '';
    dom.input.value = text;
    dom.input.focus();
    dom.input.style.height = 'auto';
    dom.input.style.height = Math.min(dom.input.scrollHeight, 120) + 'px';
  }

  function formatTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  }

  function addMessage(sender, text, timestamp) {
    if (!dom.messages) return;
    
    const row = document.createElement('div');
    row.className = 'rb-message-row ' + (sender === 'user' ? 'user' : 'bot');

    const bubble = document.createElement('div');
    bubble.className = 'rb-message ' + (sender === 'user' ? 'user' : 'bot');
    bubble.textContent = text;

    // Add timestamp
    const time = document.createElement('div');
    time.className = 'rb-message-time';
    time.textContent = timestamp || formatTime();

    row.appendChild(bubble);
    row.appendChild(time);
    dom.messages.appendChild(row);
    
    // Smooth scroll to bottom
    setTimeout(() => {
      dom.messages.scrollTop = dom.messages.scrollHeight;
    }, 50);

    // Save to history
    saveMessageToHistory(sender, text, timestamp || formatTime());
  }

  function addBotMessage(text) {
    addMessage('bot', text);
  }

  function addUserMessage(text) {
    addMessage('user', text);
  }

  function setTyping(isTyping) {
    if (!dom.typing) return;
    if (isTyping) {
      dom.typing.classList.add('rb-visible');
    } else {
      dom.typing.classList.remove('rb-visible');
    }
  }

  function onSendClicked() {
    if (!dom.input || !dom.send) return;
    const text = dom.input.value.trim();
    if (!text) {
      return;
    }
    
    dom.input.value = '';
    dom.input.style.height = 'auto';
    addUserMessage(text);
    predictSentiment(text);
  }

  async function predictSentiment(text) {
    if (!dom.send) return;
    setTyping(true);
    dom.send.disabled = true;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text })
      });

      if (!response.ok) {
        throw new Error('Server error: ' + response.status);
      }

      const data = await response.json();
      const sentimentRaw = (data.sentiment || '').toString().toLowerCase();
      const prediction = data.prediction;

      let label = 'Neutral 😐';
      if (sentimentRaw === 'positive' || prediction === 1 || prediction === '1') {
        label = 'Positive 😊';
      } else if (sentimentRaw === 'negative' || prediction === 0 || prediction === '0') {
        label = 'Negative 😞';
      }

      addBotMessage('Predicted sentiment: ' + label);
    } catch (err) {
      console.error('ReviewBot error:', err);
      addBotMessage('I could not reach the sentiment service. Please make sure the Java backend is running on http://localhost:8080 and then try again.');
    } finally {
      setTyping(false);
      dom.send.disabled = false;
    }
  }

  // LocalStorage functions
  function saveMessageToHistory(sender, text, timestamp) {
    chatHistory.push({ sender, text, timestamp });
    
    // Keep only last MAX_HISTORY messages
    if (chatHistory.length > MAX_HISTORY) {
      chatHistory = chatHistory.slice(-MAX_HISTORY);
    }
    
    try {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(chatHistory));
    } catch (e) {
      console.warn('Could not save chat history:', e);
    }
  }

  function loadChatHistory() {
    try {
      const stored = localStorage.getItem(CHAT_HISTORY_KEY);
      if (stored) {
        chatHistory = JSON.parse(stored);
        // Render all messages
        chatHistory.forEach(msg => {
          const row = document.createElement('div');
          row.className = 'rb-message-row ' + (msg.sender === 'user' ? 'user' : 'bot');

          const bubble = document.createElement('div');
          bubble.className = 'rb-message ' + (msg.sender === 'user' ? 'user' : 'bot');
          bubble.textContent = msg.text;

          const time = document.createElement('div');
          time.className = 'rb-message-time';
          time.textContent = msg.timestamp || '';

          row.appendChild(bubble);
          row.appendChild(time);
          if (dom.messages) {
            dom.messages.appendChild(row);
          }
        });
        
        // Scroll to bottom
        if (dom.messages) {
          setTimeout(() => {
            dom.messages.scrollTop = dom.messages.scrollHeight;
          }, 100);
        }
      }
    } catch (e) {
      console.warn('Could not load chat history:', e);
      chatHistory = [];
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createElements);
  } else {
    createElements();
  }
})();
