import { useMemo } from 'react'
import type { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { useTheme } from '@mui/material/styles'
import MermaidBlock from './MermaidBlock'
import ArchifyEmbed from './ArchifyEmbed'

interface TopicMarkdownContentProps {
  content: string
}

// Shared topic-content renderer — used by TopicInfoPage and the flashcard
// session's revealed card, so both render identical markdown/mermaid/archify/tables.
export default function TopicMarkdownContent({ content }: TopicMarkdownContentProps) {
  const theme = useTheme()

  // react-markdown treats each key here as a component TYPE — a fresh object/
  // functions on every render (e.g. from the interview run page's once-a-second
  // stopwatch re-rendering this whole tree) makes React see a "new" type for
  // archify/mermaid/code blocks and remount them, silently resetting their own
  // state (an iframe/diagram reloading every second instead of staying put).
  const components = useMemo(
    () => ({
        // Unlabeled ``` fences (used for ASCII-art asides) would otherwise render as a bare,
        // unstyled <pre> with no width containment, forcing the whole page to scroll horizontally
        // on mobile. Contain every block here so children only ever need to scroll internally.
        pre({ children }: { children?: ReactNode }) {
          return (
            <Box component="pre" sx={{ m: 0, overflowX: 'auto', maxWidth: '100%' }}>
              {children}
            </Box>
          )
        },
        // Delegate mermaid fences; render fenced code with language highlighting.
        // react-markdown v9+ no longer passes an `inline` flag, so detect it via the
        // absence of the `language-*` className that only fenced code blocks receive.
        code({ className, children }: { className?: string; children?: ReactNode }) {
          const langMatch = /language-(\w+)/.exec(className ?? '')

          if (!langMatch) {
            return <code className={className}>{children}</code>
          }

          const lang = langMatch[1]
          const code = String(children).trimEnd()

          if (lang === 'mermaid') {
            return <MermaidBlock code={code} />
          }

          // Fenced block's content is a path to a self-contained Archify HTML artifact
          if (lang === 'archify') {
            return <ArchifyEmbed src={code} />
          }

          const normalizedLang = lang === 'cs' ? 'csharp' : lang

          return (
            <Box
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                '& pre': { margin: 0 },
              }}
            >
              <SyntaxHighlighter
                language={normalizedLang || 'text'}
                style={theme.palette.mode === 'dark' ? oneDark : oneLight}
                showLineNumbers
                customStyle={{ margin: 0, borderRadius: 0, padding: '1rem' }}
              >
                {code}
              </SyntaxHighlighter>
            </Box>
          )
        },
        // GFM tables render as bare, unstyled HTML by default - give them borders/spacing.
        table({ children }: { children?: ReactNode }) {
          return (
            <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, my: 2 }}>
              <Table size="small">{children}</Table>
            </TableContainer>
          )
        },
        thead({ children }: { children?: ReactNode }) {
          return <TableHead>{children}</TableHead>
        },
        tbody({ children }: { children?: ReactNode }) {
          return <TableBody>{children}</TableBody>
        },
        tr({ children }: { children?: ReactNode }) {
          return <TableRow>{children}</TableRow>
        },
        th({ children }: { children?: ReactNode }) {
          return (
            <TableCell component="th" sx={{ fontWeight: 700 }}>
              {children}
            </TableCell>
          )
        },
        td({ children }: { children?: ReactNode }) {
          return <TableCell>{children}</TableCell>
        },
      }),
    [theme],
  )

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  )
}
