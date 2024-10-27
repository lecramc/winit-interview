import { styled } from '@mui/material/styles'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import { Box } from '@mui/material'

const Accordion = styled(MuiAccordion)(({ theme, customStyles }) => ({
  ...customStyles?.accordion,
}))

const AccordionSummary = styled(MuiAccordionSummary)(({ theme, customStyles }) => ({
  border: `0.1px solid ${theme.palette.divider}`,
  backgroundColor: 'rgba(0, 0, 0, .03)',
  ...customStyles?.summary,
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme, customStyles }) => ({
  borderTop: '1px solid rgba(0, 0, 0, .125)',

  ...customStyles?.details,
}))

const CustomAccordion = ({ itemStart, itemEnd, children, onChange, customStyles = {} }) => (
  <Accordion square onChange={onChange} customStyles={customStyles}>
    <AccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      customStyles={customStyles}
    >
      <Box display="flex" gap={1} width={'100%'} justifyContent="space-between" alignItems="center">
        {itemStart}
        <Box display="flex" gap={1} alignItems="center" mr={1}>
          {itemEnd}
        </Box>
      </Box>
    </AccordionSummary>
    <AccordionDetails customStyles={customStyles}>{children}</AccordionDetails>
  </Accordion>
)

export default CustomAccordion
