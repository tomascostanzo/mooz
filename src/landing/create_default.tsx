import { useRecoilState, useRecoilValue } from 'recoil'
import { useCallback, useState } from 'react'
import type { FunctionComponent, FormEvent } from 'react'
import { Stack, TextField, PrimaryButton, SpinButton, Label, useTheme } from '@fluentui/react'
import { submit, mb2 } from './styles'
import { socketState, Room, preferencesState, joinDefaultRoom } from '../atoms'

const CreateDefaultMeeting: FunctionComponent = () => {
    const [preferences, setPreferences] = useRecoilState(preferencesState)
    const theme = useTheme()
    const socket = useRecoilValue(socketState)
    const [max, setMax] = useState('5')
    const [meetingName, setMeetingName] = useState('')
    const [personName, setPersonName] = useState(preferences.name)
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // no need for useCallback as set-state functions dont change
    const onError = () => {
        setDisabled(false)
        setError('Something went wrong, try again later (ˉ﹃ˉ)')
    }

    const handleSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            if (disabled) return
            setError(null)
            setDisabled(true)
            joinDefaultRoom(personName ?? "default", socket, setPreferences, onError);
        },
        [disabled, setDisabled, socket, max, meetingName, personName, setError, setPreferences],
    )

    return (
        <Stack>
            <form onSubmit={handleSubmit}>
                <Stack.Item>
                    <PrimaryButton
                        disabled={disabled}
                        type="submit"
                        className={submit}
                        text="Join"
                    />
                </Stack.Item>
            </form>
        </Stack>
    )
}

export default CreateDefaultMeeting
