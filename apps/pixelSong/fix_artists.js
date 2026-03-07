#!/usr/bin/env node

/**
 * Script to update artist names in 64step JSON files using old files as reference
 */

const fs = require('fs');
const path = require('path');

const oldDir = './docs_old';
const newDir = './docs';

// Map of old file names to 64step file names
const fileMapping = {
    'rock.json': 'rock_64step.json',
    'pop.json': 'pop_64step.json',
    'electronic.json': 'electronic_64step.json',
    'hip-hop.json': 'hip-hop_64step.json',
    'jazz.json': 'jazz_64step.json',
    'classical.json': 'classical_64step.json',
    'country.json': 'country_64step.json',
    'reggae.json': 'reggae_64step.json',
    'metal.json': 'metal_64step.json',
    'indie.json': 'indie_64step.json',
    'disco.json': 'disco_64step.json',
    'funk.json': 'funk_64step.json'
};

function loadJSON(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content);
    } catch (error) {
        console.error(`Error loading ${filePath}:`, error.message);
        return null;
    }
}

function saveJSON(filePath, data) {
    try {
        const content = JSON.stringify(data, null, 2);
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
    } catch (error) {
        console.error(`Error saving ${filePath}:`, error.message);
        return false;
    }
}

function updateArtists() {
    let totalUpdated = 0;
    let totalFilesProcessed = 0;

    for (const [oldFile, newFile] of Object.entries(fileMapping)) {
        const oldPath = path.join(oldDir, oldFile);
        const newPath = path.join(newDir, newFile);

        // Skip if old file doesn't exist (like blues.json)
        if (!fs.existsSync(oldPath)) {
            console.log(`Skipping ${oldFile} - no reference file in docs_old/`);
            continue;
        }

        console.log(`\nProcessing ${oldFile} -> ${newFile}`);

        const oldData = loadJSON(oldPath);
        const newData = loadJSON(newPath);

        if (!oldData || !newData) {
            console.log(`  Skipping due to load error`);
            continue;
        }

        // Build a map of song keys to artists from old file
        const oldArtistMap = new Map();
        if (oldData.songs) {
            oldData.songs.forEach(song => {
                oldArtistMap.set(song.key, song.artist);
            });
        } else if (oldData.song_variations) {
            Object.values(oldData.song_variations).forEach(variations => {
                variations.forEach(variation => {
                    oldArtistMap.set(variation.key, variation.artist);
                });
            });
        }

        // Update artists in new file
        let updatedCount = 0;
        const updateSongArtist = (song) => {
            if (song.artist === 'Unknown Artist' || !song.artist) {
                const oldArtist = oldArtistMap.get(song.key);
                if (oldArtist && oldArtist !== 'Unknown Artist') {
                    song.artist = oldArtist;
                    return true;
                }
            }
            return false;
        };

        if (newData.songs) {
            newData.songs.forEach(song => {
                if (updateSongArtist(song)) {
                    updatedCount++;
                }
            });
        } else if (newData.song_variations) {
            Object.values(newData.song_variations).forEach(variations => {
                variations.forEach(variation => {
                    if (updateSongArtist(variation)) {
                        updatedCount++;
                    }
                });
            });
        }

        if (updatedCount > 0) {
            saveJSON(newPath, newData);
            console.log(`  Updated ${updatedCount} artist(s)`);
            totalUpdated += updatedCount;
        } else {
            console.log(`  No artists needed updating`);
        }

        totalFilesProcessed++;
    }

    console.log(`\n=== Summary ===`);
    console.log(`Files processed: ${totalFilesProcessed}`);
    console.log(`Total artists updated: ${totalUpdated}`);
}

updateArtists();
