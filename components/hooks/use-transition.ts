import { useTransition as useSpringTransition, UseTransitionProps } from '@react-spring/core'

type TransitionProps = {
  location: any
}

export const useTransition = (props: TransitionProps & UseTransitionProps) => {
  const transition = useSpringTransition(props.location, {
    from: { opacity: 0, scale: [0, 0, 0] },
    enter: { opacity: 1, scale: [1, 1, 1] },
    leave: { opacity: 0, scale: [0, 0, 0] },
    ...props,
  })
  return {
    transition,
  }
}
