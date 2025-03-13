import { ContactData, IssueType } from '@/types/misc'
import {
  Alert,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import { PrimaryButton } from '../buttons/PrimaryButton'
import { SecondaryButton } from '../buttons/SecondaryButton'
import contactService from '@/services/contact'

type ContactFormProps = {
  isOpen: boolean
  onClose: () => void
}

export function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [title, setTitle] = useState<string>('')
  const [issueType, setIssueType] = useState<IssueType>(IssueType.Bug)
  const [pageUrl, setPageUrl] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success')

  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    const contactData: ContactData = {
      title: title === '' ? undefined : title,
      issue: issueType,
      pageUrl: pageUrl === '' ? undefined : pageUrl,
      email: email === '' ? undefined : email,
      description: description === '' ? undefined : description,
    }

    setLoading(true)

    try {
      await contactService.sendMail(contactData)
      setAlertMessage('Message sent successfully')
      setAlertSeverity('success')
    } catch (error) {
      setAlertMessage('Message failed to send')
      setAlertSeverity('error')
    } finally {
      setLoading(false)
      setAlertOpen(true)
      onClose()
    }
  }

  const handleClose = (_: any, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick') return
    onClose()
  }

  return (
    <>
      <Dialog onClose={handleClose} open={isOpen}>
        <DialogTitle>Contact the dev</DialogTitle>
        <DialogContent
          sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label='Title'
            onChange={(e) => setTitle(e.target.value)}
            sx={{ marginTop: 2 }}
          />
          <FormControl>
            <InputLabel id='issue-select-label'>Type</InputLabel>
            <Select
              labelId='issue-select-label'
              id='issue-select'
              value={issueType}
              label='Type'
              onChange={(e) => setIssueType(e.target.value as IssueType)}
            >
              {Object.values(IssueType).map((issue) => (
                <MenuItem key={issue} value={issue}>
                  {issue}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>The reason of contact</FormHelperText>
          </FormControl>
          <TextField
            label='Page URL'
            onChange={(e) => setPageUrl(e.target.value)}
            helperText='Copy the URL where the issue occurred (if applicable)'
          />
          <TextField
            label='Your email'
            onChange={(e) => setEmail(e.target.value)}
            helperText='If you want a response or follow-up'
          />
          <TextField
            label='Description'
            helperText='Describe the problem or other matter as clearly as possible'
            multiline
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <SecondaryButton type='error' onClick={onClose}>
            Cancel
          </SecondaryButton>
          <PrimaryButton type='success' onClick={handleSubmit}>
            Send
          </PrimaryButton>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={() => setAlertOpen(false)}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={alertSeverity}
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>

      <Backdrop
        open={loading}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  )
}
