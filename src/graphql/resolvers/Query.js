export function hello(root, args, ctx) {
  return `hello ${args.name}`
}

export function me(root, args, ctx) {
  return ctx.user
}
