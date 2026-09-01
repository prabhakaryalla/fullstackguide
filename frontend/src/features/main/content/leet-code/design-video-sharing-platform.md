# 2254. Design Video Sharing Platform

**Difficulty:** Hard
**Category:** Array, Hash Table, Stack, Design, Heap (Priority Queue)

## Problem

Design a video sharing platform that supports uploading videos, removing videos, watching videos, liking/disliking videos, and viewing the most-viewed/liked videos. Implement the `VideoSharingPlatform` class with various methods.

### Example

```
VideoSharingPlatform platform = new VideoSharingPlatform();
platform.upload("video1");     // Returns 0
platform.upload("video2");     // Returns 1
platform.remove(0);
platform.upload("video3");     // Returns 0 (reuses ID)
```

## Approach

Use a hash map to store video data (views, likes, dislikes). Use a min-heap (priority queue) to track available IDs for reuse. Maintain sorted structures or use heaps to efficiently query top videos by views or likes.

## C# Solution

```csharp
public class VideoSharingPlatform
{
    private class Video
    {
        public string Content;
        public int Views;
        public int Likes;
        public int Dislikes;
    }
    
    private Dictionary<int, Video> videos;
    private PriorityQueue<int, int> availableIds;
    private int nextId;
    
    public VideoSharingPlatform()
    {
        videos = new Dictionary<int, Video>();
        availableIds = new PriorityQueue<int, int>();
        nextId = 0;
    }
    
    public int Upload(string video)
    {
        int id;
        if (availableIds.Count > 0)
        {
            id = availableIds.Dequeue();
        }
        else
        {
            id = nextId++;
        }
        
        videos[id] = new Video { Content = video, Views = 0, Likes = 0, Dislikes = 0 };
        return id;
    }
    
    public void Remove(int videoId)
    {
        if (videos.ContainsKey(videoId))
        {
            videos.Remove(videoId);
            availableIds.Enqueue(videoId, videoId);
        }
    }
    
    public string Watch(int videoId, int minMinute, int maxMinute)
    {
        if (!videos.ContainsKey(videoId)) return "-1";
        
        var video = videos[videoId];
        video.Views++;
        
        int end = Math.Min(maxMinute, video.Content.Length - 1);
        if (minMinute > end) return "-1";
        
        return video.Content.Substring(minMinute, end - minMinute + 1);
    }
    
    public void Like(int videoId)
    {
        if (videos.ContainsKey(videoId))
        {
            videos[videoId].Likes++;
        }
    }
    
    public void Dislike(int videoId)
    {
        if (videos.ContainsKey(videoId))
        {
            videos[videoId].Dislikes++;
        }
    }
    
    public int[] GetLikesAndDislikes(int videoId)
    {
        if (!videos.ContainsKey(videoId)) return new int[] { -1 };
        
        var video = videos[videoId];
        return new int[] { video.Likes, video.Dislikes };
    }
    
    public int GetViews(int videoId)
    {
        return videos.ContainsKey(videoId) ? videos[videoId].Views : -1;
    }
}
```

## Complexity

- **Time:** O(log n) per operation for priority queue
- **Space:** O(n) for storing videos
