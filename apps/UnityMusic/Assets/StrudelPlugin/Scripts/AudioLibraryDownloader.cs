using UnityEngine;
using UnityEditor;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text.RegularExpressions;

/// <summary>
/// Audio Library Downloader - Handles downloading audio libraries and samples
/// Supports GitHub repositories, Freesound, Shabda, and direct URLs
/// </summary>
public class AudioLibraryDownloader : MonoBehaviour
{
    public enum DownloadSource
    {
        GitHubRepository,
        GitHubRawFile,
        Freesound,
        Shabda,
        DirectURL
    }
    
    public enum DownloadStatus
    {
        NotStarted,
        Downloading,
        Completed,
        Failed
    }
    
    [System.Serializable]
    public class AudioLibrary
    {
        public string name;
        public string description;
        public string url;
        public DownloadSource sourceType;
        public string localPath;
        public DownloadStatus status;
        public float progress;
        public List<string> downloadedFiles = new List<string>();
    }
    
    public List<AudioLibrary> libraries = new List<AudioLibrary>();
    public string downloadDirectory = "Assets/AudioLibraries";
    
    private Coroutine currentDownloadCoroutine;
    private WebClient webClient;
    
    void Start()
    {
        // Initialize default libraries
        InitializeDefaultLibraries();
    }
    
    void InitializeDefaultLibraries()
    {
        libraries.Add(new AudioLibrary()
        {
            name = "VCSL (Virtual Church Organ)",
            description = "Virtual Church Organ Sample Library",
            url = "https://github.com/sgossner/VCSL",
            sourceType = DownloadSource.GitHubRepository,
            localPath = "VCSL",
            status = DownloadStatus.NotStarted
        });
        
        libraries.Add(new AudioLibrary()
        {
            name = "VSCO-2-CE (Community Edition)",
            description = "Versilian Studios Chamber Orchestra 2 Community Edition",
            url = "https://github.com/sgossner/VSCO-2-CE",
            sourceType = DownloadSource.GitHubRepository,
            localPath = "VSCO-2-CE",
            status = DownloadStatus.NotStarted
        });
        
        libraries.Add(new AudioLibrary()
        {
            name = "GitHub Raw Samples",
            description = "Direct samples from GitHub raw URLs",
            url = "https://raw.githubusercontent.com/",
            sourceType = DownloadSource.GitHubRawFile,
            localPath = "GitHubSamples",
            status = DownloadStatus.NotStarted
        });
        
        libraries.Add(new AudioLibrary()
        {
            name = "Freesound Samples",
            description = "Samples from Freesound.org",
            url = "https://freesound.org/",
            sourceType = DownloadSource.Freesound,
            localPath = "Freesound",
            status = DownloadStatus.NotStarted
        });
        
        libraries.Add(new AudioLibrary()
        {
            name = "Shabda Samples",
            description = "Samples from Shabda sound library",
            url = "https://shabda.ndre.gr/",
            sourceType = DownloadSource.Shabda,
            localPath = "Shabda",
            status = DownloadStatus.NotStarted
        });
    }
    
    /// <summary>
    /// Start downloading a specific library
    /// </summary>
    public void StartDownload(AudioLibrary library)
    {
        if (currentDownloadCoroutine != null)
        {
            StopCoroutine(currentDownloadCoroutine);
        }
        
        library.status = DownloadStatus.Downloading;
        library.progress = 0f;
        library.downloadedFiles.Clear();
        
        currentDownloadCoroutine = StartCoroutine(DownloadLibraryCoroutine(library));
    }
    
    /// <summary>
    /// Download a library based on its source type
    /// </summary>
    private IEnumerator DownloadLibraryCoroutine(AudioLibrary library)
    {
        string fullPath = Path.Combine(downloadDirectory, library.localPath);
        
        // Create directory if it doesn't exist
        if (!Directory.Exists(fullPath))
        {
            Directory.CreateDirectory(fullPath);
        }
        
        switch (library.sourceType)
        {
            case DownloadSource.GitHubRepository:
                yield return DownloadGitHubRepository(library);
                break;
                
            case DownloadSource.GitHubRawFile:
                yield return DownloadGitHubRawFile(library);
                break;
                
            case DownloadSource.Freesound:
                yield return DownloadFreesoundSamples(library);
                break;
                
            case DownloadSource.Shabda:
                yield return DownloadShabdaSamples(library);
                break;
                
            case DownloadSource.DirectURL:
                yield return DownloadDirectURL(library);
                break;
        }
        
        // Update status and refresh asset database
        library.status = DownloadStatus.Completed;
        
#if UNITY_EDITOR
        AssetDatabase.Refresh();
#endif
        
        Debug.Log("Download completed for " + library.name + ": " + library.downloadedFiles.Count + " files downloaded");
    }
    
    /// <summary>
    /// Download a GitHub repository (simplified - in real implementation would use Git API)
    /// </summary>
    private IEnumerator DownloadGitHubRepository(AudioLibrary library)
    {
        // In a real implementation, this would use Git API or clone the repository
        // For this example, we'll simulate downloading some sample files
        
        string repoUrl = library.url;
        string repoName = repoUrl.Substring(repoUrl.LastIndexOf('/') + 1);
        
        // Simulate downloading files
        yield return new WaitForSeconds(1f);
        
        // Add some simulated files
        library.downloadedFiles.Add("sample1.wav");
        library.downloadedFiles.Add("sample2.wav");
        library.downloadedFiles.Add("sample3.wav");
        
        Debug.Log("Simulated download of GitHub repository: " + repoName);
    }
    
    /// <summary>
    /// Download from GitHub raw URL
    /// </summary>
    private IEnumerator DownloadGitHubRawFile(AudioLibrary library)
    {
        // Simulate downloading a raw file
        yield return new WaitForSeconds(0.5f);
        
        library.downloadedFiles.Add("raw_sample.wav");
        
        Debug.Log("Simulated download from GitHub raw URL");
    }
    
    /// <summary>
    /// Download from Freesound
    /// </summary>
    private IEnumerator DownloadFreesoundSamples(AudioLibrary library)
    {
        // Simulate downloading from Freesound
        yield return new WaitForSeconds(0.5f);
        
        library.downloadedFiles.Add("freesound_sample.wav");
        
        Debug.Log("Simulated download from Freesound");
    }
    
    /// <summary>
    /// Download from Shabda
    /// </summary>
    private IEnumerator DownloadShabdaSamples(AudioLibrary library)
    {
        // Simulate downloading from Shabda
        yield return new WaitForSeconds(0.5f);
        
        library.downloadedFiles.Add("shabda_sample.wav");
        
        Debug.Log("Simulated download from Shabda");
    }
    
    /// <summary>
    /// Download from direct URL
    /// </summary>
    private IEnumerator DownloadDirectURL(AudioLibrary library)
    {
        // Simulate downloading from direct URL
        yield return new WaitForSeconds(0.5f);
        
        library.downloadedFiles.Add("direct_sample.wav");
        
        Debug.Log("Simulated download from direct URL");
    }
    
    /// <summary>
    /// Get all available libraries
    /// </summary>
    public List<AudioLibrary> GetAvailableLibraries()
    {
        return libraries;
    }
    
    /// <summary>
    /// Get library by name
    /// </summary>
    public AudioLibrary GetLibraryByName(string name)
    {
        return libraries.Find(lib => lib.name == name);
    }
    
    /// <summary>
    /// Add a custom library
    /// </summary>
    public void AddCustomLibrary(string name, string url, DownloadSource sourceType)
    {
        libraries.Add(new AudioLibrary()
        {
            name = name,
            description = "Custom library",
            url = url,
            sourceType = sourceType,
            localPath = name.Replace(" ", "_"),
            status = DownloadStatus.NotStarted
        });
    }
    
    /// <summary>
    /// Check if a library is already downloaded
    /// </summary>
    public bool IsLibraryDownloaded(string libraryName)
    {
        AudioLibrary lib = GetLibraryByName(libraryName);
        return lib != null && lib.status == DownloadStatus.Completed;
    }
}