import { useClouds, UseCloudsProps, useCloud } from '../cloudy/use-cloud'
export { Cloud } from '../cloudy/use-cloud'

const WHITE_CLOUD_COLORS = ['#fff']

export const usePartlyCloud = useCloud
export type UsePartlyCloudProps = UseCloudsProps

export const usePartlyClouds = (
  { count = 10, colors = WHITE_CLOUD_COLORS }: UsePartlyCloudProps = {
    count: 10,
    colors: WHITE_CLOUD_COLORS,
  },
) => {
  return useClouds({
    count,
    colors,
  })
}
