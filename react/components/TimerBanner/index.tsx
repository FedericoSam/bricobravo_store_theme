import React, { useEffect } from 'react'
import { useTimer } from 'react-timer-hook'

import styles from './styles.css'

type TTimerBanner = {
  promoDate: string
}
const TimerBanner: StorefrontFunctionComponent<TTimerBanner> | null = ({
  promoDate,
}: TTimerBanner) => {
  const { days, hours, minutes, seconds, restart, isRunning } = useTimer({
    expiryTimestamp: new Date(),
  })

  useEffect(() => {
    const [day, month, year] = promoDate.split('/')
    const timestamp = new Date(+year, +month - 1, +day)

    restart(timestamp)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promoDate])

  const formatedHours = (days * 24 + hours).toString().padStart(2, '0')
  const formatedMinutes = minutes.toString().padStart(2, '0')
  const formatedSeconds = seconds.toString().padStart(2, '0')

  return isRunning ? (
    <div className={styles.bannerTimer}>
      <span className={styles.bannerTimerMarkerHours}>{formatedHours}</span>
      <span className={styles.bannerTimerMarkerMinutes}>{formatedMinutes}</span>
      <span className={styles.bannerTimerMarkerSeconds}>{formatedSeconds}</span>
    </div>
  ) : null
}

TimerBanner.schema = {
  title: 'Data do contador',
  type: 'object',
  properties: {
    promoDate: {
      title: 'Data do contador',
      description: 'Data na qual o contador se baseará. (ex.: 31/12/2022)',
      type: 'string',
    },
  },
}

export default TimerBanner
