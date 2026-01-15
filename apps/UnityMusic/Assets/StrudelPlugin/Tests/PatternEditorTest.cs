using UnityEngine;
using UnityEditor;
using NUnit.Framework;
using System.Collections;

/// <summary>
/// Tests for the Strudel Pattern Editor functionality
/// </summary>
public class PatternEditorTest
{
    [Test]
    public void TestPatternEditorInitialization()
    {
        // Test that the pattern editor can be initialized
        var editor = EditorWindow.GetWindow<StrudelPatternEditor>("Test Pattern Editor");
        Assert.IsNotNull(editor, "Pattern editor should be created successfully");
    }
    
    [Test]
    public void TestAudioLibraryDownloaderInitialization()
    {
        // Test that the audio library downloader can be initialized
        var downloader = AudioLibraryDownloader.Instance;
        Assert.IsNotNull(downloader, "Audio library downloader should be created successfully");
        
        // Test that download directory is created
        string downloadDir = downloader.GetDownloadDirectory();
        Assert.IsNotNull(downloadDir, "Download directory should not be null");
        Assert.IsTrue(downloadDir.Contains("AudioLibraries"), "Download directory should contain AudioLibraries path");
    }
    
    [Test]
    public void TestInstrumentManagerIntegration()
    {
        // Test that instrument manager can be accessed through the bridge
        var bridge = StrudelUnityBridge.Instance;
        Assert.IsNotNull(bridge, "Strudel bridge should be available");
        
        var instrumentManager = bridge.GetInstrumentManager();
        Assert.IsNotNull(instrumentManager, "Instrument manager should be available");
        
        // Test that we can get default instruments
        var bdInstrument = instrumentManager.GetInstrument("bd");
        Assert.IsNotNull(bdInstrument, "Default bass drum instrument should exist");
        Assert.AreEqual("Bass Drum", bdInstrument.name);
    }
    
    [Test]
    public void TestAudioLibraryDownloaderIntegration()
    {
        // Test that audio library downloader can be accessed through the bridge
        var bridge = StrudelUnityBridge.Instance;
        Assert.IsNotNull(bridge, "Strudel bridge should be available");
        
        var downloader = bridge.GetAudioLibraryDownloader();
        Assert.IsNotNull(downloader, "Audio library downloader should be available through bridge");
    }
    
    [Test]
    public void TestPatternEditorIntegration()
    {
        // Test that pattern editor can be opened through the bridge
        var bridge = StrudelUnityBridge.Instance;
        Assert.IsNotNull(bridge, "Strudel bridge should be available");
        
        // This would open the pattern editor in a real test
        // bridge.OpenPatternEditor();
        
        // For now, we'll just verify the method exists
        Assert.IsNotNull(bridge.GetType().GetMethod("OpenPatternEditor"), 
                       "OpenPatternEditor method should exist");
    }
    
    [Test]
    public void TestPatternPlayback()
    {
        // Test that patterns can be played through the bridge
        var bridge = StrudelUnityBridge.Instance;
        Assert.IsNotNull(bridge, "Strudel bridge should be available");
        
        // Test playing a simple pattern
        string testPattern = "bd sd hh oh";
        string testInstrument = "bd";
        
        // This should not throw an exception
        Assert.DoesNotThrow(() => 
        {
            bridge.PlayPattern(testPattern, testInstrument);
        }, "Playing a pattern should not throw an exception");
    }
    
    [Test]
    public void TestLibraryDownloadSimulation()
    {
        // Test that library download functionality works
        var downloader = AudioLibraryDownloader.Instance;
        Assert.IsNotNull(downloader, "Audio library downloader should be available");
        
        // Test that we can check for downloaded libraries
        var downloadedLibs = downloader.GetDownloadedLibraries();
        Assert.IsNotNull(downloadedLibs, "Downloaded libraries list should not be null");
        
        // Test that we can check if a library is downloaded
        bool isDownloaded = downloader.IsLibraryDownloaded("TestLibrary");
        // Should be false since we haven't downloaded anything
        Assert.IsFalse(isDownloaded, "Non-existent library should not be marked as downloaded");
    }
}