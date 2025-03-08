import { Box, IconButton, Tooltip } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import XIcon from '@mui/icons-material/X'
import WebsiteIcon from '@mui/icons-material/Language'
import { SvgIconComponent } from '@mui/icons-material'
import { PlayerBioModel } from '@/types/player'

const SOCIALS: {
  key: keyof PlayerBioModel
  label: string
  icon: SvgIconComponent
}[] = [
  {
    key: 'facebook',
    label: 'Facebook',
    icon: FacebookIcon,
  },
  {
    key: 'instagram',
    label: 'Instagram',
    icon: InstagramIcon,
  },
  {
    key: 'twitter',
    label: 'Twitter',
    icon: XIcon,
  },
  {
    key: 'website',
    label: 'Website',
    icon: WebsiteIcon,
  },
]

type SocialsFieldProps = {
  bioModel: PlayerBioModel | null
}

export function SocialsField({ bioModel }: SocialsFieldProps) {
  if (!bioModel) return null

  return (
    <Box sx={{ alignSelf: 'center' }}>
      {SOCIALS.map(({ key, label, icon: Icon }) => {
        const url = bioModel[key]
        if (!url) return null

        return (
          <Tooltip key={key} title={label} arrow>
            <IconButton
              component='a'
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              sx={{
                color: 'primary.main',
                backgroundColor: 'background.paper',
                '&:hover': { backgroundColor: 'secondary.light' },
              }}
            >
              <Icon />
            </IconButton>
          </Tooltip>
        )
      })}
    </Box>
  )
}
