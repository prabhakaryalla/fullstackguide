import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TopicList from '../../main/components/TopicList'
import { useAllBookmarkedTopics } from '../hooks/useAllBookmarkedTopics'
import { useBookmarks } from '../hooks/useBookmarks'

export default function BookmarksPage() {
  const navigate = useNavigate()
  const bookmarked = useAllBookmarkedTopics()
  const { toggleBookmark } = useBookmarks()
  const menuIdByTopicId = useMemo(() => new Map(bookmarked.map((entry) => [entry.topic.id, entry.menuId])), [bookmarked])

  return (
    <Box sx={{ p: 3, maxWidth: 1100, mx: 'auto' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        My Bookmarks
      </Typography>
      <TopicList
        topics={bookmarked.map((entry) => entry.topic)}
        onTopicClick={(topic) => {
          const menuId = menuIdByTopicId.get(topic.id)
          if (menuId) navigate(`/${menuId}/${topic.slug}`)
        }}
        emptyMessage="You haven't bookmarked any topics yet"
        isTopicBookmarked={() => true}
        onToggleBookmark={(topic) => {
          const menuId = menuIdByTopicId.get(topic.id)
          if (menuId) toggleBookmark(menuId, topic.slug)
        }}
      />
    </Box>
  )
}
