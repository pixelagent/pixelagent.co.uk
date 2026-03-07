/**
 * STAGE POSITIONING SYSTEM - JAVASCRIPT
 * Instruments can move across the stereo field during playback
 */

// Add to your SongDesignerApp constructor:
constructor() {
    // ... existing code ...
    
    // Stage positioning data
    this.stagePositions = {
        harmony: { start: 0, end: 0, movement: 'static' },
        melody: { start: 0, end: 0, movement: 'static' },
        kick: { start: 0, end: 0, movement: 'static' },
        snare: { start: 0, end: 0, movement: 'static' },
        hihat: { start: 0, end: 0, movement: 'static' }
    };
    
    this.selectedInstrument = null;
}

// Initialize Stage Positioning
initializeStagePositioning() {
    // Setup instrument markers
    this.setupInstrumentMarkers();
    
    // Setup position sliders
    this.setupPositionSliders();
    
    // Setup movement buttons
    this.setupMovementButtons();
    
    // Setup formation presets
    this.setupFormationPresets();
}

// Setup Instrument Markers
setupInstrumentMarkers() {
    const markers = document.querySelectorAll('.instrument-marker');
    
    markers.forEach(marker => {
        marker.addEventListener('click', (e) => {
            const instrument = marker.dataset.instrument;
            this.selectInstrument(instrument);
        });
        
        // Make markers draggable
        this.makeMarkerDraggable(marker);
    });
}

// Make marker draggable on stage
makeMarkerDraggable(marker) {
    let isDragging = false;
    const stageArea = document.getElementById('stageArea');
    
    marker.addEventListener('mousedown', (e) => {
        if (e.target.closest('.marker-icon')) {
            isDragging = true;
            marker.style.cursor = 'grabbing';
        }
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const rect = stageArea.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = 100 - ((e.clientY - rect.top) / rect.height) * 100;
        
        // Constrain to stage bounds
        const constrainedX = Math.max(0, Math.min(100, x));
        const constrainedY = Math.max(0, Math.min(100, y));
        
        marker.style.left = `${constrainedX}%`;
        marker.style.bottom = `${constrainedY}%`;
        
        // Update position data (convert to -100 to 100)
        const instrument = marker.dataset.instrument;
        const panValue = (constrainedX - 50) * 2;
        
        if (this.selectedInstrument === instrument) {
            document.getElementById('startPosition').value = panValue;
            this.updatePositionDisplay('start', panValue);
            this.stagePositions[instrument].start = panValue;
        }
    });
    
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            marker.style.cursor = 'pointer';
        }
    });
}

// Select Instrument
selectInstrument(instrument) {
    // Deselect previous
    document.querySelectorAll('.instrument-marker').forEach(m => {
        m.classList.remove('selected');
    });
    
    // Select new
    const marker = document.querySelector(`[data-instrument="${instrument}"]`);
    if (marker) {
        marker.classList.add('selected');
    }
    
    this.selectedInstrument = instrument;
    
    // Update UI
    const displayNames = {
        harmony: '🎹 Background Chords',
        melody: '🎻 Main Melody',
        kick: '🥾 Kick Drum',
        snare: '🥁 Snare Drum',
        hihat: '🎩 Hi-Hat'
    };
    
    document.getElementById('selectedInstrument').textContent = displayNames[instrument];
    
    // Load instrument's current settings
    const settings = this.stagePositions[instrument];
    
    const startSlider = document.getElementById('startPosition');
    const endSlider = document.getElementById('endPosition');
    
    startSlider.disabled = false;
    endSlider.disabled = false;
    
    startSlider.value = settings.start;
    endSlider.value = settings.end;
    
    this.updatePositionDisplay('start', settings.start);
    this.updatePositionDisplay('end', settings.end);
    
    // Update movement buttons
    document.querySelectorAll('.movement-btn').forEach(btn => {
        btn.disabled = false;
        btn.classList.toggle('active', btn.dataset.movement === settings.movement);
    });
}

// Setup Position Sliders
setupPositionSliders() {
    const startSlider = document.getElementById('startPosition');
    const endSlider = document.getElementById('endPosition');
    
    startSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        this.updatePositionDisplay('start', value);
        
        if (this.selectedInstrument) {
            this.stagePositions[this.selectedInstrument].start = value;
            this.updateMarkerPosition(this.selectedInstrument, value, 'start');
        }
    });
    
    endSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        this.updatePositionDisplay('end', value);
        
        if (this.selectedInstrument) {
            this.stagePositions[this.selectedInstrument].end = value;
        }
    });
}

// Update Position Display
updatePositionDisplay(type, value) {
    const displayElement = document.getElementById(`${type}PosValue`);
    
    if (value === 0) {
        displayElement.textContent = 'Center';
    } else if (value < 0) {
        displayElement.textContent = `Left ${Math.abs(value)}%`;
    } else {
        displayElement.textContent = `Right ${value}%`;
    }
}

// Update Marker Position on Stage
updateMarkerPosition(instrument, value, type) {
    const marker = document.querySelector(`[data-instrument="${instrument}"]`);
    if (!marker) return;
    
    // Convert -100 to 100 range to 0% to 100%
    const xPercent = ((value + 100) / 2);
    marker.style.left = `${xPercent}%`;
}

// Setup Movement Buttons
setupMovementButtons() {
    document.querySelectorAll('.movement-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (!this.selectedInstrument) return;
            
            const movement = btn.dataset.movement;
            
            // Update active state
            document.querySelectorAll('.movement-btn').forEach(b => {
                b.classList.remove('active');
            });
            btn.classList.add('active');
            
            // Save movement type
            this.stagePositions[this.selectedInstrument].movement = movement;
        });
    });
}

// Setup Formation Presets
setupFormationPresets() {
    document.querySelectorAll('[data-formation]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const formation = btn.dataset.formation;
            this.applyFormation(formation);
        });
    });
}

// Apply Formation Preset
applyFormation(formation) {
    const formations = {
        'center': {
            harmony: { start: 0, end: 0, movement: 'static' },
            melody: { start: 0, end: 0, movement: 'static' },
            kick: { start: 0, end: 0, movement: 'static' },
            snare: { start: 0, end: 0, movement: 'static' },
            hihat: { start: 0, end: 0, movement: 'static' }
        },
        'spread': {
            harmony: { start: -60, end: -60, movement: 'static' },
            melody: { start: 0, end: 0, movement: 'static' },
            kick: { start: 0, end: 0, movement: 'static' },
            snare: { start: -40, end: -40, movement: 'static' },
            hihat: { start: 60, end: 60, movement: 'static' }
        },
        'rock-band': {
            harmony: { start: -30, end: -30, movement: 'static' },
            melody: { start: 30, end: 30, movement: 'static' },
            kick: { start: 0, end: 0, movement: 'static' },
            snare: { start: -20, end: -20, movement: 'static' },
            hihat: { start: 40, end: 40, movement: 'static' }
        },
        'orchestra': {
            harmony: { start: -50, end: -50, movement: 'static' },
            melody: { start: 0, end: 0, movement: 'static' },
            kick: { start: 0, end: 0, movement: 'static' },
            snare: { start: 50, end: 50, movement: 'static' },
            hihat: { start: 70, end: 70, movement: 'static' }
        },
        'swirl': {
            harmony: { start: -80, end: 80, movement: 'smooth' },
            melody: { start: 80, end: -80, movement: 'smooth' },
            kick: { start: 0, end: 0, movement: 'static' },
            snare: { start: -50, end: 50, movement: 'smooth' },
            hihat: { start: 50, end: -50, movement: 'smooth' }
        },
        'call-response': {
            harmony: { start: -70, end: -70, movement: 'static' },
            melody: { start: 70, end: 70, movement: 'static' },
            kick: { start: 0, end: 0, movement: 'static' },
            snare: { start: -70, end: 70, movement: 'swing' },
            hihat: { start: 70, end: -70, movement: 'swing' }
        }
    };
    
    const preset = formations[formation];
    if (!preset) return;
    
    // Apply to all instruments
    Object.keys(preset).forEach(instrument => {
        this.stagePositions[instrument] = { ...preset[instrument] };
        
        // Update marker position
        const marker = document.querySelector(`[data-instrument="${instrument}"]`);
        if (marker) {
            const xPercent = ((preset[instrument].start + 100) / 2);
            marker.style.left = `${xPercent}%`;
        }
    });
    
    // Update UI if instrument is selected
    if (this.selectedInstrument) {
        this.selectInstrument(this.selectedInstrument);
    }
    
    console.log(`Applied formation: ${formation}`);
}

// Calculate Pan Position During Playback
calculatePanPosition(instrument, progress) {
    const settings = this.stagePositions[instrument];
    const start = settings.start;
    const end = settings.end;
    const movement = settings.movement;
    
    switch(movement) {
        case 'static':
            return start / 100; // Convert to -1 to 1 range
            
        case 'smooth':
            // Linear interpolation from start to end
            const position = start + (end - start) * progress;
            return position / 100;
            
        case 'swing':
            // Swing back and forth (sine wave)
            const swing = start + (end - start) * Math.sin(progress * Math.PI * 2);
            return swing / 100;
            
        case 'bounce':
            // Bounce effect (absolute sine wave)
            const bounce = start + (end - start) * Math.abs(Math.sin(progress * Math.PI * 4));
            return bounce / 100;
            
        default:
            return 0;
    }
}

// Apply Pan During Playback
applyDynamicPanning(step) {
    // Calculate progress through the pattern (0 to 1)
    const progress = step / this.patternLength;
    
    // Apply panning to each instrument
    Object.keys(this.stagePositions).forEach(instrument => {
        const panValue = this.calculatePanPosition(instrument, progress);
        
        // Apply to appropriate synth/drum
        this.setPanForInstrument(instrument, panValue);
        
        // Update marker visual if playing
        if (this.isPlaying) {
            this.updateMarkerAnimation(instrument, panValue);
        }
    });
}

// Set Pan for Specific Instrument
setPanForInstrument(instrument, panValue) {
    // Get the appropriate audio node
    let audioNode = null;
    
    switch(instrument) {
        case 'harmony':
            audioNode = this.polySynth;
            break;
        case 'melody':
            audioNode = this.melodySynth;
            break;
        case 'kick':
            audioNode = this.drums?.kick;
            break;
        case 'snare':
            audioNode = this.drums?.snare;
            break;
        case 'hihat':
            audioNode = this.drums?.hihat;
            break;
    }
    
    // Apply panning
    if (audioNode && audioNode.context) {
        // Create or update panner
        if (!audioNode.panner) {
            audioNode.panner = new Tone.Panner(panValue).toDestination();
            audioNode.disconnect();
            audioNode.connect(audioNode.panner);
        } else {
            audioNode.panner.pan.value = panValue;
        }
    }
}

// Update Marker Animation During Playback
updateMarkerAnimation(instrument, panValue) {
    const marker = document.querySelector(`[data-instrument="${instrument}"]`);
    if (!marker) return;
    
    // Convert -1 to 1 range to 0% to 100%
    const xPercent = ((panValue + 1) / 2) * 100;
    marker.style.left = `${xPercent}%`;
    
    // Add moving class for visual feedback
    marker.classList.add('moving');
}

// Stop marker animations when playback stops
stopMarkerAnimations() {
    document.querySelectorAll('.instrument-marker').forEach(marker => {
        marker.classList.remove('moving');
        
        // Reset to start position
        const instrument = marker.dataset.instrument;
        const startPos = this.stagePositions[instrument].start;
        const xPercent = ((startPos + 100) / 2);
        marker.style.left = `${xPercent}%`;
    });
}

// Modified play step to include dynamic panning
playStepWithPanning(step) {
    // Apply dynamic panning based on current step
    this.applyDynamicPanning(step);
    
    // Continue with normal playStep logic
    // ... rest of your existing playStep code ...
}

// Don't forget to call initializeStagePositioning() in your init() method!
// And call stopMarkerAnimations() when stopping playback!
