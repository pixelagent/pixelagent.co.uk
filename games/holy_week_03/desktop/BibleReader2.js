// Bible Reading Engine — uses open bible-api.com (no CORS issues from localhost)
window.BibleReader = {
  translation: 'web',
  anchorRef: null,
  verses: [],
  topPrevId: null,
  bottomNextId: null,
  cache: {},
  isNightMode: false, // New property for day/night mode
  localFallback: {
    'AMOS.8.9': {
      id: 'AMOS.8.9',
      reference: 'Amos 8:9',
      content: 'And on that day, declares the Lord GOD, I will make the sun go down at noon and darken the earth in broad daylight.',
      verseNum: 9,
      bookId: 'AMOS',
      chapter: '8',
      verse: '9'
    },
    'DANIEL.7.13': {
      id: 'DANIEL.7.13',
      reference: 'Daniel 7:13',
      content: 'I saw in the night visions, and behold, with the clouds of heaven there came one like a son of man, and he came to the Ancient of Days and was presented before him.',
      verseNum: 13,
      bookId: 'DANIEL',
      chapter: '7',
      verse: '13'
    },
    'DANIEL.9.27': {
      id: 'DANIEL.9.27',
      reference: 'Daniel 9:27',
      content: 'And he shall make a strong covenant with many for one week, and for half of the week he shall put an end to sacrifice and offering. And on the wing of abominations shall come one who makes desolate, until the decreed end is poured out on the desolator.',
      verseNum: 27,
      bookId: 'DANIEL',
      chapter: '9',
      verse: '27'
    },
    'EZEKIEL.34.11': {
      id: 'EZEKIEL.34.11',
      reference: 'Ezekiel 34:11',
      content: 'For thus says the Lord GOD: Behold, I, I myself will search for my sheep and will seek them out.',
      verseNum: 11,
      bookId: 'EZEKIEL',
      chapter: '34',
      verse: '11'
    },
    'EXODUS.12.1': {
      id: 'EXODUS.12.1',
      reference: 'Exodus 12:1',
      content: 'The LORD said to Moses and Aaron in the land of Egypt, "This month shall be for you the beginning of months. It shall be the first month of the year for you."',
      verseNum: 1,
      bookId: 'EXODUS',
      chapter: '12',
      verse: '1'
    },
    'GENESIS.49.10': {
      id: 'GENESIS.49.10',
      reference: 'Genesis 49:10',
      content: 'The scepter shall not depart from Judah, nor the ruler\'s staff from between his feet, until tribute comes to him; and to him shall be the obedience of the peoples.',
      verseNum: 10,
      bookId: 'GENESIS',
      chapter: '49',
      verse: '10'
    },
    'HOSEA.6.2': {
      id: 'HOSEA.6.2',
      reference: 'Hosea 6:2',
      content: 'After two days he will revive us; on the third day he will raise us up, that we may live before him.',
      verseNum: 2,
      bookId: 'HOSEA',
      chapter: '6',
      verse: '2'
    },
    'ISAIAH.5.1': {
      id: 'ISAIAH.5.1',
      reference: 'Isaiah 5:1',
      content: 'Let me sing for my beloved my love song concerning his vineyard: My beloved had a vineyard on a very fertile hill.',
      verseNum: 1,
      bookId: 'ISAIAH',
      chapter: '5',
      verse: '1'
    },
    'ISAIAH.13.10': {
      id: 'ISAIAH.13.10',
      reference: 'Isaiah 13:10',
      content: 'For the stars of the heavens and their constellations will not give their light; the sun will be dark at its rising, and the moon will not shed its light.',
      verseNum: 10,
      bookId: 'ISAIAH',
      chapter: '13',
      verse: '10'
    },
    'ISAIAH.25.8': {
      id: 'ISAIAH.25.8',
      reference: 'Isaiah 25:8',
      content: 'He will swallow up death forever; and the Lord GOD will wipe away tears from all faces, and the reproach of his people he will take away from all the earth, for the LORD has spoken.',
      verseNum: 8,
      bookId: 'ISAIAH',
      chapter: '25',
      verse: '8'
    },
    'ISAIAH.26.19': {
      id: 'ISAIAH.26.19',
      reference: 'Isaiah 26:19',
      content: 'Your dead shall live; their bodies shall rise. You who dwell in the dust, awake and sing for joy! For your dew is a dew of light, and the earth will give birth to the dead.',
      verseNum: 19,
      bookId: 'ISAIAH',
      chapter: '26',
      verse: '19'
    },
    'ISAIAH.50.6': {
      id: 'ISAIAH.50.6',
      reference: 'Isaiah 50:6',
      content: 'I gave my back to those who strike, and my cheeks to those who pull out the beard; I hid not my face from disgrace and spitting.',
      verseNum: 6,
      bookId: 'ISAIAH',
      chapter: '50',
      verse: '6'
    },
    'ISAIAH.53.7': {
      id: 'ISAIAH.53.7',
      reference: 'Isaiah 53:7',
      content: 'He was oppressed, and he was afflicted, yet he opened not his mouth; like a lamb that is led to the slaughter, and like a sheep that before its shearers is silent, so he opened not his mouth.',
      verseNum: 7,
      bookId: 'ISAIAH',
      chapter: '53',
      verse: '7'
    },
    'ISAIAH.53.9': {
      id: 'ISAIAH.53.9',
      reference: 'Isaiah 53:9',
      content: 'And they made his grave with the wicked and with a rich man in his death, although he had done no violence, and there was no deceit in his mouth.',
      verseNum: 9,
      bookId: 'ISAIAH',
      chapter: '53',
      verse: '9'
    },
    'ISAIAH.53.10': {
      id: 'ISAIAH.53.10',
      reference: 'Isaiah 53:10',
      content: 'Yet it was the will of the LORD to crush him; he has put him to grief; when his soul makes an offering for guilt, he shall see his offspring; he shall prolong his days; the will of the LORD shall prosper in his hand.',
      verseNum: 10,
      bookId: 'ISAIAH',
      chapter: '53',
      verse: '10'
    },
    'ISAIAH.53.12': {
      id: 'ISAIAH.53.12',
      reference: 'Isaiah 53:12',
      content: 'Therefore I will divide him a portion with the many, and he shall divide the spoil with the strong, because he poured out his soul to death and was numbered with the transgressors; yet he bore the sin of many, and makes intercession for the transgressors.',
      verseNum: 12,
      bookId: 'ISAIAH',
      chapter: '53',
      verse: '12'
    },
    'ISAIAH.56.7': {
      id: 'ISAIAH.56.7',
      reference: 'Isaiah 56:7',
      content: 'these I will bring to my holy mountain, and make them joyful in my house of prayer; their burnt offerings and their sacrifices will be accepted on my altar; for my house shall be called a house of prayer for all peoples.',
      verseNum: 7,
      bookId: 'ISAIAH',
      chapter: '56',
      verse: '7'
    },
    'JEREMIAH.8.13': {
      id: 'JEREMIAH.8.13',
      reference: 'Jeremiah 8:13',
      content: 'When I would gather them, declares the LORD, there are no grapes on the vine, nor figs on the fig tree; even the leaves are withered, and what I gave them has passed away from them.',
      verseNum: 13,
      bookId: 'JEREMIAH',
      chapter: '8',
      verse: '13'
    },
    'JEREMIAH.31.31': {
      id: 'JEREMIAH.31.31',
      reference: 'Jeremiah 31:31',
      content: 'Behold, the days are coming, declares the LORD, when I will make a new covenant with the house of Israel and the house of Judah.',
      verseNum: 31,
      bookId: 'JEREMIAH',
      chapter: '31',
      verse: '31'
    },
    'JOEL.2.30': {
      id: 'JOEL.2.30',
      reference: 'Joel 2:30',
      content: 'And I will show wonders in the heavens and on the earth, blood and fire and columns of smoke.',
      verseNum: 30,
      bookId: 'JOEL',
      chapter: '2',
      verse: '30'
    },
    'JONAH.1.17': {
      id: 'JONAH.1.17',
      reference: 'Jonah 1:17',
      content: 'And the LORD appointed a great fish to swallow up Jonah. And Jonah was in the belly of the fish three days and three nights.',
      verseNum: 17,
      bookId: 'JONAH',
      chapter: '1',
      verse: '17'
    },
    'MALACHI.3.1': {
      id: 'MALACHI.3.1',
      reference: 'Malachi 3:1',
      content: 'Behold, I send my messenger, and he will prepare the way before me. And the Lord whom you seek will suddenly come to his temple; and the messenger of the covenant in whom you delight, behold, he is coming, says the LORD of hosts.',
      verseNum: 1,
      bookId: 'MALACHI',
      chapter: '3',
      verse: '1'
    },
    'MICAH.5.1': {
      id: 'MICAH.5.1',
      reference: 'Micah 5:1',
      content: 'Now muster your troops, O daughter of troops; siege is laid against us; with a rod they strike the judge of Israel on the cheek.',
      verseNum: 1,
      bookId: 'MICAH',
      chapter: '5',
      verse: '1'
    },
    'MICAH.7.1': {
      id: 'MICAH.7.1',
      reference: 'Micah 7:1',
      content: 'Woe is me! For I have become as when the summer fruit has been gathered, as when the grapes have been gleaned: there is no cluster to eat, no first-ripe fig that my soul desires.',
      verseNum: 1,
      bookId: 'MICAH',
      chapter: '7',
      verse: '1'
    },
    'PSALM.2.1': {
      id: 'PSALM.2.1',
      reference: 'Psalm 2:1',
      content: 'Why do the nations rage and the peoples plot in vain?',
      verseNum: 1,
      bookId: 'PSALM',
      chapter: '2',
      verse: '1'
    },
    'PSALM.16.10': {
      id: 'PSALM.16.10',
      reference: 'Psalm 16:10',
      content: 'For you will not abandon my soul to Sheol, or let your holy one see corruption.',
      verseNum: 10,
      bookId: 'PSALM',
      chapter: '16',
      verse: '10'
    },
    'PSALM.22.1': {
      id: 'PSALM.22.1',
      reference: 'Psalm 22:1',
      content: 'My God, my God, why have you forsaken me? Why are you so far from saving me, from the words of my groaning?',
      verseNum: 1,
      bookId: 'PSALM',
      chapter: '22',
      verse: '1'
    },
    'PSALM.22.16': {
      id: 'PSALM.22.16',
      reference: 'Psalm 22:16',
      content: 'For dogs encompass me; a company of evildoers encircles me; they have pierced my hands and feet.',
      verseNum: 16,
      bookId: 'PSALM',
      chapter: '22',
      verse: '16'
    },
    'PSALM.41.9': {
      id: 'PSALM.41.9',
      reference: 'Psalm 41:9',
      content: 'Even my close friend in whom I trusted, who ate my bread, has lifted his heel against me.',
      verseNum: 9,
      bookId: 'PSALM',
      chapter: '41',
      verse: '9'
    },
    'PSALM.118.22': {
      id: 'PSALM.118.22',
      reference: 'Psalm 118:22',
      content: 'The stone that the builders rejected has become the cornerstone.',
      verseNum: 22,
      bookId: 'PSALM',
      chapter: '118',
      verse: '22'
    },
    'PSALM.118.25': {
      id: 'PSALM.118.25',
      reference: 'Psalm 118:25',
      content: 'Save us, we pray, O LORD! O LORD, we pray, give us success! Blessed is he who comes in the name of the LORD!',
      verseNum: 25,
      bookId: 'PSALM',
      chapter: '118',
      verse: '25'
    },
    'ZEC.10.1': {
      id: 'ZEC.10.1',
      reference: 'Zechariah 10:1',
      content: 'Ask of the LORD rain in the time of the latter rain; so the LORD will make lightning, and He will give them showers of rain, to everyone grass in the field.',
      verseNum: 1,
      bookId: 'ZEC',
      chapter: '10',
      verse: '1'
    },
    'ZECHARIAH.9.9': {
      id: 'ZECHARIAH.9.9',
      reference: 'Zechariah 9:9',
      content: 'Rejoice greatly, O daughter of Zion! Shout in triumph, O daughter of Jerusalem! Behold, your king is coming to you; He is just and endowed with salvation, humble, and mounted on a donkey, even on a colt, the foal of a donkey.',
      verseNum: 9,
      bookId: 'ZECHARIAH',
      chapter: '9',
      verse: '9'
    },
    'ZECHARIAH.11.12': {
      id: 'ZECHARIAH.11.12',
      reference: 'Zechariah 11:12',
      content: 'Then I said to them, "If it seems good to you, give me my wages; but if not, keep them." And they weighed out as my wages thirty pieces of silver.',
      verseNum: 12,
      bookId: 'ZECHARIAH',
      chapter: '11',
      verse: '12'
    },
    'ZECHARIAH.12.10': {
      id: 'ZECHARIAH.12.10',
      reference: 'Zechariah 12:10',
      content: 'And I will pour out on the house of David and the inhabitants of Jerusalem a spirit of grace and pleas for mercy, so that, when they look on me, on him whom they have pierced, they shall mourn for him, as one mourns for an only child, and weep bitterly over him, as one weeps over a firstborn.',
      verseNum: 10,
      bookId: 'ZECHARIAH',
      chapter: '12',
      verse: '10'
    },
    'ZECHARIAH.13.7': {
      id: 'ZECHARIAH.13.7',
      reference: 'Zechariah 13:7',
      content: 'Awake, O sword, against my shepherd, against the man who stands next to me, declares the LORD of hosts. Strike the shepherd, and the sheep will be scattered; I will turn my hand against the little ones.',
      verseNum: 7,
      bookId: 'ZECHARIAH',
      chapter: '13',
      verse: '7'
    }
  },

  updateTranslation: function(val) {
    this.translation = val;
  },

  closeOverlay: function(event) {
    if (!event || event.target === document.getElementById('passage-overlay')) {
      document.getElementById('passage-overlay').classList.remove('active');
    }
  },

  formatRef: function(raw) {
    return raw.trim().toUpperCase()
      .replace(/[\s_]+/g, '.')
      .replace(/\+/g, '.')
      .replace(/[:\-–]/g, '.')
      .replace(/[^\w.]/g, '')
      .replace(/\.+/g, '.')
      .replace(/^\./, '').replace(/\.$/, '');
  },

  fetchVerse: async function(verseId) {
    if (this.cache[verseId]) return this.cache[verseId];
    const parts = verseId.split('.');
    if (parts.length < 2) throw new Error('Invalid reference');

    let bookRaw = parts[0];
    if (/^\d+$/.test(bookRaw) && parts.length > 2) {
      bookRaw = bookRaw + parts[1];
    }
    if (bookRaw.length > 3) {
      const map = { PSALM: 'psalms', PSALMS: 'psalms', ZECHARIAH: 'zechariah' };
      bookRaw = map[bookRaw] || bookRaw;
    }
    const book = bookRaw.toLowerCase();
    const chapter = /^\d+$/.test(parts[0]) && parts.length > 2 ? parts[2] : parts[1];
    const versePart = /^\d+$/.test(parts[0]) && parts.length > 3 ? parts[3] : parts[2];
    let url = `https://bible-api.com/${book}+${chapter}`;
    if (versePart) url += `:${versePart}`;
    url += `?translation=${this.translation}`;

    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error(`${r.status} – Not Found`);
      const j = await r.json();
      if (!j.verses || !j.verses.length) throw new Error('Verse not found');
      const v = (versePart === 'LAST') ? j.verses[j.verses.length - 1] : j.verses[0];
      const result = {
        id: `${v.book_id}.${v.chapter}.${v.verse}`,
        reference: `${v.book_name} ${v.chapter}:${v.verse}`,
        content: v.text.trim(),
        verseNum: v.verse,
        bookId: v.book_id,
        chapter: v.chapter,
        verse: v.verse
      };
      this.cache[result.id] = result;
      return result;
    } catch (err) {
      const fallback = this.localFallback && this.localFallback[verseId];
      if (!fallback) throw err;
      this.cache[verseId] = fallback;
      return fallback;
    }
  },

  loadChain: async function(startId, count) {
    const chain = [];
    let currentId = startId;
    for (let i = 0; i < count && currentId; i++) {
      try {
        const data = await this.fetchVerse(currentId);
        chain.push(data);
        currentId = `${data.bookId}.${data.chapter}.${data.verse + 1}`;
      } catch (err) {
        try {
          const parts = currentId.split('.');
          const nextChapterId = `${parts[0]}.${parseInt(parts[1]) + 1}.1`;
          const data = await this.fetchVerse(nextChapterId);
          chain.push(data);
          currentId = `${data.bookId}.${data.chapter}.${data.verse + 1}`;
        } catch (err2) {
          currentId = null;
        }
      }
    }
    return chain;
  },

  loadChainBack: async function(startId, count) {
    const chain = [];
    let currentId = startId;
    for (let i = 0; i < count && currentId; i++) {
      try {
        const data = await this.fetchVerse(currentId);
        chain.unshift(data);
        if (data.verse > 1) {
          currentId = `${data.bookId}.${data.chapter}.${data.verse - 1}`;
        } else if (data.chapter > 1) {
          currentId = `${data.bookId}.${data.chapter - 1}.LAST`;
        } else {
          currentId = null;
        }
      } catch (err) {
        currentId = null;
      }
    }
    let furthestPrevId = null;
    if (chain.length > 0) {
      const first = chain[0];
      if (first.verse > 1) furthestPrevId = `${first.bookId}.${first.chapter}.${first.verse - 1}`;
      else if (first.chapter > 1) furthestPrevId = `${first.bookId}.${first.chapter - 1}.LAST`;
    }
    return { chain, furthestPrevId };
  },

  renderVerses: function() {
    const contentArea = document.getElementById('passage-text-content');
    if (!contentArea) return;
    if (!this.verses.length) return;

    const anchorId = this.anchorRef;
    let html = '';

    html += '<div class="load-prev-strip">';
    if (this.topPrevId) {
      html += `<button class="terminal-btn" id="btn-load-prev-verse" style="margin-right:8px;"><i class="fa-solid fa-arrow-up"></i> Load Previous Verses</button>`;
    } else {
      html += '<span class="passage-hint">Beginning of passage</span>';
    }
    html += '</div>';

    this.verses.forEach(v => {
      const isAnchor = v.id === anchorId;
      const anchorIdx = this.verses.findIndex(x => x.id === anchorId);
      const myIdx = this.verses.indexOf(v);
      const isPrev = myIdx < anchorIdx;
      const cls = isAnchor ? 'anchor-verse' : isPrev ? 'prev-verse' : '';
      html += `
        <div class="verse-block ${cls}">
          <span class="verse-num">${v.verseNum}</span>
          <span class="verse-text">${v.content}</span>
        </div>`;
    });

    html += '<div class="load-more-strip">';
    if (this.bottomNextId) {
      html += `<button class="terminal-btn" id="btn-load-next-verse"><i class="fa-solid fa-arrow-down"></i> Read More</button>`;
    } else {
      html += '<span class="passage-hint">End of passage</span>';
    }
    html += '</div>';

    contentArea.innerHTML = html;

    const anchorEl = contentArea.querySelector('.anchor-verse');
    if (anchorEl) anchorEl.scrollIntoView({ block: 'center', behavior: 'smooth' });

    const prevBtn = document.getElementById('btn-load-prev-verse');
    if (prevBtn) {
      prevBtn.onclick = async () => {
        const { chain, furthestPrevId } = await this.loadChainBack(this.topPrevId, 4);
        this.verses = chain.concat(this.verses);
        if (chain.length) {
          const first = chain[0];
          this.topPrevId = furthestPrevId;
        } else {
          this.topPrevId = null;
        }
        this.renderVerses();
        const blocks = contentArea.querySelectorAll('.verse-block');
        if (blocks.length >= chain.length && chain.length > 0) blocks[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
    }

    const nextBtn = document.getElementById('btn-load-next-verse');
    if (nextBtn) {
      nextBtn.onclick = async () => {
        if (!this.bottomNextId) return;
        const btn = nextBtn;
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch spinner"></i> Loading…';
        try {
          const chain = await this.loadChain(this.bottomNextId, 4);
          this.verses = this.verses.concat(chain);
          if (chain.length) {
            const last = chain[chain.length - 1];
            this.bottomNextId = `${last.bookId}.${last.chapter}.${last.verse + 1}`;
          } else {
            this.bottomNextId = null;
          }
          this.renderVerses();
          const blocks = contentArea.querySelectorAll('.verse-block');
          if (blocks.length) blocks[blocks.length - (chain.length || 1)].scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (err) {
          btn.disabled = false;
          btn.innerHTML = '<i class="fa-solid fa-arrow-down"></i> Read More';
        }
      };
    }
  },

  displayPassage: async function(pKey) {
    const contentArea = document.getElementById('passage-text-content');
    const titleArea = document.getElementById('passage-ref-title');
    const overlay = document.getElementById('passage-overlay');

    // Set initial day/night mode based on stored preference or default
    this.isNightMode = localStorage.getItem('bibleReaderNightMode') === 'true';
    this._updateNightModeUI(overlay, document.getElementById('btn-passage-day-night'));

    contentArea.innerHTML = `
      <div class="state-box">
        <div class="icon"><i class="fa-solid fa-circle-notch spinner"></i></div>
        <p>Fetching passage…</p>
      </div>`;
    overlay.classList.add('active');

    const formattedRef = this.formatRef(pKey);
    const parts = formattedRef.split('.');
    const verseRef = parts.length >= 2 ? `${parts[0]}.${parts[1]}.${parts[2] || '1'}` : formattedRef;

    try {
      const anchor = await this.fetchVerse(verseRef);
      this.anchorRef = anchor.id;
      this.verses = [anchor];
      this.topPrevId = (anchor.verse > 1) ? `${anchor.bookId}.${anchor.chapter}.${anchor.verse - 1}` : (anchor.chapter > 1 ? `${anchor.bookId}.${anchor.chapter - 1}.LAST` : null);
      this.bottomNextId = `${anchor.bookId}.${anchor.chapter}.${anchor.verse + 1}`;

      if (this.bottomNextId) {
        const after = await this.loadChain(this.bottomNextId, 4);
        this.verses = this.verses.concat(after);
        if (after.length) {
          const last = after[after.length - 1];
          this.bottomNextId = `${last.bookId}.${last.chapter}.${last.verse + 1}`;
        }
      }

      titleArea.innerText = anchor.reference;
      this.renderVerses();
    } catch (err) {
      console.error('BibleReader error:', err);
      contentArea.innerHTML = `
        <div class="state-box">
          <div class="icon"><i class="fa-solid fa-triangle-exclamation"></i></div>
          <p>Could not load passage.</p>
          <small>${err.message}</small>
          <br><button class="terminal-btn" onclick="window.BibleReader.closeOverlay()" style="margin-top:10px;">Close</button>
        </div>`;
    }
  },

  _updateNightModeUI: function(overlay, button) {
    if (this.isNightMode) {
      overlay.classList.add('night-mode');
      button.innerHTML = '<i class="fa-solid fa-sun"></i>';
      button.title = 'Toggle Day Mode';
    } else {
      overlay.classList.remove('night-mode');
      button.innerHTML = '<i class="fa-solid fa-moon"></i>';
      button.title = 'Toggle Night Mode';
    }
    localStorage.setItem('bibleReaderNightMode', this.isNightMode);
  },

  toggleNightMode: function() {
    this.isNightMode = !this.isNightMode;
    const overlay = document.getElementById('passage-overlay');
    const dayNightBtn = document.getElementById('btn-passage-day-night');
    this._updateNightModeUI(overlay, dayNightBtn);
    this.renderVerses(); // Re-render to apply text color changes if needed
  }
};

// Bind the day/night toggle button after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const dayNightBtn = document.getElementById('btn-passage-day-night');
  if (dayNightBtn) {
    dayNightBtn.onclick = () => window.BibleReader.toggleNightMode();
  }
});
