import { useTransition as useSpringTransition } from '@react-spring/core'

type TransitionProps = {
  location: any
  delay?: number
}

export const useTransition = (props: TransitionProps) => {
  const transition = useSpringTransition(props.location, {
    from: { opacity: 0, scale: [0, 0, 0] },
    enter: { opacity: 1, scale: [1, 1, 1] },
    leave: { opacity: 0, scale: [0, 0, 0] },
    delay: props.delay,
  })
  return {
    transition,
  }
}
