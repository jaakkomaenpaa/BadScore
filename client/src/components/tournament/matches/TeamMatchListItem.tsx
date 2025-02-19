import { Match } from '@/types/match'
import { Accordion, AccordionDetails, AccordionSummary, Box } from '@mui/material'
import { InfoField } from './InfoField'
import { TeamField } from './TeamField'
import { ScoreField } from './ScoreField'
import { TeamMatchView } from './TeamMatchView'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

type TeamMatchListItemProps = {
  match: Match
}

export function TeamMatchListItem({ match }: TeamMatchListItemProps) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white',
          width: '100%',
          flex: 1,
          backgroundColor: 'background.paper',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'white',
            width: '100%',
            flex: 1,
            marginRight: 1,
          }}
        >
          <InfoField match={match} />
          <TeamField match={match} />
          <ScoreField match={match} />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <TeamMatchView teamMatch={match} />
      </AccordionDetails>
    </Accordion>
  )
}
