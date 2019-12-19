export function sayHello(root, args, ctx) {
  return `${ctx.user.name} say hello to ${args.to}`
}