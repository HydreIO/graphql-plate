import { pubsub } from '../../apollo'

export const onMessage = {
	subscribe: () => pubsub.asyncIterator(['MESSAGE'])
}