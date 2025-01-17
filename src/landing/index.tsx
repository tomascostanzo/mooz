import { FunctionComponent, useEffect } from 'react'
import { Stack, Text, Pivot, PivotItem, IPivotStyles, PrimaryButton } from '@fluentui/react'
import fscreen from 'fscreen'
import VideoPreview from './preview'
import CreateMeeting from './create'
import JoinMeeting from './join'
import { container, containerInner, heading, mr4, options } from './styles'
import CreateDefaultMeeting from './create_default'

const pivotStyles: Partial<IPivotStyles> = {
    root: {
        // display: 'flex',
        // justifyContent: 'center'
    },
    itemContainer: {
        padding: '.5em',
        width: '300px',
        height: '225px',
    },
}

const Landing: FunctionComponent = () => {
    let defaultKey = 'create'
    let defaultId: string | undefined
    const path = window.location.pathname
    const REGEX = /^\/room\/(?<id>[0-9a-zA-Z-_]+)/
    const match = path.match(REGEX)
    if (match) {
        defaultKey = 'join'
        defaultId = match.groups?.id
    }
    useEffect(() => {
        if (fscreen.fullscreenElement) fscreen.exitFullscreen()
    }, [])
    return (
        <Stack className={container} horizontalAlign="center">
            <Stack.Item className={containerInner}>
                <Stack horizontalAlign="center" horizontal wrap>
                    <Stack.Item className={mr4} grow>
                        <CreateDefaultMeeting />
                    </Stack.Item>
                </Stack>
            </Stack.Item>
        </Stack>
    )
}

export default Landing
