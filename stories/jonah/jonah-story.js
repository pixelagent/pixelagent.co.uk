    /* =========================================================================
       2D SVG CHARACTERS
       ========================================================================= */
    const CHARACTERS = {
      jonah: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="45" r="30" fill="#FFAD87" stroke="#0A0812" stroke-width="4"/>
    <path d="M25 35 Q50 15 75 35" fill="none" stroke="#634123" stroke-width="12" stroke-linecap="round"/>
    <circle cx="40" cy="42" r="4" fill="#0A0812"/>
    <circle cx="60" cy="42" r="4" fill="#0A0812"/>
    <path d="M38 34 Q42 32 44 35" fill="none" stroke="#0A0812" stroke-width="3"/>
    <path d="M62 34 Q58 32 56 35" fill="none" stroke="#0A0812" stroke-width="3"/>
    <path d="M42 62 Q50 50 58 62" fill="none" stroke="#0A0812" stroke-width="4" stroke-linecap="round"/>
    <path d="M20 75 Q50 70 80 75 L75 100 L25 100 Z" fill="#FF6B5B" stroke="#0A0812" stroke-width="4"/>
  </svg>`,
      god: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 50 Q10 30 35 35 Q50 15 70 30 Q90 25 85 50 Q95 70 75 75 Q50 90 30 75 Q5 70 20 50 Z" fill="#FFD84D" stroke="#0A0812" stroke-width="4"/>
    <path d="M30 52 Q40 42 45 50" fill="none" stroke="#0A0812" stroke-width="4"/>
    <path d="M70 52 Q60 42 55 50" fill="none" stroke="#0A0812" stroke-width="4"/>
    <path d="M35 68 Q50 78 65 68" fill="none" stroke="#0A0812" stroke-width="5" stroke-linecap="round"/>
  </svg>`,
      sailors: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="45" r="28" fill="#E0A96D" stroke="#0A0812" stroke-width="4"/>
    <path d="M20 30 L80 30 L50 10 Z" fill="#4ECDC4" stroke="#0A0812" stroke-width="4"/>
    <circle cx="42" cy="45" r="4" fill="#0A0812"/>
    <circle cx="58" cy="45" r="4" fill="#0A0812"/>
    <path d="M35 58 Q50 68 65 58" fill="none" stroke="#0A0812" stroke-width="4"/>
    <path d="M25 78 Q50 72 75 78 L70 100 L30 100 Z" fill="#1C3A63" stroke="#0A0812" stroke-width="4"/>
  </svg>`,
      king: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="48" r="26" fill="#FFCDA3" stroke="#0A0812" stroke-width="4"/>
    <path d="M25 28 L35 40 L50 24 L65 40 L75 28 L70 45 L30 45 Z" fill="#FFD84D" stroke="#0A0812" stroke-width="3"/>
    <circle cx="44" cy="50" r="3.5" fill="#0A0812"/>
    <circle cx="56" cy="50" r="3.5" fill="#0A0812"/>
    <path d="M40 64 Q50 56 60 64" fill="none" stroke="#0A0812" stroke-width="3"/>
    <path d="M28 78 L72 78 L65 100 L35 100 Z" fill="#B98CFF" stroke="#0A0812" stroke-width="4"/>
  </svg>`,
      narrator: null
    };

    /* =========================================================================
       STORY DATA
       ========================================================================= */
    const STORY = [
      {
        id: "escaping", name: "Dialogue: Escaping",
        bg: "radial-gradient(circle at 30% 20%, #1c3a63, #0d2238 65%, #071220)",
        particle: "dusk", svg: "Act1_01_A_small_town_by_the_sea",
        lines: [
          { speaker: "narrator", fx: "fade", text: "Long ago, in a small town by the sea, there lived a man named Jonah.", align: "left", svg: "Act1_01_A_small_town_by_the_sea" },
          { speaker: "god", fx: "bounce", text: "Jonah! Go to the great city of Nineveh. Tell them I see how they treat each other, and it must change.", align: "right", svg: "Act1_02_The_Call_to_Nineveh" },
          { speaker: "jonah", fx: "type", text: "Nineveh?! Those people are loud, and rude, and NOT my problem.", align: "left", svg: "Act1_03_Nineveh" },
          { speaker: "jonah", fx: "wave", text: "Nope. Nope nope nope. I am going the other way. As far as boats can go.", svg: "Act1_04_Nope_Going_the_other_way" },
          {
            speaker: "narrator", fx: "fade", text: "So Jonah packed a bag, ran to the docks at Joppa, and looked for a ship.",
            align: "center", svg: "Act1_05_The_Docks_at_Joppa",
            choices: [
              { label: "Buy a ticket super fast 🎫", note: "Jonah buys the very first ticket he sees. The ship is still headed to Tarshish." },
              { label: "Hide behind a crate first 📦", note: "Jonah peeks around a crate... then buys a ticket anyway. Tarshish it is." }
            ]
          },
          { speaker: "narrator", fx: "type", text: "He found a ship sailing to Tarshish — which was in the exact opposite direction of Nineveh.", svg: "Act1_05_Found_a_ship_to_Tarshish" },
          { speaker: "jonah", fx: "fade", text: "Perfect. If I just sail away fast enough, maybe I can outrun a job I don't want to do.", svg: "Act1_07_Sail_away_fast_enough" },
          { speaker: "narrator", fx: "fade", text: "Jonah climbed aboard, went below deck, curled up... and fell fast asleep.", svg: "Act1_08_Fast_asleep_below_deck" }
        ]
      },
      {
        id: "trapped", name: "Feeling Trapped",
        bg: "radial-gradient(circle at 50% 30%, #14335a, #0A1930 60%, #050b18)",
        particle: "storm", svg: "Act2_01_Sky_turned_the_color_of_a_bruise",
        lines: [
          { speaker: "narrator", fx: "shake", text: "Out on the water, the sky turned the color of a bruise. The wind began to howl.", align: "left", svg: "Act2_01_Sky_turned_the_color_of_a_bruise" },
          { sfx: "CRASH!", speaker: "sailors", fx: "shake", text: "ALL HANDS! THE SEA IS EATING THE SHIP!", align: "center", svg: "Act2_02_The_sea_is_eating_the_ship" },
          {
            speaker: "narrator", fx: "shake", text: "Waves the size of houses slammed the deck. The sailors threw cargo overboard, praying to anyone who'd listen.",
            align: "right", svg: "Act2_03_Sailors_threw_cargo_overboard",
            choices: [
              { label: "Jonah stays quiet below 🤫", note: "Jonah tries to sleep through it. The storm gets louder anyway." },
              { label: "Jonah grips the mast 😬", note: "Jonah holds on tight. The storm doesn't care. It keeps roaring." }
            ]
          },
          { speaker: "sailors", fx: "shake", text: "Sleeping man! Wake up! Whoever's fault this storm is — CONFESS!", svg: "Act2_04_Wake_up_Confess" },
          { speaker: "jonah", fx: "fade", text: "...It's me. I ran from something I was supposed to do.", svg: "Act2_05_Its_me_I_ran" },
          { speaker: "jonah", fx: "fade", text: "Throw me in — maybe the sea will calm down.", svg: "Act2_06_Throw_me_in" },
          { speaker: "narrator", fx: "fade", text: "The sailors didn't want to. But the storm gave them no choice.", svg: "Act2_07_The_storm_gave_them_no_choice" },
          { speaker: "narrator", fx: "fade", text: "Jonah hit the cold, dark water — and the moment he did, the storm went silent.", svg: "Act2_08_Jonah_hit_the_water_the_storm_went_silent" },
          { sfx: "GULP!", speaker: "narrator", fx: "fade", text: "Down, down, down he sank... until something HUGE rose up beneath him.", svg: "Act2_09_Down_down_something_HUGE_rose_up" },
          { speaker: "narrator", fx: "bounce", text: "A colossal whale opened its enormous jaws and swallowed Jonah whole.", svg: "Act2_10_A_colossal_whale_opened_its_enormous_jaws" },
          { speaker: "jonah", fx: "fade", text: "It's... dark in here. And warm. And it smells like the bottom of the sea.", svg: "Act2_11_Dark_warm_smells_like_the_sea" },
          { speaker: "narrator", fx: "fade", text: "For three days, Jonah sat inside the belly of the whale, wrapped in ribs like a cave, with nothing to do but think.", svg: "Act2_12_Three_days_wrapped_in_ribs_like_a_cave" },
          { speaker: "jonah", fx: "type", text: "I ran because I was scared. Not of Nineveh — of what it would mean to actually go there.", svg: "Act2_13_I_ran_because_I_was_scared" },
          { speaker: "jonah", fx: "fade", text: "Okay. I hear you. I'll go. Just... please, get me out of this fish.", svg: "Act2_14_Okay_I_hear_you_Ill_go" }
        ]
      },
      {
        id: "mission", name: "The Mission",
        bg: "radial-gradient(circle at 60% 20%, #4a3a1a, #5c4033 65%, #23160a)",
        particle: "desert", svg: "Act3_01_Sucked_from_the_deep_spat_onto_the_sand",
        lines: [
          { sfx: "PTOOEY!", speaker: "narrator", fx: "bounce", text: "The whale swam to shore and spat Jonah out onto the sand.", svg: "Act3_01_Sucked_from_the_deep_spat_onto_the_sand" },
          { speaker: "god", fx: "bounce", text: "Jonah. Go to Nineveh. I'm still asking.", align: "center", svg: "Act3_02_The_second_call" },
          { speaker: "jonah", fx: "type", text: "...Okay. This time, I'm actually going.", svg: "Act3_03_Actually_going" },
          { speaker: "narrator", fx: "fade", text: "Jonah walked for days until the ancient towers and grand arches of Nineveh rose in front of him.", svg: "Act3_04_Journey_on_the_long_dusty_road" },
          { speaker: "jonah", fx: "bounce", text: "PEOPLE OF NINEVEH! Forty days from now, this city will fall — unless something changes!", svg: "Act3_05_PEOPLE_OF_NINEVEH" },
          {
            speaker: "narrator", fx: "fade", text: "Jonah expected them to laugh. Instead, something surprising happened.", svg: "Act3_06_Surprising_reaction_from_the_King",
            align: "left",
            choices: [
              { label: "The king puts on sackcloth 👑", note: "The king takes off his crown, puts on rough cloth, and sits in the ashes to show he's sorry." },
              { label: "Even the animals fast 🐐", note: "The people declare a city-wide fast — even the goats and camels skip their dinner!" }
            ]
          },
          { speaker: "narrator", fx: "fade", text: "From the biggest palace to the smallest hut, the whole city said the same thing: we can do better.", svg: "Act3_07_City_wide_change" },
          { speaker: "narrator", fx: "type", text: "And because they were willing to change... the city was spared.", svg: "Act3_08_City_Spared" }
        ]
      },
      {
        id: "reflection", name: "Reflection",
        bg: "radial-gradient(circle at 40% 70%, #1e4d6b, #102a43 65%, #071220)",
        particle: "constellation", svg: "Act4_01_They_were_SPARED",
        lines: [
          { speaker: "jonah", fx: "shake", text: "They were SPARED?! I walked all that way and now everyone just... gets to be fine?!", align: "left", svg: "Act4_01_They_were_SPARED" },
          {
            speaker: "narrator", fx: "fade", text: "Jonah stomped off outside the city, sat under a leafy fig tree, and sulked in its shade.",
            align: "right", svg: "Act4_02_Jonah_stomped_off_sat_under_a_fig_tree",
            choices: [
              { label: "Jonah stays grumpy 😤", note: "Jonah crosses his arms. He is, in fact, extremely grumpy." },
              { label: "Jonah kicks a pebble 🪨", note: "Jonah kicks a pebble into the dirt. Still grumpy." }
            ]
          },
          { speaker: "narrator", fx: "fade", text: "Overnight, a worm nibbled the roots, and the plant withered away completely.", svg: "Act4_03_worm_nibbled_the_roots_and_the_plant_withered" },
          { sfx: "ARGH!", speaker: "jonah", fx: "type", text: "My favorite tree! Gone! Why does everything I care about disappear?!", svg: "Act4_04_My_favorite_tree_Gone" },
          { speaker: "god", fx: "fade", text: "You're upset about one small plant that you didn't even plant yourself.", svg: "Act4_05_Youre_upset_about_one_small_plant" },
          { speaker: "god", fx: "fade", text: "So why is it so hard to believe I'd care about a whole city full of people — even ones who made mistakes?", svg: "Act4_06_care_about_a_whole_city_full_of_people" },
          { speaker: "jonah", fx: "fade", text: "...I guess I wanted them to get in trouble. But I got a second chance too. Out of a fish, of all places.", svg: "Act4_05_Youre_upset_about_one_small_plant" },
          { speaker: "narrator", fx: "type", text: "And Jonah sat in the quiet, and understood — everyone stumbles sometimes. Everyone deserves a way back.", svg: "Act4_07_everyone_stumbles_sometimes" },
          { speaker: "narrator", fx: "fade", text: "THE END", svg: "Act4_08_THE_END" }
        ]
      }
    ];

    /* =========================================================================
       STATE MANAGEMENT & ENGINE
       ========================================================================= */
    let actIdx = 0, lineIdx = 0, transitioning = false, choicePending = false, nextLineTimeout = null;

    const el = s => document.querySelector(s);
    const stage = el('#stage');
    const choicesBox = el('#choices');
    const delayNote = el('#delayNote');
    const nextBtn = el('#nextBtn');
    const nextLineBtn = el('#nextLineBtn');
    const portal = el('#portal');
    const bgGradient = el('#bgGradient');
    const dotsBox = el('#dots');

    function currentAct() { return STORY[actIdx]; }

    function buildDots() {
      dotsBox.innerHTML = '';
      currentAct().lines.forEach((_, i) => {
        const d = document.createElement('div');
        d.className = 'dot' + (i === lineIdx ? ' on' : '');
        dotsBox.appendChild(d);
      });
    }

    function populateChapterSelect() {
      const select = el('#chapterSelect');
      select.innerHTML = '';
      STORY.forEach((act, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `Act ${index + 1}: ${act.name}`;
        select.appendChild(option);
      });
    }

    function buildLineHTML(text, fx) {
      if (fx === 'bounce' || fx === 'sfx') {
        return text.split(' ').map((w, i) => `<span class="word" style="animation-delay:${i * 60}ms">${escapeHtml(w)}</span>`).join(' ');
      }
      if (fx === 'shake' && text) {
        return `<span class="line-inner">${escapeHtml(text)}</span>`;
      }
      if (fx === 'type') {
        return text.split(' ').map((w, i) => `<span class="word" style="animation-delay:${i * 120}ms">${escapeHtml(w)}</span>`).join(' ');
      }
      return text.split(' ').map((w, i) => `<span class="word" style="animation-delay:${i * (fx === 'fade' ? 18 : 10)}ms">${escapeHtml(w)}</span>`).join(' ');
    }
    function escapeHtml(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

    async function renderLine() {
      if (delayNote.parentNode) {
        delayNote.parentNode.removeChild(delayNote);
      }
      delayNote.className = '';
      delayNote.textContent = '';
      stage.innerHTML = '';
      if (nextLineTimeout) {
        clearTimeout(nextLineTimeout);
        nextLineTimeout = null;
      }
      const data = currentAct().lines[lineIdx];

      // Dynamic Framework Component Assembly
      const frame = document.createElement('div');
      frame.className = `comic-frame popIn palette-act-${actIdx + 1}`;
      if (currentAct().id === 'trapped' && [0, 1, 2, 3].includes(lineIdx)) frame.classList.add('storm-flash');

      const graphicContainer = document.createElement('div');
      graphicContainer.id = 'graphicContainer';

      const svgLayer = document.createElement('div');
      svgLayer.id = 'svgLayer';

      // Choose correct illustration index asset mapping
      const targetSvgKey = data.svg || currentAct().svg;
      svgLayer.innerHTML = await loadSvg(targetSvgKey);
      graphicContainer.appendChild(svgLayer);

      if (currentAct().id === 'reflection') {
        const sunContainer = document.createElement('div');
        sunContainer.className = 'sun-container';
        sunContainer.style.display = 'flex';
        sunContainer.innerHTML = `
      <div class="sun">
        <div class="ray_box">
            <div class="ray ray1"></div><div class="ray ray2"></div>
            <div class="ray ray3"></div><div class="ray ray4"></div>
            <div class="ray ray5"></div><div class="ray ray6"></div>
            <div class="ray ray7"></div><div class="ray ray8"></div>
            <div class="ray ray9"></div><div class="ray ray10"></div>
        </div>
    </div>`;
        graphicContainer.appendChild(sunContainer);
      }

      // Inject 3D Context if inside the whale's stomach chamber environment
      const whaleContainer = document.createElement('div');
      whaleContainer.id = 'whale3d';
      graphicContainer.appendChild(whaleContainer);

      // Red heartbeat flash — pulses deep and slow, like something alive down there
      const heartbeatLayer = document.createElement('div');
      heartbeatLayer.id = 'whaleHeartbeat';
      graphicContainer.appendChild(heartbeatLayer);

      const inWhale = currentAct().id === 'trapped' && lineIdx >= 10;
      const onWater = currentAct().id === 'escaping' || (currentAct().id === 'trapped' && !inWhale);
      el('#stormLayer').classList.toggle('active', onWater);

      el('#ambientLayer').classList.toggle('active', ['mission', 'reflection'].includes(currentAct().id));

      if (inWhale) {
        whaleContainer.classList.add('active');
        heartbeatLayer.classList.add('active');
        // Keeping the interactive silhouette layered over the 3D space
        svgLayer.style.position = 'absolute';
        svgLayer.style.inset = '0';
        svgLayer.style.zIndex = '3';
        // Dynamically trigger eerie bioluminescent motes inside the whale
        setParticleMode('whalebelly');
        setTimeout(() => { if (el('#whale3d canvas') === null && renderer) whaleContainer.appendChild(renderer.domElement); }, 20);
      } else {
        // Toggle ambient layers based on act
        el('.dune-container').style.display = currentAct().id === 'mission' ? 'block' : 'none';
        el('.firefly-container').style.display = currentAct().id === 'reflection' ? 'block' : 'none';

        setParticleMode(currentAct().particle || 'dusk');
      }
      frame.appendChild(graphicContainer);

      const overlay = document.createElement('div');
      overlay.className = 'content-overlay';

      frame.appendChild(overlay);
      stage.appendChild(frame);
      overlay.appendChild(delayNote);

      // Delay dialogue appearance to show illustration first
      setTimeout(() => {
        if (data.speaker && CHARACTERS[data.speaker]) {
          const charBox = document.createElement('div');
          charBox.className = 'char-container';
          charBox.innerHTML = CHARACTERS[data.speaker];
          overlay.appendChild(charBox);
        }

        if (data.sfx) {
          const sfxDiv = document.createElement('div');
          sfxDiv.className = 'sfx fx-bounce';
          sfxDiv.innerHTML = buildLineHTML(data.sfx, 'sfx');
          overlay.appendChild(sfxDiv);
        }

        if (data.text) {
          if (data.speaker === 'narrator') {
            const speechElement = document.createElement('div');
            speechElement.className = `caption fx-${data.fx} caption-${data.align || 'center'}`;
            speechElement.innerHTML = buildLineHTML(data.text, data.fx);
            overlay.appendChild(speechElement);
          } else {
            const align = data.align || 'center';
            const wrap = document.createElement('div');
            wrap.className = `bubble-wrap align-${align}`;
            const speechElement = document.createElement('div');
            speechElement.className = `bubble ${data.speaker} fx-${data.fx} bubble-${align}`;
            speechElement.innerHTML = buildLineHTML(data.text, data.fx);
            wrap.appendChild(speechElement);
            overlay.appendChild(wrap);
          }
        } else {
          overlay.appendChild(document.createElement('div'));
        }

        const wordEls = overlay.querySelectorAll('.word');
        if (wordEls.length > 0) {
          let delayStep = 10, duration = 400;
          switch (data.fx) {
            case 'bounce':
            case 'sfx':
              delayStep = 60;
              duration = 500;
              break;
            case 'type':
              delayStep = 120;
              duration = 200;
              break;
            case 'wave':
              delayStep = 10;
              duration = 300;
              break;
            case 'fade':
              delayStep = 18;
              duration = 400;
              break;
          }
          const totalAnimTime = (wordEls.length - 1) * delayStep + duration;
          nextLineTimeout = setTimeout(() => updateNextBtn(), Math.max(totalAnimTime, 1000));
        } else {
          nextLineTimeout = setTimeout(() => updateNextBtn(), 1000);
        }
      }, 1000);

      buildDots();
      renderChoices(data);
    }

    function renderChoices(data) {
      choicesBox.innerHTML = '';
      delayNote.classList.remove('show');
      delayNote.textContent = '';
      if (data.choices && !choicePending) {
        choicePending = true;
        choicesBox.classList.add('show');
        data.choices.forEach(c => {
          const b = document.createElement('button');
          b.className = 'choiceBtn';
          b.textContent = c.label;
          b.onclick = () => {
            choicesBox.classList.remove('show');
            delayNote.textContent = c.note;
            delayNote.classList.add('show', `note-${data.align || 'center'}`);
            choicePending = false;
            updateNextBtn();
          };
          choicesBox.appendChild(b);
        });
      } else {
        choicesBox.classList.remove('show');
      }
    }

    function updateNextBtn() {
      const atEnd = lineIdx === currentAct().lines.length - 1 && !choicePending;
      nextBtn.className = `palette-act-${actIdx + 1}`;
      nextBtn.classList.toggle('show', atEnd);
      nextBtn.textContent = actIdx === STORY.length - 1 ? "Read Again ↺" : "Next Chapter ↴";
      nextBtn.classList.toggle('finale', actIdx === STORY.length - 1);

      const notAtEnd = lineIdx < currentAct().lines.length - 1 && !choicePending;
      nextLineBtn.className = `palette-act-${actIdx + 1}`;
      nextLineBtn.classList.toggle('show', notAtEnd);
      nextLineBtn.textContent = 'Next →';
    }

    async function goLine(delta) {
      if (transitioning) return;
      if (choicePending) {
        choicePending = false;
        choicesBox.classList.remove('show');
      }
      delayNote.className = '';
      nextBtn.classList.remove('show');
      nextLineBtn.classList.remove('show');
      const lines = currentAct().lines;
      const nl = lineIdx + delta;
      if (nl < 0 || nl >= lines.length) return;

      const currentFrame = stage.querySelector('.comic-frame');
      if (currentFrame) {
        transitioning = true;
        currentFrame.classList.add('popOut');
        await new Promise(resolve => {
          const onEnd = () => { transitioning = false; resolve(); };
          currentFrame.addEventListener('animationend', onEnd, { once: true });
          setTimeout(onEnd, 500);
        });
      }

      lineIdx = nl;
      await renderLine();
    }

    function goNextChapter() {
      if (transitioning) return;
      if (actIdx === STORY.length - 1) {
        fallTransition(() => { actIdx = 0; lineIdx = 0; loadAct(); });
        return;
      }
      fallTransition(() => { actIdx++; lineIdx = 0; loadAct(); });
    }

    function jumpToChapter(newActIdx) {
      if (transitioning || newActIdx < 0 || newActIdx >= STORY.length || newActIdx === actIdx) return;
      fallTransition(() => {
        actIdx = newActIdx;
        lineIdx = 0;
        loadAct();
      });
    }

    function goPrevChapter() {
      if (transitioning || actIdx === 0) return;
      fallTransition(() => { actIdx--; lineIdx = STORY[actIdx].lines.length - 1; loadAct(); });
    }

    function fallTransition(mid) {
      transitioning = true;
      portal.classList.add('falling');
      setTimeout(() => {
        mid();
        portal.classList.remove('falling');
        portal.classList.add('rising');
        setTimeout(() => {
          portal.classList.remove('rising');
          transitioning = false;
        }, 700);
      }, 750);
    }

    async function loadAct() {
      const act = currentAct();
      el('#chapterSelect').value = actIdx;
      bgGradient.style.background = act.bg;

      document.body.className = `palette-act-${actIdx + 1}`;

      choicePending = false;
      nextBtn.classList.remove('show');
      nextLineBtn.classList.remove('show');
      const currentFrame = stage.querySelector('.comic-frame');
      if (currentFrame) {
        transitioning = true;
        currentFrame.classList.add('popOut');
        await new Promise(resolve => {
          const onEnd = () => { transitioning = false; resolve(); };
          currentFrame.addEventListener('animationend', onEnd, { once: true });
          setTimeout(onEnd, 500);
        });
      }
      await renderLine();
    }

    /* =========================================================================
       ENHANCED DIRECTED 2D VECTOR ILLUSTRATION ARCHITECTURE
       ========================================================================= */
    const SVG_PATHS = {
      ship: 'assets/svg/ship.svg',
      storm: 'assets/svg/storm.svg',
      whale: 'assets/svg/whale.svg',
      whale_interior: 'assets/svg/whale_interior.svg',
      nineveh: 'assets/svg/nineveh.svg',
      nineveh_gate: 'assets/svg/nineveh_gate.svg',
      tree: 'assets/svg/tree.svg',
      withered_tree: 'assets/svg/withered_tree.svg',
      Act1_01_A_small_town_by_the_sea: 'assets/svg/Act1-01-A small town by the sea.svg',
      Act1_02_The_Call_to_Nineveh: 'assets/svg/Act1-02-The Call to Nineveh.svg',
      Act1_03_Nineveh: 'assets/svg/Act1-03-Nineveh.svg',
      Act1_04_Nope_Going_the_other_way: 'assets/svg/Act1-04-Nope Going the other way.svg',
      Act1_05_Found_a_ship_to_Tarshish: 'assets/svg/Act1-05-Found a ship to Tarshish.svg',
      Act1_05_The_Docks_at_Joppa: 'assets/svg/Act1-05-The Docks at Joppa.svg',
      Act1_06_Fast_asleep_below_deck: 'assets/svg/Act1-06-Fast asleep below deck.svg',
      Act1_07_Sail_away_fast_enough: 'assets/svg/Act1-07-Sail away fast enough.svg',
      Act1_08_Fast_asleep_below_deck: 'assets/svg/Act1-08-Fast asleep below deck.svg',
      Act2_01_Sky_turned_the_color_of_a_bruise: 'assets/svg/Act2-01-Sky turned the color of a bruise.svg',
      Act2_02_The_sea_is_eating_the_ship: 'assets/svg/Act2-02-The sea is eating the ship.svg',
      Act2_03_Sailors_threw_cargo_overboard: 'assets/svg/Act2-03-Sailors threw cargo overboard.svg',
      Act2_04_Wake_up_Confess: 'assets/svg/Act2-04-Wake up Confess.svg',
      Act2_05_Its_me_I_ran: 'assets/svg/Act2-05-Its me I ran.svg',
      Act2_06_Throw_me_in: 'assets/svg/Act2-06-Throw me in.svg',
      Act2_07_The_storm_gave_them_no_choice: 'assets/svg/Act2-07-The storm gave them no choice.svg',
      Act2_08_Jonah_hit_the_water_the_storm_went_silent: 'assets/svg/Act2-08-Jonah hit the water — the storm went silent.svg',
      Act2_09_Down_down_something_HUGE_rose_up: 'assets/svg/Act2-09-Down down something HUGE rose up.svg',
      Act2_10_A_colossal_whale_opened_its_enormous_jaws: 'assets/svg/Act2-10-A colossal whale opened its enormous jaws.svg',
      Act2_11_Dark_warm_smells_like_the_sea: 'assets/svg/Act2-11-Dark warm smells like the sea.svg',
      Act2_12_Three_days_wrapped_in_ribs_like_a_cave: 'assets/svg/Act2-12-Three days wrapped in ribs like a cave.svg',  
      Act2_13_I_ran_because_I_was_scared: 'assets/svg/Act2-13-I ran because I was scared.svg',
      Act2_14_Okay_I_hear_you_Ill_go: 'assets/svg/Act2-14-Okay I hear you Ill go.svg',
      Act3_01_Sucked_from_the_deep_spat_onto_the_sand: 'assets/svg/Act3-01-Sucked from the deep, spat onto the sand.svg',
      Act3_02_The_second_call: 'assets/svg/Act3-02-The second call.svg',
      Act3_03_Actually_going: 'assets/svg/Act3-03-Actually going.svg',
      Act3_04_Journey_on_the_long_dusty_road: 'assets/svg/Act3-04-Journey on the long dusty road.svg',
      Act3_05_PEOPLE_OF_NINEVEH: 'assets/svg/Act3-05-PEOPLE OF NINEVEH.svg',
      Act3_06_Surprising_reaction_from_the_King: 'assets/svg/Act3-06-Surprising reaction from the King.svg',
      Act3_07_City_wide_change: 'assets/svg/Act3-07-City-wide change.svg',
      Act3_08_City_Spared: 'assets/svg/Act3-08-City Spared.svg',
      Act4_01_They_were_SPARED: 'assets/svg/Act4-01-They were SPARED.svg',
      Act4_02_Jonah_stomped_off_sat_under_a_fig_tree: 'assets/svg/Act4-02-Jonah stomped off sat under a fig tree.svg',
      Act4_03_worm_nibbled_the_roots_and_the_plant_withered: 'assets/svg/Act4-03-worm nibbled the roots and the plant withered.svg',
      Act4_04_My_favorite_tree_Gone: 'assets/svg/Act4-04-My favorite tree Gone.svg',
      Act4_05_Youre_upset_about_one_small_plant: 'assets/svg/Act4-05-You\'re upset about one small plant.svg',
      Act4_06_care_about_a_whole_city_full_of_people: 'assets/svg/Act4-06-care about a whole city full of people.svg',
      Act4_07_everyone_stumbles_sometimes: 'assets/svg/Act4-07-everyone stumbles sometimes.svg',
      Act4_08_THE_END: 'assets/svg/Act4-08-THE END.svg'
    };
    const SVG_INLINE = {
      ship: `<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0a1520"/>
            <stop offset="60%" stop-color="#112233"/>
            <stop offset="100%" stop-color="#1c3651"/>
          </linearGradient>
          <linearGradient id="sea1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#1c436d"/>
            <stop offset="50%" stop-color="#0e2540"/>
            <stop offset="100%" stop-color="#05101c"/>
          </linearGradient>
          <linearGradient id="hullGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#e65c40"/>
            <stop offset="70%" stop-color="#bc462e"/>
            <stop offset="100%" stop-color="#8a2e1c"/>
          </linearGradient>
          <linearGradient id="sailGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="60%" stop-color="#fff4e0"/>
            <stop offset="100%" stop-color="#e3d5ba"/>
          </linearGradient>
        </defs>
        <rect width="600" height="400" fill="url(#sky1)"/>
        <circle cx="500" cy="90" r="45" fill="#FFF7E8" opacity="0.1"/>
        <circle cx="500" cy="90" r="25" fill="#FFF7E8" opacity="0.15"/>
        <rect y="230" width="600" height="170" fill="url(#sea1)"/>
        <g transform="translate(40, -10)">
          <line x1="240" y1="70" x2="100" y2="250" stroke="#0A0812" stroke-width="2.5"/>
          <line x1="240" y1="40" x2="350" y2="80" stroke="#0A0812" stroke-width="2.5"/>
          <line x1="350" y1="80" x2="440" y2="250" stroke="#0A0812" stroke-width="2"/>
          <line x1="240" y1="250" x2="240" y2="40" stroke="#0A0812" stroke-width="9" stroke-linecap="round"/>
          <line x1="350" y1="250" x2="350" y2="80" stroke="#0A0812" stroke-width="7" stroke-linecap="round"/>
          <path d="M240 55 C330 85, 320 195, 240 220 C280 165, 280 100, 240 55 Z" fill="url(#sailGrad)" stroke="#0A0812" stroke-width="4.5" stroke-linejoin="round"/>
          <path d="M350 90 C410 115, 400 195, 350 215 C375 175, 375 125, 350 90 Z" fill="url(#sailGrad)" stroke="#0A0812" stroke-width="4" stroke-linejoin="round"/>
          <path d="M80 230 L420 230 C455 230, 480 255, 455 295 L400 295 L120 295 Z" fill="url(#hullGrad)" stroke="#0A0812" stroke-width="5.5" stroke-linejoin="round"/>
          <path d="M92 236 L412 236 L402 255 L110 255 Z" fill="#ff8a73" stroke="#0A0812" stroke-width="2.5"/>
          <circle cx="170" cy="265" r="9" fill="#FFF7E8" stroke="#0A0812" stroke-width="3"/>
          <circle cx="250" cy="265" r="9" fill="#FFF7E8" stroke="#0A0812" stroke-width="3"/>
          <circle cx="330" cy="265" r="9" fill="#FFF7E8" stroke="#0A0812" stroke-width="3"/>
          <path d="M75 230 C50 220, 35 195, 42 190 C55 190, 70 215, 75 230 Z" fill="#FFF7E8" stroke="#0A0812" stroke-width="3"/>
        </g>
        <path d="M0 265 Q75 240, 150 265 T300 265 T450 265 T600 265 L600 400 L0 400 Z" fill="#143254" stroke="#0A0812" stroke-width="5.5"/>
        <path d="M-20 305 Q80 285, 180 305 T360 305 T540 305 T620 315 L620 400 L-20 400 Z" fill="#0d213a"/>
      </svg>`,

      storm: `<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <linearGradient id="stormSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#050912"/>
            <stop offset="100%" stop-color="#0f1b29"/>
          </linearGradient>
          <linearGradient id="lightningGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff" stop-opacity="1"/>
            <stop offset="100%" stop-color="#ffd84d" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <rect width="600" height="400" fill="url(#stormSky)"/>
        <path id="lightning-bolt" d="M420 40 L370 160 L410 160 L330 270 L360 270 L280 370 L305 250 L270 250 L330 140 L300 140 Z" fill="#FFD84D" stroke="#FFF7E8" stroke-width="3.5" stroke-linejoin="miter"/>
        <path d="M-40 60 Q40 -10, 140 30 Q200 -20, 290 20 Q370 -10, 460 40 Q540 10, 640 70 L640 0 L-40 0 Z" fill="#1b2333" stroke="#0A0812" stroke-width="5"/>
        <path d="M10 80 Q100 20, 210 50 Q290 10, 400 40 Q500 20, 600 80 L600 0 L0 0 Z" fill="#121824"/>
        <g transform="translate(190, 150) rotate(22)">
          <line x1="90" y1="90" x2="90" y2="-30" stroke="#0A0812" stroke-width="7"/>
          <path d="M90 -10 C130 15, 120 60, 90 70 Z" fill="#4ecdc4" opacity="0.4" stroke="#0A0812" stroke-width="3"/>
          <path d="M10 80 L170 80 L190 115 L25 115 Z" fill="#6c757d" stroke="#0A0812" stroke-width="5" stroke-linejoin="round"/>
          <circle cx="55" cy="98" r="5" fill="#FFF7E8" stroke="#0A0812" stroke-width="2"/>
          <circle cx="100" cy="98" r="5" fill="#FFF7E8" stroke="#0A0812" stroke-width="2"/>
        </g>
        <path d="M-20 250 C70 180, 130 220, 200 270 C290 170, 370 220, 450 280 C530 190, 580 230, 640 250 L640 400 L-20 400 Z" fill="#1d3557" stroke="#0A0812" stroke-width="6" stroke-linejoin="round"/>
        <path d="M-20 300 C90 240, 180 280, 260 300 C340 240, 430 260, 510 310 C570 250, 600 270, 640 290 L640 400 L-20 400 Z" fill="#0f1f34"/>
        <line x1="80" y1="60" x2="30" y2="260" stroke="#4ecdc4" opacity="0.25" stroke-width="3"/>
        <line x1="280" y1="40" x2="230" y2="240" stroke="#4ecdc4" opacity="0.25" stroke-width="3"/>
        <line x1="510" y1="70" x2="460" y2="270" stroke="#4ecdc4" opacity="0.25" stroke-width="3"/>
      </svg>`,

      whale: `<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <linearGradient id="abyss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0b132b"/>
            <stop offset="100%" stop-color="#010614"/>
          </linearGradient>
          <linearGradient id="whaleSkin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#2b4566"/>
            <stop offset="50%" stop-color="#1c2d42"/>
            <stop offset="100%" stop-color="#0f1926"/>
          </linearGradient>
        </defs>
        <rect width="600" height="400" fill="url(#abyss)"/>
        <circle cx="90" cy="310" r="10" fill="#4ECDC4" opacity="0.25"/>
        <circle cx="115" cy="290" r="5" fill="#4ECDC4" opacity="0.15"/>
        <circle cx="510" cy="110" r="14" fill="#4ECDC4" opacity="0.2"/>
        <circle cx="530" cy="75" r="7" fill="#4ECDC4" opacity="0.3"/>
        <g transform="translate(30, 40)">
          <path d="M490 140 C540 95, 560 40, 530 15 C495 20, 465 75, 445 110 Z" fill="#17263b" stroke="#0A0812" stroke-width="4.5"/>
          <path d="M490 150 C555 160, 565 205, 545 225 C510 225, 475 180, 445 140 Z" fill="#17263b" stroke="#0A0812" stroke-width="4.5"/>
          <path d="M30 130 Q40 110, 470 145 Q410 175, 300 155 Z" fill="#1c2d42" stroke="#0A0812" stroke-width="4.5"/>
          <path d="M55 150 C45 60, 290 25, 350 115 C395 170, 330 245, 245 235 C135 230, 65 225, 55 150 Z" fill="url(#whaleSkin)" stroke="#0A0812" stroke-width="6" stroke-linejoin="round"/>
          <path d="M75 180 C115 235, 240 235, 285 190" fill="none" stroke="#0b1421" stroke-width="5" stroke-linecap="round"/>
          <path d="M90 192 C130 242, 220 242, 255 205" fill="none" stroke="#0b1421" stroke-width="5" stroke-linecap="round"/>
          <path d="M55 155 C35 155, 10 175, 25 205 C50 235, 85 215, 85 215 Z" fill="#0A0812" stroke="#0A0812" stroke-width="2"/>
          <g transform="translate(12, 148) scale(0.4)">
            <circle cx="50" cy="40" r="14" fill="#FFAD87" stroke="#0A0812" stroke-width="3"/>
            <path d="M25 68 Q50 85 75 68 L65 110 L35 110 Z" fill="#FF6B5B" stroke="#0A0812" stroke-width="3"/>
          </g>
          <circle cx="110" cy="100" r="6" fill="#FFF7E8" stroke="#0A0812" stroke-width="3"/>
          <path d="M210 195 C220 235, 190 265, 170 275 C160 255, 170 215, 190 195 Z" fill="#17263b" stroke="#0A0812" stroke-width="4.5"/>
        </g>
      </svg>`,

      whale_interior: `<svg viewBox="0 0 512 512" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <path fill="#060f1c" stroke="#0A0812" stroke-width="8" stroke-linejoin="round" d="M20 20v100c35 0 65-5 95 20l5 5 25 125 35-155 15 10c25 15 45 10 60 0l15-10 15 105 20-95 20 0 20 80 15-115 15 20c10 15 15 25 25 30 5 5 10 10 20 10 15-10 30-25 45-35 15-10 35-15 55-15V20H20zm420 340c-15 10-30 30-45 45-20 20-35 40-55 45l-5 5-5-5c-35-15-75-15-120-10l-5 5-5-5c-30-15-45-25-80-35-10 15-20 25-30 35-10 5-15 10-25 10-10 0-20-5-25-10-10-10-25-20-35-30-10-5-15-10-25-10V492h470v-40c-5-15-15-35-25-50-10-15-20-30-30-42z"/>
      </svg>`,

      nineveh: `<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <linearGradient id="desertSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#965a25"/>
            <stop offset="60%" stop-color="#c48246"/>
            <stop offset="100%" stop-color="#e3a869"/>
          </linearGradient>
          <linearGradient id="dune1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#b57c43"/>
            <stop offset="100%" stop-color="#805024"/>
          </linearGradient>
        </defs>
        <rect width="600" height="400" fill="url(#desertSky)"/>
        <circle cx="510" cy="85" r="50" fill="#FFD84D" stroke="#0A0812" stroke-width="3"/>
        <circle cx="510" cy="85" r="65" fill="#FFD84D" opacity="0.15"/>
        <path d="M0 290 Q140 230, 300 280 T600 260 L600 400 L0 400 Z" fill="url(#dune1)"/>
        <path d="M0 320 Q200 280, 400 320 T600 310 L600 400 L0 400 Z" fill="#6e3f19"/>
        <g transform="translate(70, 110)" stroke="#0A0812" stroke-width="4.5" stroke-linejoin="round">
          <rect x="60" y="60" width="55" height="140" fill="#9c6838"/>
          <polygon points="60,60 87.5,15 115,60" fill="#75471f"/>
          <rect x="140" y="20" width="80" height="180" fill="#b87f46"/>
          <polygon points="140,20 180,-20 220,20" fill="#8f5927"/>
          <rect x="250" y="80" width="65" height="120" fill="#a6713d"/>
          <rect x="340" y="40" width="90" height="160" fill="#bd854d"/>
          <polygon points="340,40 385,0 430,40" fill="#8c5423"/>
        </g>
        <rect y="350" width="600" height="50" fill="#4d2b0f" stroke="#0A0812" stroke-width="5"/>
        <g transform="translate(70, 295) scale(0.55)">
          <circle cx="50" cy="35" r="16" fill="#FFAD87" stroke="#0A0812" stroke-width="3.5"/>
          <path d="M15 70 Q50 55 85 70 L75 115 L25 115 Z" fill="#FF6B5B" stroke="#0A0812" stroke-width="3.5"/>
          <line x1="25" y1="65" x2="5" y2="120" stroke="#0A0812" stroke-width="4.5" stroke-linecap="round"/>
        </g>
      </svg>`,

      nineveh_gate: `<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <rect width="600" height="400" fill="#d49a5f"/>
        <g stroke="#0A0812" stroke-width="6" stroke-linejoin="round">
          <rect x="40" y="40" width="125" height="320" fill="#9c6330"/>
          <rect x="30" y="15" width="35" height="25" fill="#6e3e16"/>
          <rect x="85" y="15" width="35" height="25" fill="#6e3e16"/>
          <rect x="140" y="15" width="35" height="25" fill="#6e3e16"/>
          <rect x="440" y="40" width="125" height="320" fill="#9c6330"/>
          <rect x="430" y="15" width="35" height="25" fill="#6e3e16"/>
          <rect x="485" y="15" width="35" height="25" fill="#6e3e16"/>
          <rect x="540" y="15" width="35" height="25" fill="#6e3e16"/>
          <rect x="165" y="90" width="275" height="270" fill="#b3733b"/>
          <path d="M195 360 L195 230 A 105 105 0 0 1 405 230 L405 360" fill="#7d441b"/>
          <path d="M215 360 L215 240 A 85 85 0 0 1 385 240 L385 360 Z" fill="#0A0812"/>
        </g>
        <circle cx="102" cy="120" r="18" fill="#FFD84D" stroke="#0A0812" stroke-width="3.5"/>
        <circle cx="502" cy="120" r="18" fill="#FFD84D" stroke="#0A0812" stroke-width="3.5"/>
        <rect x="222" y="115" width="156" height="20" fill="#FFD84D" stroke="#0A0812" stroke-width="3.5" rx="4"/>
        <rect y="360" width="600" height="40" fill="#381d08"/>
      </svg>`,

      tree: `<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <linearGradient id="twilight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#143547"/>
            <stop offset="100%" stop-color="#1e4d6b"/>
          </linearGradient>
        </defs>
        <rect width="600" height="400" fill="url(#twilight)"/>
        <path d="M0 320 Q150 280, 300 310 T600 290 L600 400 L0 400 Z" fill="#0f2638"/>
        <path d="M265 340 L285 190 Q230 150, 190 140 L195 125 Q250 140, 295 170 Q335 130, 390 100 L400 112 Q345 150, 320 190 L335 340 Z" fill="#422d22" stroke="#0A0812" stroke-width="5.5" stroke-linejoin="round"/>
        <g stroke="#0A0812" stroke-width="5.5" stroke-linejoin="round">
          <circle cx="175" cy="135" r="60" fill="#22577a"/>
          <circle cx="285" cy="105" r="70" fill="#1f4e70"/>
          <circle cx="395" cy="115" r="65" fill="#22577a"/>
          <circle cx="230" cy="80" r="55" fill="#38a3a5"/>
          <circle cx="335" cy="70" r="60" fill="#38a3a5"/>
        </g>
        <circle cx="205" cy="180" r="11" fill="#ffccd5" stroke="#0A0812" stroke-width="2.5"/>
        <path d="M205 169 L205 155" stroke="#0A0812" stroke-width="2.5"/>
        <circle cx="355" cy="165" r="11" fill="#ffccd5" stroke="#0A0812" stroke-width="2.5"/>
        <path d="M355 154 L355 140" stroke="#0A0812" stroke-width="2.5"/>
        <rect y="335" width="600" height="65" fill="#07131c" stroke="#0A0812" stroke-width="4"/>
      </svg>`,

      withered_tree: `<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <rect width="600" height="400" fill="#142c3d"/>
        <path d="M0 320 Q150 280, 300 310 T600 290 L600 400 L0 400 Z" fill="#0b1a24"/>
        <g fill="none" stroke="#0A0812" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
          <path d="M265 340 L285 210 C290 170, 235 140, 175 130" />
          <path d="M285 210 C315 160, 365 130, 410 110" />
          <path d="M280 250 L225 190 L235 170" />
          <path d="M290 230 L345 185 L330 155" />
          <path d="M175 130 L140 135" stroke-width="4.5" stroke="#422d22"/>
          <path d="M175 130 L165 110" stroke-width="4.5" stroke="#422d22"/>
          <path d="M410 110 L440 120" stroke-width="4.5" stroke="#422d22"/>
          <path d="M410 110 L420 90" stroke-width="4.5" stroke="#422d22"/>
        </g>
        <g fill="#526475" stroke="#0A0812" stroke-width="2.5">
          <path d="M195 325 C205 325, 210 330, 200 332 Z"/>
          <path d="M245 330 C255 328, 257 334, 249 335 Z"/>
          <path d="M355 328 C365 330, 360 335, 350 332 Z"/>
          <path d="M385 324 C395 322, 397 328, 389 330 Z"/>
        </g>
        <rect y="335" width="600" height="65" fill="#040b12" stroke="#0A0812" stroke-width="4"/>
      </svg>`
    };
    const svgCache = {};
    async function loadSvg(key) {
      if (svgCache[key]) return svgCache[key];
      if (SVG_INLINE[key]) {
        svgCache[key] = SVG_INLINE[key];
        return SVG_INLINE[key];
      }
      try {
        const res = await fetch(SVG_PATHS[key]);
        if (!res.ok) throw new Error('Not found');
        const text = await res.text();
        svgCache[key] = text;
        return text;
      } catch (err) {
        console.error('SVG load failed for', key, err);
        return '<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="400" fill="#0A0812"/><text x="50%" y="50%" text-anchor="middle" fill="#FFF7E8" font-size="20">?</text></svg>';
      }
    }

    /* =========================================================================
       PARTICLE ENVIRONMENT (WITH BIO-LUMINESCENT FAIRY LIGHT ENHANCEMENTS)
       ========================================================================= */
    const canvas = el('#particles');
    const ctx = canvas.getContext('2d');
    let W, H, particles = [], mode = 'dusk';
    function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
    window.addEventListener('resize', resize); resize();

    function makeParticles() {
      particles = [];
      const cfg = {
        dusk: { n: 40, color: '255,216,77', size: [1, 3], speed: [0.05, 0.2], type: 'drift' },
        storm: { n: 80, color: '170,210,255', size: [1, 2], speed: [4, 8], type: 'rain' },
        fairylight: { n: 65, color: '78,205,196', size: [2.5, 5.5], speed: [0.15, 0.45], type: 'glow' },
        whalebelly: { n: 55, color: '78,205,196', size: [2, 5], speed: [0.06, 0.22], type: 'glow' },
        desert: { n: 40, color: '255,200,120', size: [1, 3], speed: [0.1, 0.3], type: 'drift' },
        constellation: { n: 40, color: '185,140,255', size: [1, 2], speed: [0.1, 0.2], type: 'drift' }
      }[mode] || { n: 30, color: 'fff', size: [1, 2], speed: [0.1, 0.2], type: 'drift' };

      for (let i = 0; i < cfg.n; i++) {
        particles.push({
          x: Math.random() * W, y: Math.random() * H,
          r: cfg.size[0] + Math.random() * (cfg.size[1] - cfg.size[0]),
          s: cfg.speed[0] + Math.random() * (cfg.speed[1] - cfg.speed[0]),
          color: cfg.color, type: cfg.type, phase: Math.random() * Math.PI * 2,
          eerie: mode === 'whalebelly' && Math.random() < 0.12
        });
      }
    }
    function setParticleMode(m) { if (mode === m) return; mode = m; makeParticles(); }

    function tick() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        if (p.type === 'rain') {
          ctx.strokeStyle = `rgba(${p.color},0.4)`;
          ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - 2, p.y + 12); ctx.stroke();
          p.y += p.s; p.x -= p.s * 0.2;
          if (p.y > H) { p.y = -10; p.x = Math.random() * W; }
        } else if (p.type === 'glow') {
          // Fairy Light organic float tracking loop
          p.phase += 0.015;
          let sizePulse = p.r + Math.sin(p.phase) * 1.2;
          let alphaPulse = 0.35 + Math.sin(p.phase * 1.5) * 0.2;

          if (p.eerie) {
            // A slow, watching red glint that opens and closes like an eye
            const blink = Math.max(0, Math.sin(p.phase * 0.35));
            const eerieColor = '255,40,30';
            ctx.fillStyle = `rgba(${eerieColor},${blink * 0.3})`;
            ctx.beginPath(); ctx.arc(p.x, p.y, sizePulse * 2.6 * blink, 0, 7); ctx.fill();
            ctx.fillStyle = `rgba(${eerieColor},${blink * 0.85})`;
            ctx.beginPath(); ctx.arc(p.x, p.y, sizePulse * 0.9 * blink, 0, 7); ctx.fill();
          } else {
            // Outer light bloom halo mapping
            ctx.fillStyle = `rgba(${p.color},${alphaPulse * 0.35})`;
            ctx.beginPath(); ctx.arc(p.x, p.y, sizePulse * 2.2, 0, 7); ctx.fill();

            // Core particle engine inject
            ctx.fillStyle = `rgba(255,247,232,${alphaPulse})`;
            ctx.beginPath(); ctx.arc(p.x, p.y, sizePulse * 0.8, 0, 7); ctx.fill();
          }

          p.y -= p.s; p.x += Math.sin(p.phase + p.y * 0.02) * 0.5;
          if (p.y < -20) { p.y = H + 20; p.x = Math.random() * W; }
        } else {
          ctx.fillStyle = `rgba(${p.color},0.5)`;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
          p.y -= p.s; p.x += Math.sin(p.phase + p.y * 0.01) * 0.2;
          if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        }
      });
      requestAnimationFrame(tick);
    }
    tick();

    /* =========================================================================
       THREE.JS 3D ENGINE
       ========================================================================= */
    let renderer, scene, camera, ribs = [], strands = [], debris = [], shadowBeast, glow;
    function initWhale3D() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
      camera.position.set(0, 0, 2);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(480, 480);

      scene.fog = new THREE.FogExp2(0x0a1930, 0.1);
      scene.add(new THREE.AmbientLight(0x1a2e44, 1.1));

      glow = new THREE.PointLight(0x4ECDC4, 2.2, 15); // Cool bioluminescent glow
      glow.position.set(0, 0, -2);
      scene.add(glow);
      const warm = new THREE.PointLight(0xFFD84D, 1.2, 12); // Warm lantern flicker
      warm.position.set(0.5, -0.5, -1);
      scene.add(warm);

      // A deep red heart-glow throbbing somewhere down the throat
      const heartLight = new THREE.PointLight(0xff2200, 0, 22);
      heartLight.position.set(-0.3, 0.15, -9);
      scene.add(heartLight);

      // Ribs — irregular, fleshy loops instead of clean rings
      const ribMat = new THREE.MeshToonMaterial({ color: 0x3a2a4a });
      for (let i = 0; i < 14; i++) {
        const geo = new THREE.TorusGeometry(2 + Math.sin(i * 1.3) * 0.15, 0.1 + Math.random() * 0.05, 8, 20);
        const pos = geo.attributes.position;
        for (let v = 0; v < pos.count; v++) {
          const n = Math.sin(v * 12.9 + i) * 0.025;
          pos.setXYZ(v, pos.getX(v) + n, pos.getY(v) + n, pos.getZ(v));
        }
        geo.computeVertexNormals();
        const rib = new THREE.Mesh(geo, ribMat.clone());
        rib.position.z = -i * 1.6;
        rib.rotation.x = Math.PI / 2;
        rib.rotation.z = Math.random() * Math.PI;
        rib.userData.baseScale = 0.94 + Math.random() * 0.12;
        rib.userData.phase = Math.random() * Math.PI * 2;
        scene.add(rib);
        ribs.push(rib);
      }

      // Writhing muscle strands running the length of the throat
      const strandMat = new THREE.MeshToonMaterial({ color: 0x4a1f3a });
      for (let s = 0; s < 5; s++) {
        const angle = (s / 5) * Math.PI * 2;
        const curvePts = [];
        for (let p = 0; p < 10; p++) { curvePts.push(new THREE.Vector3(Math.cos(angle) * 1.7, Math.sin(angle) * 1.7, -p * 2)); }
        const curve = new THREE.CatmullRomCurve3(curvePts);
        const geo = new THREE.TubeGeometry(curve, 40, 0.045, 6, false);
        const strand = new THREE.Mesh(geo, strandMat.clone());
        strand.userData.phase = Math.random() * Math.PI * 2;
        scene.add(strand);
        strands.push(strand);
      }

      // Drifting debris catching the bioluminescent light — bone and grit
      const debrisGeo = new THREE.IcosahedronGeometry(0.035, 0);
      const debrisMat = new THREE.MeshBasicMaterial({ color: 0xcfd8dc, transparent: true, opacity: 0.5 });
      for (let d = 0; d < 20; d++) {
        const bit = new THREE.Mesh(debrisGeo, debrisMat);
        bit.position.set((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3, -Math.random() * 18);
        bit.userData.speed = 0.008 + Math.random() * 0.015;
        bit.userData.drift = Math.random() * Math.PI * 2;
        scene.add(bit);
        debris.push(bit);
      }

      // Something else drifts in the dark, then vanishes back into it
      const beastGeo = new THREE.SphereGeometry(0.85, 12, 8);
      const beastMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0 });
      shadowBeast = new THREE.Mesh(beastGeo, beastMat);
      shadowBeast.position.set(-1.5, -0.3, -12);
      scene.add(shadowBeast);

      let heartbeatClock = 0, nextJolt = 6 + Math.random() * 5;

      function animate() {
        requestAnimationFrame(animate);
        const t = performance.now() * 0.0005;
        const dt = 1 / 60;

        camera.position.x = Math.sin(t) * 0.15;
        camera.position.y = Math.cos(t * 0.8) * 0.1;
        warm.intensity = 1.0 + Math.sin(t * 23) * 0.2 + Math.sin(t * 37) * 0.15 + (Math.random() - 0.5) * 0.1; // Lantern flicker
        glow.intensity = 2.0 + Math.sin(t * 2.2) * 0.5; // Slow bioluminescent pulse

        // Heartbeat rhythm — lub-dub — deep in the whale's throat
        heartbeatClock += dt;
        const cyc = heartbeatClock % 2.6;
        let beat = 0;
        if (cyc < 0.18) beat = Math.sin((cyc / 0.18) * Math.PI);
        else if (cyc > 0.32 && cyc < 0.55) beat = Math.sin(((cyc - 0.32) / 0.23) * Math.PI) * 0.7;
        heartLight.intensity = beat * 3.2;

        // Ribs breathe and creep past — the tunnel closing and opening
        ribs.forEach((r, i) => {
          r.position.z += 0.012;
          if (r.position.z > 3) { r.position.z = -19; r.userData.phase = Math.random() * Math.PI * 2; }
          const breathe = r.userData.baseScale + Math.sin(t * 1.6 + r.userData.phase) * 0.06 + beat * 0.03;
          r.scale.set(breathe, breathe, 1);
          r.rotation.z += 0.0015 * (i % 2 === 0 ? 1 : -1);
        });

        // Muscle strands writhe like something alive
        strands.forEach(s => {
          s.rotation.z = Math.sin(t * 0.6 + s.userData.phase) * 0.09;
          s.position.z = ((s.position.z + 0.012 + 22) % 22) - 19;
          s.material.color.setHSL(0.85, 0.4, 0.14 + beat * 0.08);
        });

        // Debris drifts toward camera then loops back into the dark
        debris.forEach(b => {
          b.position.z += b.userData.speed;
          b.position.x += Math.sin(t + b.userData.drift) * 0.001;
          if (b.position.z > 2.5) { b.position.z = -18; b.position.x = (Math.random() - 0.5) * 3; b.position.y = (Math.random() - 0.5) * 3; }
        });

        // Something large shifts in the shadows, briefly visible, then gone
        const beastCycle = (t * 0.15) % 1;
        shadowBeast.material.opacity = beastCycle < 0.15 ? Math.sin((beastCycle / 0.15) * Math.PI) * 0.35 : 0;
        shadowBeast.position.x = -1.5 + Math.sin(t * 0.3) * 1.5;

        // Occasional convulsion — the whale's belly shudders around Jonah
        nextJolt -= dt;
        if (nextJolt <= 0) {
          nextJolt = 7 + Math.random() * 8;
          const wrap = el('#whale3d');
          if (wrap && wrap.classList.contains('active')) {
            wrap.classList.remove('whale-jolt'); void wrap.offsetWidth; wrap.classList.add('whale-jolt');
          }
        }

        renderer.render(scene, camera);
      }
      animate();
    }
    initWhale3D();

    /* =========================================================================
       NAVIGATION HANDLERS
       ========================================================================= */
    let hAccum = 0, vAccum = 0, navLocked = false;

    window.addEventListener('wheel', e => {
      if (transitioning) return;
      const atEnd = lineIdx === currentAct().lines.length - 1 && !choicePending;

      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && atEnd && e.deltaY > 0) {
        vAccum += e.deltaY;
        if (!navLocked && vAccum > 120) {
          navLocked = true; vAccum = 0;
          goNextChapter();
          setTimeout(() => navLocked = false, 1400);
        }
        return;
      }

      hAccum += e.deltaX || e.deltaY;
      if (!navLocked && Math.abs(hAccum) > 100) {
        navLocked = true;
        goLine(hAccum > 0 ? 1 : -1);
        hAccum = 0;
        setTimeout(() => navLocked = false, 400);
      }
    }, { passive: true });

    window.addEventListener('keydown', e => {
      const atEnd = lineIdx === currentAct().lines.length - 1 && !choicePending;
      if (e.key === 'ArrowRight') goLine(1);
      if (e.key === 'ArrowLeft') goLine(-1);
      if (e.key === 'ArrowDown' && atEnd) goNextChapter();
      if (e.key === 'ArrowUp' && lineIdx === 0) goPrevChapter();
    });

    let touchStartX = 0;
    window.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
    window.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) goLine(dx < 0 ? 1 : -1);
    });

    el('#chapterSelect').addEventListener('change', e => {
      const newActIdx = parseInt(e.target.value, 10);
      jumpToChapter(newActIdx);
    });

    nextBtn.addEventListener('click', goNextChapter);
    nextLineBtn.addEventListener('click', () => goLine(1));
    el('#startBtn').addEventListener('click', () => {
      el('#startScreen').classList.add('hide');
      populateChapterSelect();
      loadAct();
    });

    populateChapterSelect();
    loadAct();