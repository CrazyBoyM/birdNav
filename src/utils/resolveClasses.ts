export default function resolveClasses(...classes: string[]) {
  return classes.filter((clazz) => !!clazz).join(" ");
}
