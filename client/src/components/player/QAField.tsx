import { PlayerBioModel } from '@/types/player'
import { Box, Typography } from '@mui/material'

const QUESTIONS: { key: keyof PlayerBioModel; answer: string }[] = [
  {
    key: 'pob',
    answer: 'Place of birth',
  },
  {
    key: 'begin_sport',
    answer: 'When did start playing?',
  },
  {
    key: 'sporting_ambitions',
    answer: 'Sporting ambitions',
  },
  {
    key: 'start_playing_competitively',
    answer: 'When did start playing competitively?',
  },
  {
    key: 'member_national_team_since',
    answer: 'Member of national team since...',
  },
  {
    key: 'superstitions_rituals',
    answer: 'Superstitions rituals',
  },
  {
    key: 'club',
    answer: 'Current club',
  },
  {
    key: 'coach',
    answer: 'Coach',
  },
  {
    key: 'education_level',
    answer: 'Level of education',
  },
  {
    key: 'equipment_sponsor',
    answer: 'Equipment sponsor',
  },
  {
    key: 'family_information',
    answer: 'Family information',
  },
  {
    key: 'famous_sporting_relatives',
    answer: 'Famous sporting relatives',
  },
  {
    key: 'hobbies',
    answer: 'Hobbies',
  },
  {
    key: 'impairment_cause',
    answer: ' Impairment cause',
  },
  {
    key: 'impairment_type',
    answer: 'Impairment type',
  },
  {
    key: 'international_debut',
    answer: 'International debut',
  },
  {
    key: 'major_injuries',
    answer: 'Major injuries',
  },
  {
    key: 'memorable_achievements',
    answer: 'Memorable achievements',
  },
  {
    key: 'most_influential_person',
    answer: 'Most influential person',
  },
  {
    key: 'nickname',
    answer: 'Nickname',
  },
  {
    key: 'occupation',
    answer: 'Occupation',
  },
  {
    key: 'other_sports',
    answer: 'Other sports',
  },
  {
    key: 'previous_olympics',
    answer: 'Previous olympics',
  },
  {
    key: 'sporting_awards',
    answer: 'Sporting awards',
  },
  {
    key: 'sporting_hero',
    answer: 'Sporting hero',
  },
  {
    key: 'sporting_philosophy',
    answer: 'Sporting philosophy',
  },
  {
    key: 'style_of_play',
    answer: 'Style of play',
  },
  {
    key: 'training_regime',
    answer: 'Training regime',
  },
]

type QAFieldProps = {
  bioModel: PlayerBioModel | null
}

export function QAField({ bioModel }: QAFieldProps) {
  if (!bioModel) return null

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Typography variant='h6' sx={{ color: 'text.primary', alignSelf: 'center' }}>
        Q&A
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          backgroundColor: 'background.paper',
          color: 'text.primary',
          padding: 2,
        }}
      >
        {QUESTIONS.map(({ key, answer }) => {
          const value = bioModel[key]
          if (!value) return null

          return (
            <Box key={key} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='subtitle2' color='text.secondary'>
                {answer}
              </Typography>
              <Typography variant='body1' color='text.primary'>
                {value}
              </Typography>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

/*
 
*/
