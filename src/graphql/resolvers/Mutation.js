export function sendMessage(root, { message }, { pubsub }) {
	pubsub.publish('MESSAGE', { onMessage: message });
	return message;
}