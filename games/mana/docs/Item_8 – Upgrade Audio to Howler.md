# Item 8 – Upgrade Audio to Howler.js (★★★★★)

## Overview

The game currently generates audio using the Web Audio API by creating oscillators in JavaScript:

```javascript
this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

playSound(frequency, duration, type = 'sine') {
    ...
}
```

While this works, it becomes increasingly difficult to manage as the game grows.

Replacing the custom audio system with **Howler.js** provides a much more scalable and professional solution.

---

# Why switch?

Howler.js provides:

- ✅ Background music
- ✅ Sound effects
- ✅ Looping audio
- ✅ Fade in/out
- ✅ Volume control
- ✅ Global mute
- ✅ Mobile compatibility
- ✅ Positional (3D) audio
- ✅ Audio sprites
- ✅ Better browser compatibility

It removes almost all of the low-level Web Audio code currently in the project.

---

# Current audio implementation

The game currently has:

- AudioContext
- Oscillators
- Generated tones
- Manual mute handling

Example:

```javascript
createAudioContext() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

playSound(freq, duration) {
    ...
}
```

This is ideal for prototypes but not for a larger game.

---

# Step 1 – Add Howler

If using modules:

```bash
npm install howler
```

For the current single HTML project, simply include the CDN.

```html
<script src="https://cdn.jsdelivr.net/npm/howler@2.2.4/dist/howler.min.js"></script>
```

Load this before your game script.

---

# Step 2 – Create a Sound Manager

Instead of generating tones every time, create reusable sound objects.

```javascript
const sounds = {

    pickup: new Howl({
        src: ['audio/pickup.mp3']
    }),

    sell: new Howl({
        src: ['audio/sell.mp3']
    }),

    dayEnd: new Howl({
        src: ['audio/day-end.mp3']
    }),

    gameOver: new Howl({
        src: ['audio/game-over.mp3']
    })

};
```

Now playing a sound becomes:

```javascript
sounds.pickup.play();
```

instead of

```javascript
playSound(700, 0.2);
```

---

# Step 3 – Replace playSound()

Instead of:

```javascript
this.playSound(800, 0.15);
```

Use:

```javascript
sounds.pickup.play();
```

Every gameplay event should trigger an appropriate sound effect.

Examples:

| Event | Sound |
|---------|--------|
| Collect manna | pickup.wav |
| Sell manna | coins.wav |
| Day complete | success.wav |
| Player hurt | hurt.wav |
| Game over | fail.wav |
| Button click | click.wav |

---

# Step 4 – Background Music

The wilderness would benefit enormously from gentle ambient music.

Example:

```javascript
const music = new Howl({

    src:['audio/desert-theme.mp3'],

    loop:true,

    volume:0.35

});

music.play();
```

Because Howler handles looping internally there is no extra code required.

---

# Step 5 – Fade Music

Instead of abruptly stopping music:

```javascript
music.stop();
```

Use:

```javascript
music.fade(
    0.35,
    0,
    2000
);
```

This gives much smoother transitions between:

- Menu
- Gameplay
- Day End
- Game Over

---

# Step 6 – Replace the Mute Button

Current code:

```javascript
this.audioCtx.suspend();
```

becomes

```javascript
Howler.mute(true);
```

and

```javascript
Howler.mute(false);
```

No AudioContext management is required.

---

# Step 7 – Volume Control

Future settings menu:

```javascript
Howler.volume(0.6);
```

Or individual sounds:

```javascript
pickup.volume(0.4);
```

---

# Step 8 – Positional Audio (Optional)

If desired, sounds can originate from world objects.

Example:

```javascript
const oasis = new Howl({

    src:['water.mp3'],

    loop:true

});

oasis.pos(
    20,
    0,
    -15
);
```

Nearby sounds become louder automatically.

Useful for:

- Oasis
- Market
- Campfire
- Temple ambience
- Wind

---

# Step 9 – Ambient Sound Layers

Instead of one music track, layer ambience.

Examples:

- Desert wind
- Birds
- Campfire
- Water
- Market chatter

Each can loop independently.

```javascript
wind.play();

birds.play();

campfire.play();
```

This creates a much richer atmosphere.

---

# Step 10 – Organise Audio

Recommended folder structure:

```
audio/

    music/
        desert-theme.mp3
        menu.mp3

    sfx/
        pickup.mp3
        sell.mp3
        hurt.mp3
        button.mp3
        day-end.mp3
        game-over.mp3

    ambient/
        wind.mp3
        birds.mp3
        oasis.mp3
```

---

# Suggested Audio Manager

Rather than scattering `Howl` objects throughout the game, create one manager.

```javascript
const AudioManager = {

    pickup: new Howl({...}),

    sell: new Howl({...}),

    music: new Howl({...}),

    hurt: new Howl({...})

};
```

Then gameplay simply calls:

```javascript
AudioManager.pickup.play();

AudioManager.sell.play();

AudioManager.music.play();
```

---

# Files to Remove

Once Howler is working you can remove:

- `createAudioContext()`
- `playSound()`
- Manual oscillator creation
- AudioContext suspend/resume logic

These become unnecessary.

---

# Benefits for Manna Collector

Replacing the custom Web Audio implementation with Howler.js will provide:

- Cleaner and more maintainable code
- Easy addition of music and ambient sound
- Smooth fades and looping
- Reliable mobile browser support
- Simple global mute and volume controls
- Support for future positional audio around landmarks such as the Oasis, Temple, Camp, and Market
- A solid foundation for expanding the game's audio without increasing complexity

Overall, this upgrade modernises the game's audio system while significantly reducing the amount of custom code that needs to be maintained.