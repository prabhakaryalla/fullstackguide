import { createTheme, alpha } from '@mui/material/styles'
import type { PaletteMode, Theme } from '@mui/material'

export function getAppTheme(mode: PaletteMode): Theme {
  const isDark = mode === 'dark'

  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#1a1a2e',
        light: '#33335c',
        dark: '#0f0f1e',
      },
      secondary: {
        main: '#e94560',
        light: '#ff6f85',
        dark: '#b8253f',
      },
      background: isDark
        ? { default: '#11111c', paper: '#191929' }
        : { default: '#f6f7fb', paper: '#ffffff' },
    },
    shape: {
      borderRadius: 10,
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h4: { fontWeight: 700 },
      h5: { fontWeight: 700 },
      h6: {
        fontWeight: 700,
        letterSpacing: '0.05em',
      },
    },
    spacing: 8,
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'linear-gradient(120deg, #1a1a2e 0%, #2d2d55 100%)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: isDark
                ? '0 16px 32px -12px rgba(0, 0, 0, 0.6)'
                : '0 16px 32px -12px rgba(26, 26, 46, 0.25)',
            },
            '@media (prefers-reduced-motion: reduce)': {
              transition: 'none',
              '&:hover': { transform: 'none' },
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            textTransform: 'none',
            fontWeight: 600,
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          },
          containedPrimary: {
            backgroundImage: 'linear-gradient(135deg, #1a1a2e 0%, #3d3d6b 100%)',
            '&:hover': {
              backgroundImage: 'linear-gradient(135deg, #22223a 0%, #4a4a7d 100%)',
              boxShadow: '0 8px 20px -6px rgba(26, 26, 46, 0.5)',
            },
            // Without this, the disabled state keeps the dark gradient above but MUI's
            // default disabled text color is a near-invisible dark-on-dark/gray-on-dark.
            '&.Mui-disabled': {
              backgroundImage: 'none',
              backgroundColor: isDark ? alpha('#ffffff', 0.12) : alpha('#000000', 0.12),
              color: isDark ? alpha('#ffffff', 0.3) : alpha('#000000', 0.26),
            },
          },
          containedSecondary: {
            backgroundImage: 'linear-gradient(135deg, #e94560 0%, #ff6f85 100%)',
            '&:hover': {
              backgroundImage: 'linear-gradient(135deg, #f0566f 0%, #ff8194 100%)',
              boxShadow: '0 8px 20px -6px rgba(233, 69, 96, 0.5)',
            },
            '&.Mui-disabled': {
              backgroundImage: 'none',
              backgroundColor: isDark ? alpha('#ffffff', 0.12) : alpha('#000000', 0.12),
              color: isDark ? alpha('#ffffff', 0.3) : alpha('#000000', 0.26),
            },
          },
          // primary.main (#1a1a2e) is a near-black navy — as border/text color on outlined
          // or text-variant buttons it's nearly invisible against dark-mode backgrounds.
          // Contained buttons are unaffected (they use the hardcoded gradients above).
          ...(isDark && {
            outlinedPrimary: {
              borderColor: alpha('#ffffff', 0.4),
              color: '#f2f2fa',
              '&:hover': {
                borderColor: alpha('#ffffff', 0.7),
                backgroundColor: alpha('#ffffff', 0.08),
              },
            },
            textPrimary: {
              color: '#f2f2fa',
              '&:hover': {
                backgroundColor: alpha('#ffffff', 0.08),
              },
            },
          }),
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 600,
          },
          // Same near-invisible-outlined-primary issue as MuiButton above.
          ...(isDark && {
            outlinedPrimary: {
              borderColor: alpha('#ffffff', 0.4),
              color: '#f2f2fa',
            },
          }),
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            // Default color="primary" resolves to #1a1a2e, which is almost the same
            // shade as the dark-mode paper background (#191929) — checked boxes were
            // rendering as essentially invisible. Same root cause as the button/chip
            // fixes above, applied here for the multi-select "Topic areas" checkboxes.
            ...(isDark && {
              color: alpha('#ffffff', 0.5),
              '&.Mui-checked': {
                color: '#f2f2fa',
              },
            }),
          },
        },
      },
    },
  })
}

